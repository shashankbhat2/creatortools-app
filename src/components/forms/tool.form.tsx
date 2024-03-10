"use client";
import React, { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

type Props = {
  isLoading: boolean;
  onSubmit: (data: { youtubeUrl: string; tone: string }) => void;
};

const YoutubeToLinkedinPostForm = ({ onSubmit, isLoading }: Props) => {
  const [data, setData] = useState<{ youtubeUrl: string; tone: string }>({
    youtubeUrl: "",
    tone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(data);
  };

  const isFormValid = data.youtubeUrl.trim() !== "" && data.tone.trim() !== "";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 ">
        <label
          className="text-sm font-medium text-muted-foreground"
          htmlFor="link"
        >
          Enter the youtube video Link
        </label>
        <Input
          onChange={handleChange}
          name="youtubeUrl"
          type="text"
          id="youtubeUrl"
          value={data.youtubeUrl}
          required
          placeholder="https://www.youtube.com/watch?v=..."
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-medium text-muted-foreground"
          htmlFor="link"
        >
          Post Tone / Mood
        </label>
        <Input
          type="text"
          onChange={handleChange}
          id="tone"
          value={data.tone}
          name="tone"
          required
          placeholder="Funny, Educational, Inspirational..."
        />
      </div>
      <Button
        disabled={isLoading || !isFormValid}
        className="  rounded-sm bg-gradient-to-b from-[#5072EA] to-[#3F5ECD] font-medium text-white shadow-inner"
      >
        {!isLoading ? (
          <span className="flex items-center justify-center">
            Generate <ChevronRight size="16px" />
          </span>
        ) : (
          <span className="animate-pulse">Generating...</span>
        )}
      </Button>
      
    </form>
  );
};

export default YoutubeToLinkedinPostForm;
