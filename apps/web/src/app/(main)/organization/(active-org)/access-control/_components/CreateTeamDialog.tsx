"use client";

import { useState } from "react";
import { X, Network, Loader2, Save } from "@repo/ui/icons";
import { authClient } from "@repo/auth/client";
import { notify } from "@app/lib/notify";

export function CreateTeamDialog({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    const { error } = await authClient.organization.createTeam({ name });

    if (error)
      notify.error(error.message || "Failed to initialize team architecture.");
    else {
      notify.success("Team Deployed successfully.");
      onCreated();
      onClose();
    }
    setIsCreating(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0D0D0D] border border-white/10 rounded-3xl w-full max-w-md shadow-[0_0_40px_rgba(6,182,212,0.15)] overflow-hidden relative animate-in zoom-in-95">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600" />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Network className="text-cyan-400" size={20} /> Initialize Team
            </h2>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleCreate} className="space-y-6">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">
                Team Designation
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Enterprise Support"
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50"
              />
            </div>
            <button
              type="submit"
              disabled={isCreating}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 py-3 font-bold text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all disabled:opacity-50"
            >
              {isCreating ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Save size={18} />
              )}{" "}
              Deploy Team
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
