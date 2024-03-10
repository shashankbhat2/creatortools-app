"use client";
import React, { useState } from "react";
import { createClient } from "~/lib/supabase/client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [userData, setUserData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    },
  );
  const router = useRouter();

  const isFormValid =
    userData.email.trim() !== "" && userData.password.trim() !== "";

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const supabase = createClient();
      let { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });

      if (error) {
        toast.error("Error signing in", { description: error.message });
        return;
      }

      if (data) {
        toast.success("Logged in successfully");
        router.push("/dashboard/tool/yt-video-to-linkedin-post-gen");
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-md border p-4 shadow-sm">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={login} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" disabled={!isFormValid}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
