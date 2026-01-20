import React from "react";
import {
  Database,
  History,
  FileText,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const RAGVisual = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-around gap-8 p-8 bg-slate-950/50 rounded-3xl border border-white/5 backdrop-blur-xl">
      {/* Data Sources */}
      <div className="space-y-4">
        {[
          { Icon: FileText, label: "FAQs", color: "text-cyan-400" },
          { Icon: Database, label: "Docs", color: "text-blue-400" },
          { Icon: History, label: "Past Tickets", color: "text-purple-400" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
          >
            <item.Icon className={`h-6 w-6 ${item.color}`} />
            <span className="text-sm font-semibold text-slate-300">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="hidden md:block">
        <ArrowRight className="h-8 w-8 text-slate-700 animate-pulse" />
      </div>

      {/* AI Processor */}
      <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
        <div className="text-center">
          <Sparkles className="h-10 w-10 text-purple-400 mx-auto mb-2 drop-shadow-glow" />
          <p className="text-xs font-bold text-white uppercase tracking-tighter">
            Respondo RAG
          </p>
          <p className="text-[10px] text-purple-300/60 mt-1">
            Generating Context...
          </p>
        </div>
        {/* Decorative Ring */}
        <div className="absolute inset-2 border border-dashed border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
      </div>
    </div>
  );
};
