import { NextRequest } from "next/server";
import ytdl from "ytdl-core";
import { z } from "zod";
import { getTranscriptSummary } from "~/lib/deepgram";
import {
  YoutubeToLinkedinPostResponse,
  getLinkedinPostFromVideoSummary,
} from "~/lib/openai";
import { createClient } from "~/lib/supabase/server";
import { v4 as uuidv4 } from "uuid";

const subtitleRequestSchema = z.object({
  youtubeUrl: z.string().url(),
  tone: z.string(),
});

export async function POST(req: NextRequest) {
  const json = await req.json();
  const body = subtitleRequestSchema.parse(json);
  const { youtubeUrl, tone } = body;
  const supabase = createClient();
  let posts: YoutubeToLinkedinPostResponse | [] = [];
  try {
    const fileName = `audio/${uuidv4()}.mp3`;
    const stream = ytdl(youtubeUrl, { filter: "audioonly" });
    const { error: uploadError } = await supabase.storage
      .from("audio")
      .upload(fileName, stream, {
        contentType: "audio/mp3",
        duplex: "half",
      });

    if (uploadError) {
      console.log(uploadError);
      return new Response(
        JSON.stringify({ message: "Error uploading audio" }),
        { status: 500 },
      );
    }

    const {
      data: { publicUrl: url },
    } = await supabase.storage.from("audio").getPublicUrl(fileName);

    const videoSummary = await getTranscriptSummary({ url });
    if (!videoSummary.summary) {
      return new Response(
        JSON.stringify({ message: "Error getting video summary" }),
        { status: 500 },
      );
    }

    posts = await getLinkedinPostFromVideoSummary(videoSummary.summary, tone);

    return new Response(
      JSON.stringify({
        message: "Successfully Generated Posts",
        posts,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Failed to Generate Posts", posts: [] }),
      { status: 500 },
    );
  }
}
