"use client";

import { useState } from "react";
import { Lock, Network } from "@repo/ui/icons";
import { cn } from "@repo/ui/lib/utils";
import { RolesTab } from "./RolesTab";
import { TeamsTab } from "./TeamsTab";

type TabState = "roles" | "teams";

export function AccessControlTabs() {
  const [activeTab, setActiveTab] = useState<TabState>("roles");

  return (
    <div className="space-y-6">
      <div className="flex p-1 space-x-1 bg-[#0A0A0A] border border-white/10 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("roles")}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
            activeTab === "roles"
              ? "bg-[#121212] text-white shadow-[0_0_15px_rgba(168,85,247,0.15)] border border-purple-500/20"
              : "text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent",
          )}
        >
          <Lock size={16} /> Roles & Permissions
        </button>
        <button
          onClick={() => setActiveTab("teams")}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
            activeTab === "teams"
              ? "bg-[#121212] text-white shadow-[0_0_15px_rgba(6,182,212,0.15)] border border-cyan-500/20"
              : "text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent",
          )}
        >
          <Network size={16} /> Team Architecture
        </button>
      </div>

      <div className="bg-[#0D0D0D] border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-2xl min-h-[400px]">
        <div
          className={cn(
            "absolute -right-32 -top-32 h-96 w-96 rounded-full blur-[120px] opacity-20 transition-colors duration-700",
            activeTab === "roles" ? "bg-purple-600" : "bg-cyan-600",
          )}
        />
        <div className="relative z-10">
          {activeTab === "roles" ? <RolesTab /> : <TeamsTab />}
        </div>
      </div>
    </div>
  );
}
