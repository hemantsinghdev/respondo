import { Building2, Plus } from "lucide-react";

export default function OrganizationPage() {
  return (
    <div className="animate-in fade-in duration-700 flex flex-col items-center justify-center py-20">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/5">
        <Building2 className="h-10 w-10 text-zinc-600" />
      </div>
      <h2 className="text-2xl font-bold text-white">Organizations</h2>
      <p className="mb-8 text-center text-slate-400 max-w-sm">
        You are currently not part of an organization. Create one to start
        managing tickets.
      </p>
      <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105 transition-transform">
        <Plus className="h-5 w-5" />
        Create Organization
      </button>
    </div>
  );
}
