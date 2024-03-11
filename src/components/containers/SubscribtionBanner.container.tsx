"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "../ui/button";
import { createClient } from "~/lib/supabase/client";
import { toast } from "sonner";

type Props = {};

const SubscribtionBanner = (props: Props) => {
  1;
  const [email, setEmail] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("subscribers").insert({
        email,
      });
      if (error) {
        error.code === "23505"
          ? toast.success("Email already subscribed")
          : toast.error("Error saving email");
        console.error("Error saving email", error);
        return;
      }
      toast.success("Subscribed successfully");
    } catch (error) {
      toast.error("Error saving email");
      console.error("Error saving email", error);
      return;
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog>
      <div className="my-[50px] flex w-full flex-col items-start justify-between gap-5 rounded-md border bg-[#FFFAFB] p-[40px] md:flex-row md:items-center">
        <div className="flex flex-col gap-2">
          <p className="text-xl font-medium tracking-tighter text-black md:text-2xl lg:text-3xl">
            Want to know more about the tools?
          </p>
          <p className="text-lg text-muted-foreground">
            Join the club and explore all the free tools...
          </p>
        </div>
        <DialogTrigger
          asChild
          className="flex items-center justify-center rounded-sm border-2 border-[#A91245] bg-gradient-to-b from-[#FF81AC] to-[#FF3F80] font-medium text-white shadow-inner"
        >
          <Button>Subscribe</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="flex flex-col items-center justify-center">
        <DialogHeader className="flex flex-col items-center justify-center gap-2">
          <img className="w-[120px]" src="/assets/logo.png" alt="logo" />
          <DialogTitle>Join the Club!</DialogTitle>
          <DialogDescription className="text-center">
            Like these tools? you might want to checkout more awesome products
            from us made just for you{" "}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 rounded-md border p-2"
          >
            <input
              onChange={handleChange}
              className="border-none focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none active:ring-0 active:ring-offset-0"
              type="email"
              required
              disabled={saving}
              value={email}
            />
            <Button
              disabled={!email || saving}
              type="submit"
              className="flex items-center justify-center rounded-sm border-2 border-[#A91245] bg-gradient-to-b from-[#FF81AC] to-[#FF3F80] font-medium text-white shadow-inner"
            >
              Subscribe
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscribtionBanner;
