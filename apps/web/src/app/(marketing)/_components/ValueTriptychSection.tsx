import { Card, CardContent } from "@repo/ui/components";
import { BrainCircuit, Layers, Zap } from "@repo/ui/icons";
import React from "react";

export default function ValueTriptychSection() {
  return (
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
  );
}
