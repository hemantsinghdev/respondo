"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  IdCard,
  LucideIcon,
  Settings,
  User,
  Users,
  FileCog,
} from "@repo/ui/icons";
import { cn } from "@repo/ui/lib/utils";

interface NavTab {
  name: string;
  href: string;
  icon?: LucideIcon;
}

const TABS_CONFIG = {
  profile: [
    { name: "Basic Profile", href: "/profile", icon: User },
    { name: "Account", href: "/profile/account", icon: IdCard },
  ],
  organization: [
    { name: "Basic", href: "/organization", icon: Building2 },
    { name: "Settings", href: "/organization/member-settings", icon: Settings },
    {
      name: "Access Control",
      href: "/organization/access-control",
      icon: FileCog,
    },
    { name: "members", href: "/organization/members", icon: Users },
  ],
} as const;

type HeaderType = keyof typeof TABS_CONFIG;

interface FloatingHeaderProps {
  type: HeaderType;
  title?: string;
  topOffset?: string; // e.g., "top-4" or "top-10"
  maxWidth?: string; // e.g., "max-w-4xl" or "max-w-full"
  className?: string;
}

export function FloatingHeader({
  type,
  title,
  topOffset = "top-4",
  maxWidth = "max-w-4xl",
  className,
}: FloatingHeaderProps) {
  const pathname = usePathname();
  const tabs = TABS_CONFIG[type];

  return (
    <div
      className={cn(
        "sticky z-30 mx-auto w-full px-4 transition-all duration-300",
        topOffset,
        maxWidth,
        className,
      )}
    >
      {/* Outer Glow Wrapper */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-magenta-600/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>

        {/* Main Glass Container */}
        <div className="relative flex items-center justify-between rounded-2xl border border-white/10 bg-black/60 px-4 py-2.5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <nav className="flex gap-1.5">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-purple-500/15 to-pink-500/15 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                      : "text-slate-400 hover:text-white hover:bg-white/5",
                  )}
                >
                  {tab.icon && <tab.icon className="h-4 w-4" />}
                  <span>{tab.name}</span>
                </Link>
              );
            })}
          </nav>

          {title && (
            <div className="hidden md:block pr-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500/80 selection:bg-purple-500/30">
                {title}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
