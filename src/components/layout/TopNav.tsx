"use client"

import { useState, useEffect } from "react";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TopNav() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b bg-background/50 backdrop-blur-xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <div className="relative w-full max-w-md">
            <Search
              className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-muted-foreground ml-3"
              aria-hidden="true"
            />
            <Input
              id="search-field"
              className="block h-full w-full border-0 bg-transparent py-0 pl-10 pr-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 sm:text-sm"
              placeholder="Search vehicles, evidence IDs..."
              type="search"
              name="search"
            />
          </div>
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div className="hidden sm:block text-sm font-medium text-muted-foreground tabular-nums">
            {time}
          </div>
          <button type="button" className="-m-2.5 p-2.5 text-muted-foreground hover:text-foreground relative transition-colors">
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
          </button>
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border" aria-hidden="true" />
          <div className="flex items-center gap-x-4">
            <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-border transition-all hover:ring-primary">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block text-sm font-medium leading-6 text-foreground">
              Admin User
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
