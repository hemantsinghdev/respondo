import React from "react";
import Image from "next/image";
import { Images } from "@repo/ui/assets";
import { Button } from "@repo/ui/components";
import { ArrowRight } from "@repo/ui/icons";
import Link from "next/link";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-200 selection:bg-cyan-500/30">
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image
                src={Images.logos.long}
                alt="Respondo Logo"
                width={140}
                height={40}
                className="object-contain"
              />
            </Link>
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
            <Link href="/login">
              <Button
                variant="ghost"
                className="cursor-pointer text-slate-300 hover:text-white hover:bg-white/5"
              >
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 transition-transform">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {children}

      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-white/5 bg-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16">
            <div className="max-w-xs">
              <Image
                src={Images.logos.long}
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
