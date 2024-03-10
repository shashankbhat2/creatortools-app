import React from "react";
import { Card, CardContent, CardFooter } from "./card";
import { Ellipsis, Globe2 } from "lucide-react";
import { placeHolderContent, reactionIcons } from "~/lib/constants";

type LinkedinPreviewCardProps = {
  content: string;
  tags: string[];
  isLoading?: boolean;
};

type LinkedinPreviewListProps = {
  posts: Array<{ content: string; hashtags: string[] }>;
  isLoading?: boolean;
};

const LinkedinPreviewCard = ({
  content,
  tags,
  isLoading,
}: LinkedinPreviewCardProps) => {
  const hashtags = tags.length > 0 ? tags : placeHolderContent.hashtags;

  return (
    <Card className="mb-2 flex h-full w-full flex-col gap-5 overflow-hidden p-4">
      <div className="flex w-full justify-between">
        <div className="flex gap-2">
          <img className="w-[60px]" src="/assets/fake_dp.png" alt="fake-dp" />
          <div className="flex flex-col justify-between">
            <h1 className="text-base font-bold">Panda Media</h1>
            <p className="text-sm text-muted-foreground">100 Followers</p>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              2h ● <Globe2 size="14px" />
            </p>
          </div>
        </div>
        <Ellipsis className="text-muted-foreground" />{" "}
      </div>
      {!isLoading && (
        <CardContent className="flex flex-col gap-2 px-0">
          <p>{content || placeHolderContent.content}</p>
          <p className="flex flex-wrap gap-1 text-wrap">
            {hashtags.map((tag) => (
              <span key={tag} className="font-bold text-[#0966C2]">
                #{tag}
              </span>
            ))}
          </p>
        </CardContent>
      )}
      {isLoading && (
        <CardContent className="flex flex-col gap-2 px-0">
          <div className="h-4 w-1/2 animate-pulse rounded-sm bg-slate-200"></div>
          <div className="h-4 w-3/4 animate-pulse rounded-sm bg-slate-200"></div>
        </CardContent>
      )}
      <p className="text-sm font-bold text-[#0966C2]">See translation</p>
      <CardFooter className="flex gap-2 p-0 text-xs text-muted-foreground">
        <div className="flex gap-1">
          {reactionIcons.map((reaction, i) => (
            <img
              key={i}
              src={reaction.icon}
              alt={reaction.alt}
              className="w-6"
            />
          ))}
        </div>
        <p>88 • 4 Comments</p>
      </CardFooter>
    </Card>
  );
};

const LinkedinPreviewList = ({
  posts,
  isLoading,
}: LinkedinPreviewListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {posts.length > 0
        ? posts.map((post, i) => (
            <LinkedinPreviewCard
              key={i}
              isLoading={isLoading}
              content={post.content}
              tags={post.hashtags}
            />
          ))
        : Array(3)
            .fill(0)
            .map((_, i) => (
              <LinkedinPreviewCard
                key={i}
                isLoading={isLoading}
                content={placeHolderContent.content}
                tags={placeHolderContent.hashtags}
              />
            ))}
    </div>
  );
};

export default LinkedinPreviewList;
