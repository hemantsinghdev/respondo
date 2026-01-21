import { TeamVisual } from "@repo/ui/components";
import React from "react";

export default function TeamOrganizationSection() {
  return (
    <section id="team" className="py-40 bg-white/[0.01]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Empower your entire support team
        </h2>
        <p className="text-slate-400 mb-16 max-w-2xl mx-auto">
          Built for scale with dedicated roles for Admins, Leads, and Support
          Agents. Track performance with detailed audit logs and SLA compliance
          reports.
        </p>
        <div className="flex justify-center">
          <TeamVisual />
        </div>
      </div>
    </section>
  );
}
