import { createClient } from "@deepgram/sdk";
import { env } from "../env";
import fs from "fs";

const deepgramApiKey = env.DEEPGRAM_API_KEY as string;
const deepgram = createClient(deepgramApiKey);

interface TranscriptSummaryProps {
  filePath: string;
}

interface TranscriptSummaryResult {
  summary: string | undefined;
}

export const getTranscriptSummary = async ({
  filePath,
}: TranscriptSummaryProps): Promise<TranscriptSummaryResult> => {
  try {
    const options = {
      model: "nova-2",
      detect_language: true,
      summarize: "v2",
      smart_format: true,
    };

    const result = await deepgram.listen.prerecorded.transcribeFile(
      fs.readFileSync(filePath),
      options,
    );

    const videoSummary = result.result?.results.summary?.short;
    return { summary: videoSummary };
  } catch (error) {
    console.log(error);
    throw new Error("Error getting transcript summary");
  }
};
