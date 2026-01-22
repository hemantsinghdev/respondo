import { Button } from "@repo/ui/components";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CtaSection() {
  return (
    <section className="py-40 container mx-auto px-6 text-center">
      <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-cyan-600/20 to-purple-600/20 border border-white/10 p-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[#0A0A0A]/60 -z-10" />
        <h2 className="text-5xl font-extrabold text-white mb-6">
          Ready to calm the support chaos?
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join the businesses using Respondo to provide sensational support at a
          sensible price.
        </p>
        <Link href="/signup">
          <Button
            size="lg"
            className="cursor-pointer bg-white text-black hover:bg-cyan-400 hover:text-black h-16 px-12 rounded-full font-black text-xl transition-all"
          >
            SIGN UP FOR FREE <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </Link>
        <p className="mt-6 text-sm text-slate-500">
          No credit card required. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
