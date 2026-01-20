import React from "react";
import { User, TrendingUp, CheckCircle2 } from "lucide-react";

export const TeamVisual = () => {
  return (
    <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      <div className="h-8 bg-slate-800/50 flex items-center px-4 gap-1.5 border-b border-white/5">
        <div className="h-2 w-2 rounded-full bg-red-500/50" />
        <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
        <div className="h-2 w-2 rounded-full bg-green-500/50" />
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center">
              <User className="text-white h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Alice Cooper</p>
              <p className="text-[10px] text-slate-500">Last Contact: 2h ago</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
            </div>
            <p className="text-[10px] text-slate-400 text-right">
              Loyalty Score: 85%
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
            <TrendingUp className="h-5 w-5 text-green-400 mx-auto mb-2" />
            <p className="text-xl font-bold text-white">1.2m</p>
            <p className="text-[10px] text-slate-500">Avg. Response</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
            <CheckCircle2 className="h-5 w-5 text-blue-400 mx-auto mb-2" />
            <p className="text-xl font-bold text-white">98%</p>
            <p className="text-[10px] text-slate-500">SLA Met</p>
          </div>
        </div>
      </div>
    </div>
  );
};
