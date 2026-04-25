"use client";

import React, { useState } from "react";
import { InitializeNodeButton } from "./InitializeNodeButton";
import { Building2, Wifi, ShieldAlert } from "@repo/ui/icons";
import { IncomingInvitationsDialog } from "./IncomingInvitationsDialog";
import { cn } from "@repo/ui/lib/utils";

function NoOrganizationUI({ session }: { session: any }) {
  const [isSignalsOpen, setIsSignalsOpen] = useState(false);
  const isEmailVerified = session.user.emailVerified;

  return (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in-95 duration-1000">
      <div className="group relative mb-8 mt-8">
        <div className="absolute -inset-4 rounded-full bg-cyan-500/10 blur-xl transition-all group-hover:bg-cyan-500/20" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-dashed border-white/10 bg-[#0D0D0D]">
          <Building2 className="h-10 w-10 text-slate-500" />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-white mb-3">No Active Node</h2>
      <p className="mb-10 text-center text-slate-400 max-w-sm leading-relaxed">
        Your account is currently floating in the void. Initialize an
        organization node or intercept an incoming signal to begin.
      </p>

      <div className="flex flex-col items-center gap-4">
        <InitializeNodeButton isEmailVerified={isEmailVerified} />

        <button
          disabled={!isEmailVerified}
          onClick={() => setIsSignalsOpen(true)}
          className={cn(
            "group flex items-center gap-2 px-6 py-2 rounded-xl transition-all font-medium text-sm",
            isEmailVerified
              ? "text-slate-400 hover:text-cyan-400 hover:bg-white/5"
              : "text-slate-600 cursor-not-allowed",
          )}
        >
          {isEmailVerified ? (
            <Wifi
              size={16}
              className="text-cyan-500/50 group-hover:text-cyan-400"
            />
          ) : (
            <ShieldAlert size={16} />
          )}
          <span>
            {isEmailVerified
              ? "Scan for Incoming Signals"
              : "Verify Email to Intercept Signals"}
          </span>
        </button>
      </div>

      {isSignalsOpen && (
        <IncomingInvitationsDialog onClose={() => setIsSignalsOpen(false)} />
      )}
    </div>
  );
}

export default NoOrganizationUI;
