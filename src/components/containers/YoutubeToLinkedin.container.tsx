"use client";
import React, { Fragment, useState } from "react";
import YoutubeToLinkedinPostForm from "../forms/tool.form";
import { toast } from "sonner";
import LinkedinPreviewList from "../ui/LinkedinPreviewCard";
import { Button } from "../ui/button";
import Link from "next/link";
import { createClient } from "~/lib/supabase/client";

const YoutubeToLinkedinContainer = () => {
  const [posts, setPosts] = useState<
    Array<{ content: string; hashtags: string[] }>
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  const handleSavePosts = async () => {
    setSaveLoading(true);
    try {
      const supabase = createClient();
      const currentUser = await supabase.auth.getUser();
      const creatorId = currentUser.data.user?.id;
      const updatedPosts = posts.map((post) => {
        return {
          creatorId,
          toolName: "yt-video-to-linkedin-post-gen",
          content: JSON.stringify({
            content: post.content,
            hashtags: post.hashtags,
          }),
        };
      });
      const { data, error } = await supabase.from("posts").insert(updatedPosts);
      if (error) {
        console.error("Error saving posts", error);
        toast.error("Error saving posts");
        return;
      }
      console.log(data);
      toast.success("Posts saved successfully");
    } catch (error) {
      console.error("Error saving posts", error);
      toast.error("Error saving posts");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleSubmit = async (data: { youtubeUrl: string; tone: string }) => {
    setLoading(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result.posts);
      setPosts(result.posts);
    } catch (error) {
      console.error("Error getting posts", error);
      toast.error("Error getting posts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="flex flex-1 flex-col gap-8 p-4">
        <div className="flex items-start">
          <Link href="/dashboard">
            <img src="/assets/logo.png" alt="logo" />
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-wrap text-4xl font-bold leading-tight tracking-tight md:w-3/4 lg:w-1/2">
            YouTube video to LinkedIn Post Generator
          </h1>
          <p>Generate 2 unique SEO blog for your next viral video.</p>
        </div>
        <div className="flex flex-col gap-2 md:w-3/4 lg:w-1/2">
          <YoutubeToLinkedinPostForm
            isLoading={loading}
            onSubmit={handleSubmit}
          />{" "}
          <Button
            onClick={handleSavePosts}
            disabled={posts.length === 0 || loading || saveLoading}
            variant="outline"
          >
            Save Posts
          </Button>
        </div>
      </div>
      <div className="flex  h-screen flex-1 overflow-y-scroll bg-slate-100">
        <div className="flex w-full flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-medium text-muted-foreground">
              Preview your posts
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            <LinkedinPreviewList posts={posts} isLoading={loading} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default YoutubeToLinkedinContainer;
