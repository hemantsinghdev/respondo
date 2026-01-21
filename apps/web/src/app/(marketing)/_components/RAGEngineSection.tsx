import { RAGVisual } from "@repo/ui/components";
import { ShieldCheck } from "lucide-react";
import React from "react";

export default function RAGEngineSection() {
  return (
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
              guess. It acts like your smartest agent by looking up past ticket
              history and knowledge bases instantly.
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
  );
}
