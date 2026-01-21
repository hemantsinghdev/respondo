import { Badge, StackVisual } from "@repo/ui/components";
import React from "react";

export default function TechStackSection() {
  return (
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
  );
}
