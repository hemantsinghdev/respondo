"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Building2 } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

const profileTabs = [
  { name: "Basic Profile", href: "/profile", icon: User },
  { name: "Organization", href: "/profile/organization", icon: Building2 },
];

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col">
      {/* --- Floating Neon Header --- */}
      <div className="sticky top-4 z-30 mx-auto w-full max-w-4xl">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/60 px-6 py-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <nav className="flex gap-2">
            {profileTabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-purple-500/20 to-magenta-600/20 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                      : "text-slate-400 hover:text-white hover:bg-white/5",
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              Account Settings
            </span>
          </div>
        </div>
      </div>

      {/* --- Page Content --- */}
      <div className="mx-auto w-full max-w-4xl pt-12">{children}</div>
    </div>
  );
}
