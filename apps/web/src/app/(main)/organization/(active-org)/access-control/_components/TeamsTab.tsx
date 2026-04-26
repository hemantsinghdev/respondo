"use client";

import { useState, useEffect } from "react";
import { authClient } from "@repo/auth/client";
import { Users as TeamIcon, Plus, Loader2, Network } from "@repo/ui/icons";
import { CreateTeamDialog } from "./CreateTeamDialog";

export function TeamsTab() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [teams, setTeams] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTeams = async () => {
    setIsLoading(true);
    const { data } = await authClient.organization.listTeams();
    if (data) setTeams(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <TeamIcon className="text-slate-400" size={18} /> Operational Teams
        </h3>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="group flex items-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 font-bold text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all"
        >
          <Plus size={16} /> Deploy New Team
        </button>
      </div>

      {isLoading ? (
        <div className="flex py-12 justify-center">
          <Loader2 className="animate-spin text-cyan-500" />
        </div>
      ) : teams.length === 0 ? (
        <div className="border border-dashed border-white/10 rounded-2xl p-12 text-center bg-white/[0.01]">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <Network className="text-cyan-400" size={28} />
          </div>
          <h4 className="text-lg font-bold text-white mb-2">
            No Teams Deployed
          </h4>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            Group agents into specialized units.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-[#121212] border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors"
            >
              <h4 className="text-xl font-bold text-white mb-2">{team.name}</h4>
              <p className="text-sm text-slate-400 mb-6">
                Team operational parameters established.
              </p>
            </div>
          ))}
        </div>
      )}

      {isDialogOpen && (
        <CreateTeamDialog
          onClose={() => setIsDialogOpen(false)}
          onCreated={fetchTeams}
        />
      )}
    </div>
  );
}
