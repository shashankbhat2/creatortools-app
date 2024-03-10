import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { publicRoutes } from "./lib/routes";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({
    req,
    res,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if (isPublicRoute) {
    if (session) {
      return NextResponse.rewrite(new URL("/dashboard/tool/yt-video-to-linkedin-post-gen", req.url));
    }
    return res;
  }

  if(nextUrl.pathname === "/dashboard"){
    return NextResponse.redirect(new URL("/dashboard/tool/yt-video-to-linkedin-post-gen", req.url));
  }

  if (!session) {
    return NextResponse.rewrite(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/tools/:path*', '/login'],
}