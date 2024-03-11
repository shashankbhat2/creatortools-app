import { ArrowDown, ChevronRight, Sparkle, User } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import SubscribtionBanner from "~/components/containers/SubscribtionBanner.container";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { toolInfo } from "~/lib/constants";

export default function HomePage() {
  return (
    <Fragment>
      <header className="container mx-auto p-5">
        <nav className="flex items-center justify-between">
          <div>
            <img src="/assets/logo.png" alt="creator-tools" />
          </div>
          <Button className="flex gap-2" asChild variant="outline">
            <Link href="/login">
              <User size="16px" />
              <span className="text-xs font-medium">Login</span>
            </Link>
          </Button>
        </nav>
      </header>
      <main className="container mx-auto">
        <section className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="relative">
            <div>
              <img
                src="/assets/heart.svg"
                alt="heart"
                className="absolute left-0 top-0 mt-[120px] w-[60px]"
              />
              <img
                src="/assets/thumbs.svg"
                alt="thumbs-up"
                className="absolute bottom-0 left-0 w-[60px] md:-mx-[50px]"
              />
              <img
                src="/assets/star.svg"
                alt="star"
                className="absolute right-0 top-0 -mx-5 mt-[100px] w-[60px]"
              />
              <img
                src="/assets/oneplus.svg"
                alt="plus-one"
                className="absolute bottom-0 right-0 w-[60px] md:-mx-[50px]"
              />
            </div>

            <div className="flex flex-col items-center justify-center gap-8">
              <Badge
                variant="outline"
                className="w-3/4 items-center justify-center gap-2 bg-slate-50 p-1 md:w-1/2"
              >
                <Sparkle size="14px" />
                All the top creator tools in one place
                <Sparkle size="14px" />
              </Badge>
              <h1 className="text-center text-5xl font-bold leading-snug">
                <span className="text-white text-shadow-custom">
                  Top Creator tools
                </span>{" "}
                for making
                <br />
                those videos go viral 🚀
              </h1>
              <p className="text-center text-muted-foreground">
                We are ready to be your creator co-pilot. Generate ideas, SEO
                friendly blogs & Linkedin posts from videos, Audiograms{" "}
              </p>
              <Button
                asChild
                variant="secondary"
                className="flex items-center justify-center rounded-sm border-2 border-[#A91245] bg-gradient-to-b from-[#FF81AC] to-[#FF3F80] font-medium text-white shadow-inner"
              >
                <Link href="/login">
                  Login and explore
                  <ChevronRight size="16px" />
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <ArrowDown size="16px" color="#FFDEE9" />
                <p className="text-sm font-medium text-[#E44D80]">
                  scroll down to explore
                </p>
                <ArrowDown size="16px" color="#FFDEE9" />
              </div>
            </div>
          </div>
        </section>
        <section className="my-[50px] flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-sm font-medium text-[#E44D80]">
              All of our tools
            </p>
            <p className="text-3xl font-medium tracking-tighter">
              Click on any tool below and explore
            </p>
            <img src="assets/arrow-down.svg" alt="arrow-down" />
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 ">
            {toolInfo.map((tool, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 rounded-md border p-4 "
              >
                <span className="flex h-[25px] w-[25px] items-center justify-center overflow-hidden rounded-lg border p-5 text-xl">
                  {tool.icon}
                </span>
                <div className="flex flex-col gap-1 text-muted-foreground">
                  <h2 className="text-lg font-medium ">{tool.title}</h2>
                  <p>{tool.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <SubscribtionBanner />
      </main>
      <footer className="container mx-auto flex items-center justify-between bg-slate-50 p-4 text-sm">
        <p>© 1811 Labs. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="/">Privacy Policy</a>
          <a href="/">Terms and conditions</a>
        </div>
      </footer>
    </Fragment>
  );
}
