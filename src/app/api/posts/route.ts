import { NextRequest } from "next/server";
import { env } from "~/env";
import { createClient } from "@deepgram/sdk";
import ytdl from "ytdl-core";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { getTranscriptSummary } from "~/lib/deepgram";
import { getLinkedinPostFromVideoSummary } from "~/lib/openai";

const deepgramApiKey = env.DEEPGRAM_API_KEY as string;
const deepgram = createClient(deepgramApiKey);

const subtitleRequestSchema = z.object({
  youtubeUrl: z.string().url(),
  tone: z.string(),
});

export async function POST(req: NextRequest) {
  const json = await req.json();
  const body = subtitleRequestSchema.parse(json);
  const { youtubeUrl, tone } = body;
  let filePath: string = "";
  try {
    const videoId = ytdl.getURLVideoID(youtubeUrl);
    const videoStream = ytdl(youtubeUrl, { filter: "audioandvideo" });
    filePath = path.resolve("./public", `${videoId}.mp4`);
    const fileWriteStream = fs.createWriteStream(filePath);

    await new Promise((resolve, reject) => {
      videoStream.pipe(fileWriteStream);
      videoStream.on("error", reject);
      fileWriteStream.on("finish", resolve);
    });

    const videoSummary = await getTranscriptSummary({ filePath });
    if (!videoSummary.summary) {
      return new Response(
        JSON.stringify({ message: "Error getting video summary" }),
        { status: 500 },
      );
    }

    const posts = await getLinkedinPostFromVideoSummary(
      videoSummary.summary,
      tone,
    );

    return new Response(
      JSON.stringify({
        message: "Video Download Complete",
        posts,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Video Download Complete" }),
      { status: 500 },
    );
  } finally {
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.error("Error deleting the file:", err);
    }
  }
}
