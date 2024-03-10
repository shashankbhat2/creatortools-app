"use client";
import React from "react";
import { createClient } from "~/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { toast } from "sonner";
type Props = {};

const LogoutButton = (props: Props) => {
  const router = useRouter();
  const handleLogout = async () => {
    const supabase = createClient();
    let { error } = await supabase.auth.signOut();
    router.refresh();
    if (error) {
      console.log(error);
      toast.error("error logging out", { description: error.message });
      return;
    }
    toast.success("Logged out successfully");
  };
  return (
    <Button className="text-red-600" variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
