import { NextRequest } from "next/server";
import ytdl from "ytdl-core";
import { z } from "zod";
import {
  YoutubeToLinkedinPostResponse,
  getSEOBlogPostFromVideoTitle,
} from "~/lib/openai";

const subtitleRequestSchema = z.object({
  youtubeUrl: z.string().url(),
  tone: z.string(),
});

export async function POST(req: NextRequest) {
  const json = await req.json();
  const body = subtitleRequestSchema.parse(json);
  const { youtubeUrl, tone } = body;
  let posts: YoutubeToLinkedinPostResponse | [] = [];
  try {
    const info = await ytdl.getInfo(youtubeUrl);
    const videoTitle = info.videoDetails.title;

    posts = await getSEOBlogPostFromVideoTitle(videoTitle, tone);

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
