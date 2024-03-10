"use client";
import React, { useState } from "react";
import { createClient } from "~/lib/supabase/client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";

type Props = {};

const RegisterForm = (props: Props) => {
  const [userData, setUserData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    },
  );

  const isFormValid =
    userData.email.trim() !== "" && userData.password.trim() !== "";

  const signup = async (e: any) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      const supabase = createClient();
      let { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (error) {
        console.log(error);
        toast.error("error signing up", { description: error.message });
        throw error;
      }
      toast.success(
        "Signed up successfully",
        { description: "Please check your email to verify your account."}
      );
    } catch (error: any) {
      console.log(error);
      toast.error("error signing up", { description: error.message });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex w-full  flex-col gap-4 rounded-md border p-4 shadow-sm">
      <h1 className="text-2xl font-bold">Register</h1>
      <form onSubmit={signup} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="Email">Email</label>
          <Input
            type="text"
            placeholder="Email"
            name="email"
            required
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Password</label>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            required
            onChange={handleChange}
          />
        </div>
        <Button type="submit" disabled={!isFormValid}>
          Signup
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
