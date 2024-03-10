import { cache } from "react";
import { createClient } from "./supabase/client";

const supabase = createClient();

export const getPosts = cache(async (creatorId: string, toolName: string) => {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("toolName", toolName)
    .eq("creatorId", creatorId);
  if (error) throw error;
  console.log(posts);
  return posts;
});

