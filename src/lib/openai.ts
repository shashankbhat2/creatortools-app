import OpenAI from "openai";
import { env } from "~/env";

const openaiApiKey = env.OPENAI_API_KEY as string;
const client = new OpenAI({
  apiKey: openaiApiKey,
});

export type LinkedinPost = {
  content: string;
  tags: Array<string>;
}

export type YoutubeToLinkedinPostResponse = {
  posts: Array<LinkedinPost>;
}

export const getLinkedinPostFromVideoSummary = async (
  summary: string,
  tone: string,
): Promise<YoutubeToLinkedinPostResponse> => {
  const system_prompt = `You are a 100x AI System, optimized for the purpose of generating an array of three LinkedIn posts in JSON format. 
  These posts are based on user-provided summary of a YouTube video transcript and a comma-separated string indicating the desired tones. 
  You will analyze the summary to identify the central themes or topics, and then create three distinct LinkedIn posts, each precisely 25 words in length. 
  For each post, you will generate a set of hashtags that are relevant to the content and match the specified tones. 
  The hashtags should be seperate from the post content, and should not exceed 3 words in total.
  The outputs will be formatted in JSON, structured as an array of objects. 
  Each object will have two fields: content: containing the text of the LinkedIn post. hashtags: an array containing the generated hashtags.`;

  const formattedSummary = JSON.stringify(summary);
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
      seed: 1234,
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: system_prompt,
        },
        {
          role: "user",
          content: `${formattedSummary} in ${tone}`,
        },
      ],
    });

    if (
      !completion.choices ||
      completion.choices.length === 0 ||
      !completion.choices[0]!.message.content
    ) {
      throw new Error("Invalid response structure from OpenAI.");
    }

    const response = await completion.choices[0]!.message.content!;
    const posts = await JSON.parse(response)["posts"];

    return posts;
  } catch (error) {
    console.error("Error getting posts", error);
    throw error;
  }
};


export const getSEOBlogPostFromVideoTitle = async (
  title: string,
  tone: string,
): Promise<YoutubeToLinkedinPostResponse> => {
  const system_prompt = `You are a 100x AI System, optimized for the purpose of generating an array of two Search Engine Optimized blog posts in JSON format. 
  These posts are based on user-provided title of a YouTube video and a comma-separated string indicating the desired tones. 
  You will analyze the title to identify the central themes or topics, and then create two distinct Search Engine Optimized blog posts, each precisely 300 words in length. 
  For each post, you will generate a set of hashtags that are relevant to the content and match the specified tones. 
  The hashtags should be seperate from the post content, and should not exceed 3 words in total.
  The outputs will be formatted in JSON, structured as an array of objects. 
  Each object will have two fields: content: containing the text of the Search Engine Optimized Blog post. hashtags: an array containing the generated hashtags.`;

  const formattedtitle = JSON.stringify(title);
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
      seed: 1234,
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: system_prompt,
        },
        {
          role: "user",
          content: `${formattedtitle} in ${tone}`,
        },
      ],
    });

    if (
      !completion.choices ||
      completion.choices.length === 0 ||
      !completion.choices[0]!.message.content
    ) {
      throw new Error("Invalid response structure from OpenAI.");
    }

    const response = await completion.choices[0]!.message.content!;
    const posts = await JSON.parse(response)["posts"];

    return posts;
  } catch (error) {
    console.error("Error getting posts", error);
    throw error;
  }
};
