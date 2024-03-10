"use client";
import React, { useEffect } from "react";
import { getPosts } from "~/lib/data";
import { Card } from "../ui/card";
import { SAMPLE_POSTS } from "~/lib/constants";
import { createClient } from "~/lib/supabase/client";

type Props = {
  toolName: string;
};

const PostList = ({ toolName }: Props) => {
  const [posts, setPosts] = React.useState<any[]>([]);
  const [creatorId, setCreatorId] = React.useState<string | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error getting current user", error);
        return;
      }
      setCreatorId(data?.user.id);
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getPosts(creatorId!, toolName);
      const parsedPosts = res.map((post: any) => ({
        ...post,
        content: JSON.parse(post.content),
      }));
      setPosts(parsedPosts);
    };
    if (creatorId) fetchPosts();
  }, [creatorId]);

  return (
    <div className="flex flex-col gap-2">
      <h1>Results: {posts.length} </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.length !== 0
          ? posts.map((post) => (
              <Card
                key={post.id}
                className="flex flex-col gap-4 rounded-md bg-white p-4 shadow-md"
              >
                <h1 className="text-base font-medium">
                  {post.content.content}
                </h1>
                <p className="flex flex-wrap gap-1 text-wrap">
                  {post.content.hashtags &&
                    post.content.hashtags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs font-bold text-[#0966C2]"
                      >
                        #{tag}
                      </span>
                    ))}
                </p>
              </Card>
            ))
          : SAMPLE_POSTS.map((post, index) => (
              <Card
                key={index}
                className="flex flex-col gap-4 rounded-md bg-white p-4"
              >
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-blue-200">
                  {post.icon}
                </div>
                <h1 className="text-xl font-bold">{post.title}</h1>
                <p>{post.content}</p>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default PostList;
