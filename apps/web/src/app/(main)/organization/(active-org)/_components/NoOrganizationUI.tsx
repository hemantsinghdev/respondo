import React from "react";
import { InitializeNodeButton } from "./InitializeNodeButton";
import { Building2 } from "@repo/ui/icons";

function NoOrganizationUI({ session }: { session: any }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in-95 duration-1000">
      <div className="group relative mb-8 mt-8">
        <div className="absolute -inset-4 rounded-full bg-cyan-500/10 blur-xl transition-all" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-dashed border-white/10 bg-[#0D0D0D]">
          <Building2 className="h-10 w-10 text-slate-500" />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-white mb-3">No Active Node</h2>
      <p className="mb-10 text-center text-slate-400 max-w-sm leading-relaxed">
        Your account is currently floating in the void. Initialize an
        organization node to begin.
      </p>
      <InitializeNodeButton isEmailVerified={session.user.emailVerified} />
    </div>
  );
}

export default NoOrganizationUI;
