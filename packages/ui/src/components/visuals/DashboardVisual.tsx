import React from "react";
import {
  Mail,
  MessageSquare,
  Send,
  Bot,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const DashboardVisual = () => {
  return (
    <div className="relative mx-auto max-w-5xl px-4 py-12">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute top-1/2 right-0 -z-10 h-[300px] w-[300px] bg-purple-500/10 blur-[100px] rounded-full" />

      {/* Main Dashboard Container - Isometric Perspective */}
      <div className="relative transition-transform duration-700 hover:rotate-1 lg:rotate-[-2deg] lg:skew-x-[2deg] lg:perspective-[1000px]">
        {/* The "App Window" */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 shadow-2xl backdrop-blur-xl">
          {/* Window Header */}
          <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
            </div>
            <div className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
              Respondo Unified Workspace
            </div>
            <div className="w-10" />
          </div>

          <div className="flex h-[400px]">
            {/* Sidebar - Channels */}
            <div className="w-16 flex-col items-center py-6 border-r border-white/5 hidden sm:flex space-y-6">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                <Mail className="h-5 w-5" />
              </div>
              <div className="p-2 rounded-lg text-slate-600 hover:text-green-400 transition-colors">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="p-2 rounded-lg text-slate-600">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>

            {/* Main Conversation Area */}
            <div className="flex-1 p-6 space-y-6 bg-gradient-to-b from-transparent to-white/[0.02]">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-800 border border-white/10" />
                <div className="space-y-2 max-w-[70%]">
                  <div className="h-3 w-24 bg-slate-800 rounded" />
                  <div className="p-3 rounded-2xl rounded-tl-none bg-slate-900 border border-white/5 text-xs text-slate-400 leading-relaxed">
                    Hello! I'm having trouble connecting my custom IMAP settings
                    to the dashboard. Can you help?
                  </div>
                </div>
              </div>

              {/* AI Drafting Animation Effect */}
              <div className="flex items-start justify-end gap-3">
                <div className="space-y-2 max-w-[75%]">
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-tighter">
                      AI Assistant Drafting...
                    </span>
                    <Bot className="h-3 w-3 text-purple-400 animate-pulse" />
                  </div>
                  <div className="p-4 rounded-2xl rounded-tr-none bg-purple-500/5 border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.1)] text-xs text-slate-300 italic">
                    "I see you're working with IMAP. Based on your past tickets
                    #402 and #488, the port should be set to 993..."
                  </div>
                  <div className="flex justify-end gap-2">
                    <div className="px-3 py-1 rounded-md bg-cyan-500/20 text-cyan-400 text-[10px] font-bold border border-cyan-500/30">
                      Approve & Send
                    </div>
                    <div className="px-3 py-1 rounded-md bg-white/5 text-slate-500 text-[10px] font-bold">
                      Edit
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Info Panel */}
            <div className="w-48 p-6 bg-white/[0.03] border-l border-white/5 hidden lg:block">
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-3">
                    Customer Info
                  </h4>
                  <div className="h-10 w-full bg-slate-800/50 rounded-lg border border-white/5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-3">
                    RAG Context
                  </h4>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-purple-500/20 rounded" />
                    <div className="h-2 w-3/4 bg-purple-500/20 rounded" />
                    <div className="h-2 w-1/2 bg-purple-500/20 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute -top-6 -right-6 p-4 rounded-xl bg-slate-900 border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)] hidden md:block animate-bounce duration-[3000ms]">
          <ShieldCheck className="h-6 w-6 text-purple-400" />
        </div>

        <div className="absolute -bottom-10 -left-10 p-5 rounded-full bg-slate-900 border border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.3)] hidden md:block">
          <Send className="h-6 w-6 text-cyan-400" />
        </div>
      </div>
    </div>
  );
};
