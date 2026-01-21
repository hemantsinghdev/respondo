import {
  Badge,
  Button,
  ConnectivityVisual,
  DashboardVisual,
} from "@repo/ui/components";
import React from "react";

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-40 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Top Half: Text Left, Connectivity Right */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-36">
          <div className="lg:w-3/5 text-center lg:text-left">
            <Badge
              variant="outline"
              className="mb-6 border-cyan-500/30 bg-cyan-500/10 text-cyan-400 px-4 py-1"
            >
              The AI-Powered Multi-Channel CRM
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Stop Drowning in Messages. <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Start Responding with AI.
              </span>
            </h1>
            <p className="mt-8 text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Connect Gmail, WhatsApp, and Web Chat into one powerhouse inbox.
              Let our RAG AI learn your past tickets to draft perfect responses
              instantly.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                size="lg"
                className="h-14 px-10 bg-white text-black font-black hover:bg-cyan-400 transition-all"
              >
                Try it for free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-10 border-white/10 bg-white/5"
              >
                Book a Demo
              </Button>
            </div>
          </div>

          {/* Right Side Visual (Abstract Connectivity) */}
          <div className="lg:w-2/5 w-full max-w-[400px]">
            <ConnectivityVisual />
          </div>
        </div>

        {/* Bottom Visual (The Real Product Dashboard) */}
        <div className="relative mt-20">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[80%] h-40 bg-cyan-500/10 blur-[100px] -z-10" />
          <DashboardVisual />
        </div>
      </div>
    </section>
  );
}
