import { cn } from "@repo/ui/lib/utils";
import React from "react";

export default function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div
        className={cn(
          "h-1 flex-1 rounded-full transition-all duration-700",
          step >= 1
            ? "bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)]"
            : "bg-white/10",
        )}
      />
      <div
        className={cn(
          "h-1 flex-1 rounded-full transition-all duration-700",
          step >= 2
            ? "bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)]"
            : "bg-white/10",
        )}
      />
    </div>
  );
}
