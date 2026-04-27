"use client";

import { KeyRound } from "@repo/ui/icons";
import { useState } from "react";
import { ChangePasswordDialog } from "./ChangePasswordDialog";

export default function ChangePasswordSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <section
        onClick={() => setIsDialogOpen(true)}
        className="rc-card rounded-2xl border border-white/5 bg-[#0D0D0D] overflow-hidden transition-all hover:border-cyan-500/30 group cursor-pointer"
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
              <KeyRound className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                Security Password
              </h3>
              <p className="text-sm text-slate-500">
                Update your account password regularly to stay secure.
              </p>
            </div>
          </div>
          <div className="px-4 py-2 rounded-lg bg-white/5 text-xs font-bold text-slate-400 group-hover:text-white transition-colors">
            CHANGE
          </div>
        </div>
      </section>

      {isDialogOpen && (
        <ChangePasswordDialog onClose={() => setIsDialogOpen(false)} />
      )}
    </>
  );
}
