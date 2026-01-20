import React from "react";
import { Mail, MessageSquare, Sparkles, Cpu, Phone } from "lucide-react";

export const ConnectivityVisual = () => {
  return (
    <div className="relative w-full aspect-square flex items-center justify-center overflow-visible">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full" />

      {/* Central AI Core */}
      <div className="relative z-20 group">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-900 border border-cyan-500/50 shadow-[0_0_40px_-5px_rgba(34,211,238,0.4)] transition-all group-hover:scale-110 group-hover:border-cyan-400">
          <Cpu className="h-10 w-10 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
        </div>
        {/* Animated Rings around the core */}
        <div className="absolute inset-[-12px] border border-cyan-500/20 rounded-[2rem] animate-ping opacity-20" />
        <div className="absolute inset-[-4px] border border-cyan-500/10 rounded-[1.8rem] animate-pulse" />
      </div>

      {/* Orbiting Nodes Grid */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 p-4 sm:p-8 pointer-events-none">
        {/* Top Left: Gmail - 4s bounce */}
        <div className="flex items-start justify-start">
          <div className="pointer-events-auto flex flex-col items-center animate-[bounce_4s_ease-in-out_infinite]">
            <div className="p-3 rounded-xl bg-slate-900 border border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <Mail className="h-6 w-6" />
            </div>
            <span className="mt-2 text-[9px] font-bold text-slate-600 uppercase tracking-tighter">
              Gmail
            </span>
          </div>
        </div>

        {/* Top Right: WhatsApp - 5s bounce */}
        <div className="flex items-start justify-end">
          <div className="pointer-events-auto flex flex-col items-center animate-[bounce_5s_ease-in-out_infinite]">
            <div className="p-3 rounded-xl bg-slate-900 border border-green-500/30 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
              <MessageSquare className="h-6 w-6" />
            </div>
            <span className="mt-2 text-[9px] font-bold text-slate-600 uppercase tracking-tighter">
              WhatsApp
            </span>
          </div>
        </div>

        {/* Bottom Left: Live Chat - 6s bounce */}
        <div className="flex items-end justify-start">
          <div className="pointer-events-auto flex flex-col items-center animate-[bounce_6s_ease-in-out_infinite]">
            <div className="p-3 rounded-xl bg-slate-900 border border-purple-500/30 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <Sparkles className="h-6 w-6" />
            </div>
            <span className="mt-2 text-[9px] font-bold text-slate-600 uppercase tracking-tighter">
              Live Chat
            </span>
          </div>
        </div>

        {/* Bottom Right: IMAP/Custom - 4.5s bounce */}
        <div className="flex items-end justify-end">
          <div className="pointer-events-auto flex flex-col items-center animate-[bounce_4.5s_ease-in-out_infinite]">
            <div className="p-3 rounded-xl bg-slate-900 border border-orange-500/30 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
              <Phone className="h-6 w-6" />
            </div>
            <span className="mt-2 text-[9px] font-bold text-slate-600 uppercase tracking-tighter">
              Custom
            </span>
          </div>
        </div>
      </div>

      {/* SVG Connector Lines - Fixed behind the jumping icons */}
      <svg
        className="absolute inset-0 h-full w-full -z-10 opacity-20"
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <line
          x1="20"
          y1="20"
          x2="50"
          y2="50"
          stroke="url(#lineGrad)"
          strokeWidth="0.3"
          strokeDasharray="1.5"
        />
        <line
          x1="80"
          y1="20"
          x2="50"
          y2="50"
          stroke="url(#lineGrad)"
          strokeWidth="0.3"
          strokeDasharray="1.5"
        />
        <line
          x1="20"
          y1="80"
          x2="50"
          y2="50"
          stroke="url(#lineGrad)"
          strokeWidth="0.3"
          strokeDasharray="1.5"
        />
        <line
          x1="80"
          y1="80"
          x2="50"
          y2="50"
          stroke="url(#lineGrad)"
          strokeWidth="0.3"
          strokeDasharray="1.5"
        />
      </svg>
    </div>
  );
};
