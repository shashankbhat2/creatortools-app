import { createClient } from "~/lib/supabase/server";
import { redirect } from "next/navigation";
import PostList from "~/components/containers/PostList.container";
import Link from "next/link";
import LogoutButton from "~/components/logout";
import { Button } from "~/components/ui/button";
import { PlusCircle } from "lucide-react";

async function ToolListPage({ params }: { params: { toolName: string } }) {
  const toolName = params.toolName;
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Button
          asChild
          className="flex items-center gap-2 justify-center rounded-sm  bg-gradient-to-b from-[#FF81AC] to-[#FF3F80] font-medium text-white shadow-inner"
        >
          <Link href={`/tools/${toolName}`}>
            {" "}
            <PlusCircle size="16px" color="white" /> Create New
          </Link>
        </Button>
        <LogoutButton />
      </div>
      <PostList creatorId={data.user.id} toolName={toolName} />
    </div>
  );
}

export default ToolListPage;
