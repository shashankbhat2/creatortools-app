"use client"
import React, { Fragment } from "react";
import { toolInfo } from "~/lib/constants";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

interface DashboardShellProps {
  children: React.ReactNode;
}

const DashboardShell = ({ children }: DashboardShellProps) => {
  return (
    <Fragment>
      <main className="flex min-h-screen flex-col md:flex-row">
        <nav className="flex flex-col gap-4 border-r bg-white p-4 md:justify-normal">
          <div className="w-[150px]">
            <img className="object-cover" src="/assets/logo.png" alt="logo" />
          </div>
          <div className="hidden flex-col gap-5 md:flex">
            <h1 className="text-uppercase text-xs font-medium text-muted-foreground">
              ALL CREATOR TOOLS
            </h1>
            {toolInfo.map((tool, index) => (
              <Button
                asChild
                key={index}
                className="flex items-center justify-start gap-2 p-1"
                variant="ghost"
              >
                <Link href={`/dashboard/tool/${tool.toolTag}`}>
                  <span className="text-muted-foreground">{tool.icon}</span>
                  <p className="text-muted-foreground">{tool.tabTitle}</p>
                </Link>
              </Button>
            ))}
          </div>
          <NavigationMenu className="block md:hidden">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                <NavigationMenuContent className="top-0 left-0">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {toolInfo.map((tool, index) => (
                      <Button
                        asChild
                        key={index}
                        className="flex items-center justify-start gap-2 p-1"
                        variant="ghost"
                      >
                        <Link href={`/dashboard/tool/${tool.toolTag}`}>
                          <span className="text-muted-foreground">
                            {tool.icon}
                          </span>
                          <p className="text-muted-foreground">
                            {tool.tabTitle}
                          </p>
                        </Link>
                      </Button>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <section className="flex w-full flex-col bg-white p-4">
          {children}
        </section>
      </main>
    </Fragment>
  );
};

export default DashboardShell;
