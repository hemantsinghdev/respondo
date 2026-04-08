export default function Dashboard() {
  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-[#94A3B8]">
          Monitor your organization's performance at a glance.
        </p>
      </header>

      {/* Grid of Metric Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Minimal Stat Cards to establish the UI style */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-white/5 bg-[#0D0D0D] p-6 hover:border-cyan-500/30 transition-colors"
          >
            <div className="h-2 w-12 rounded-full bg-cyan-500/20 mb-4" />
            <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
