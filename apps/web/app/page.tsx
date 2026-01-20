import React from "react";
import { Button, Card, CardContent, Badge } from "@repo/ui/components";
import Image from "next/image";
import { Assets } from "@repo/ui/assets";
import {
  ArrowRight,
  Layers,
  BrainCircuit,
  Zap,
  ShieldCheck,
} from "lucide-react";
import {
  ConnectivityVisual,
  DashboardVisual,
  RAGVisual,
  StackVisual,
  TeamVisual,
} from "@repo/ui/components";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-200 selection:bg-cyan-500/30">
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            {/* Using your custom logo path */}
            <Image
              src={Assets.logos.long}
              alt="Respondo Logo"
              width={140}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-400">
            <a
              href="#channels"
              className="hover:text-cyan-400 transition-colors"
            >
              Channels
            </a>
            <a href="#ai" className="hover:text-purple-400 transition-colors">
              RAG AI
            </a>
            <a href="#team" className="hover:text-cyan-400 transition-colors">
              Team
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-white/5"
            >
              Login
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 transition-transform">
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
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
                Let our RAG AI learn your past tickets to draft perfect
                responses instantly.
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

      {/* --- VALUE TRIPTYCH (Centered & Spacious) --- */}
      <section
        id="channels"
        className="py-32 bg-white/[0.01] border-y border-white/5"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-white mb-4">
              Sensational support without the chaos
            </h2>
            <p className="text-slate-500">
              Everything you need to manage communication at scale.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {/* Unified Inbox */}
            <Card className="border-white/5 bg-[#0D0D0D] transition-all hover:border-cyan-500/50 group py-10">
              <CardContent className="flex flex-col items-center text-center">
                <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 group-hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] transition-all">
                  <Layers className="h-8 w-8" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">
                  Unified Inbox
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Connect Gmail, IMAP, and WhatsApp. Every message arrives as a
                  structured ticket with priority and SLA timers.
                </p>
              </CardContent>
            </Card>

            {/* AI Co-Pilot */}
            <Card className="border-white/5 bg-[#0D0D0D] transition-all hover:border-purple-500/50 group py-10">
              <CardContent className="flex flex-col items-center text-center">
                <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all">
                  <BrainCircuit className="h-8 w-8" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">
                  RAG AI Co-Pilot
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  AI that learns from your FAQs and past tickets. Generate safe,
                  accurate drafts that agents approve before sending.
                </p>
              </CardContent>
            </Card>

            {/* Workflows */}
            <Card className="border-white/5 bg-[#0D0D0D] transition-all hover:border-green-500/50 group py-10">
              <CardContent className="flex flex-col items-center text-center">
                <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10 text-green-400 group-hover:shadow-[0_0_25px_rgba(34,197,94,0.3)] transition-all">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">
                  Smart Workflows
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Automatic ticket assignment and category tagging based on
                  keywords. Never miss a high-priority customer again.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* --- RAG ENGINE DEEP DIVE --- */}
      <section id="ai" className="py-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2">
              <h2 className="text-5xl font-bold text-white mb-8">
                AI that learns your business,{" "}
                <span className="text-purple-400">safely.</span>
              </h2>
              <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                Our Retrieval-Augmented Generation (RAG) system doesn't just
                guess. It acts like your smartest agent by looking up past
                ticket history and knowledge bases instantly.
              </p>
              <ul className="space-y-6">
                {[
                  "Summarize long email threads in one click",
                  "Suggest priority and category automatically",
                  "Agent-in-the-loop ensures 100% accuracy",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 text-slate-300 text-lg"
                  >
                    <div className="h-6 w-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <ShieldCheck className="h-4 w-4 text-purple-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2">
              <RAGVisual />
            </div>
          </div>
        </div>
      </section>

      {/* --- TEAM & ORGANIZATION --- */}
      <section id="team" className="py-40 bg-white/[0.01]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Empower your entire support team
          </h2>
          <p className="text-slate-400 mb-16 max-w-2xl mx-auto">
            Built for scale with dedicated roles for Admins, Leads, and Support
            Agents. Track performance with detailed audit logs and SLA
            compliance reports.
          </p>
          <div className="flex justify-center">
            <TeamVisual />
          </div>
        </div>
      </section>

      {/* --- TECH STACK --- */}
      <section className="py-32 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <Badge className="mb-6 bg-slate-800 text-slate-400">
            The Modern Stack
          </Badge>
          <h2 className="text-3xl font-bold text-white mb-12">
            Blazing fast. Built with Next.js & PostgreSQL.
          </h2>
          <StackVisual />
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-40 container mx-auto px-6 text-center">
        <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-cyan-600/20 to-purple-600/20 border border-white/10 p-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[#0A0A0A]/60 -z-10" />
          <h2 className="text-5xl font-extrabold text-white mb-6">
            Ready to calm the support chaos?
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the businesses using Respondo to provide sensational support at
            a sensible price.
          </p>
          <Button
            size="lg"
            className="bg-white text-black hover:bg-cyan-400 hover:text-black h-16 px-12 rounded-full font-black text-xl transition-all"
          >
            SIGN UP FOR FREE <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
          <p className="mt-6 text-sm text-slate-500">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-white/5 bg-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16">
            <div className="max-w-xs">
              <Image
                src={Assets.logos.long}
                alt="Respondo"
                width={120}
                height={30}
                className="mb-6 opacity-80"
              />
              <p className="text-slate-500 text-sm leading-relaxed">
                The AI-powered CRM for the modern small business. Centralize,
                automate, and excel.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 text-sm text-slate-500">
              <div className="space-y-4">
                <h4 className="text-white font-bold tracking-widest uppercase text-xs">
                  Product
                </h4>
                <p className="hover:text-cyan-400 cursor-pointer transition-colors">
                  Unified Inbox
                </p>
                <p className="hover:text-cyan-400 cursor-pointer transition-colors">
                  AI Engine
                </p>
                <p className="hover:text-cyan-400 cursor-pointer transition-colors">
                  Pricing
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-white font-bold tracking-widest uppercase text-xs">
                  Support
                </h4>
                <p className="hover:text-cyan-400 cursor-pointer transition-colors">
                  Documentation
                </p>
                <p className="hover:text-cyan-400 cursor-pointer transition-colors">
                  API Status
                </p>
                <p className="hover:text-cyan-400 cursor-pointer transition-colors">
                  Security
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-white font-bold tracking-widest uppercase text-xs">
                  Company
                </h4>
                <p className="hover:text-cyan-400 cursor-pointer transition-colors">
                  About Us
                </p>
                <p className="hover:text-cyan-400 cursor-pointer transition-colors">
                  Privacy
                </p>
                <p className="hover:text-cyan-400 cursor-pointer transition-colors">
                  Terms
                </p>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between text-xs text-slate-600">
            <p>© 2026 Respondo CRM. All rights reserved.</p>
            <p>Built with ❤️ for Small Businesses.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
