"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ScanSearch, 
  FileStack, 
  BarChart3, 
  Activity, 
  Camera, 
  Settings,
  Network
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Analyze Image', href: '/analyze', icon: ScanSearch },
  { name: 'Violation Records', href: '/records', icon: FileStack },
  { name: 'System Architecture', href: '/architecture', icon: Network },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'System Health', href: '/health', icon: Activity },
  { name: 'Evidence Center', href: '/evidence', icon: Camera },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background/50 backdrop-blur-xl">
      <div className="flex h-16 shrink-0 items-center gap-2 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <ScanSearch className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
          TrafficVision AI
        </span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4">
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-emerald-500">System Online</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">AI Inference Engine Active</p>
        </div>
      </div>
    </div>
  );
}
