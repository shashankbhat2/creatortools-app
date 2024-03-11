import { NextRequest, NextResponse } from "next/server";
import { publicRoutes } from "./lib/routes";
import { updateSession } from "./lib/supabase/middleware";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const { data: { session }} = await updateSession(req)
  const res = NextResponse.next();
  
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if (isPublicRoute) {
    if (session) {
      return NextResponse.rewrite(new URL("/dashboard/tool/yt-video-to-linkedin-post-gen", req.url));
    }
    return res;
  }

  if(nextUrl.pathname === "/dashboard"){
    return NextResponse.rewrite(new URL("/dashboard/tool/yt-video-to-linkedin-post-gen", req.url));
  }

  if (!session) {
    return NextResponse.rewrite(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/tools/:path*', '/login'],
}