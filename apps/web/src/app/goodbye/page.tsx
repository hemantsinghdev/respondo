"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Images } from "@repo/ui/assets";
import { Sparkles, ArrowRight, Ghost } from "@repo/ui/icons";

export default function GoodbyePage() {
  // Optional: Clear any remaining local storage or analytics heartbeats
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Neon Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-2xl px-6 text-center">
        {/* Animated Icon Container */}
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full animate-pulse" />
          <div className="relative h-24 w-24 mx-auto bg-[#0D0D0D] border border-white/10 rounded-3xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl">
            <Ghost className="h-10 w-10 text-slate-400" />
          </div>
        </div>

        {/* Branding */}
        <div className="flex justify-center mb-6">
          <Image
            src={Images.logos.long}
            alt="Respondo"
            className="h-8 w-auto opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>

        {/* Content */}
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
          Everything has been{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500">
            erased.
          </span>
        </h1>

        <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg mx-auto">
          Your account, tickets, and AI training data have been permanently
          removed from our systems. We're sad to see you go, but your privacy is
          our priority.
        </p>

        {/* Action Area */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="group relative px-8 py-3 bg-white text-black rounded-xl font-bold overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative group-hover:text-white flex items-center gap-2">
              Start a new journey <Sparkles className="h-4 w-4" />
            </span>
          </Link>

          <Link
            href="https://respondo.crm/feedback" // Example feedback link
            className="px-8 py-3 bg-transparent text-slate-400 border border-white/5 rounded-xl font-semibold hover:bg-white/5 hover:text-white transition-all flex items-center gap-2"
          >
            Tell us why you left <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Footer Note */}
        <p className="mt-20 text-xs font-mono uppercase tracking-[0.2em] text-slate-600">
          Transmission Ended // Respondo CRM v3.0
        </p>
      </div>

      {/* Bottom Light Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
    </div>
  );
}
