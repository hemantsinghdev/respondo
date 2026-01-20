import React from "react";

export const StackVisual = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8 md:gap-16 py-10 opacity-70">
      {[
        {
          name: "Next.js",
          color: "from-white to-slate-400",
          label: "Frontend",
        },
        {
          name: "PostgreSQL",
          color: "from-blue-400 to-indigo-600",
          label: "Database",
        },
        {
          name: "Redis",
          color: "from-red-400 to-orange-600",
          label: "Background Jobs",
        },
        {
          name: "BullMQ",
          color: "from-yellow-400 to-amber-600",
          label: "Queueing",
        },
      ].map((tech, i) => (
        <div key={i} className="group relative flex flex-col items-center">
          <div
            className={`h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-gradient-to-br ${tech.color} p-[1px] group-hover:scale-110 transition-transform duration-300`}
          >
            <div className="h-full w-full bg-[#0A0A0A] rounded-[15px] flex items-center justify-center">
              <span className="text-xl md:text-2xl font-black text-white">
                {tech.name[0]}
              </span>
            </div>
          </div>
          <p className="mt-4 text-xs font-bold text-slate-500 group-hover:text-white transition-colors">
            {tech.name}
          </p>
          <p className="text-[9px] text-slate-700 uppercase">{tech.label}</p>
          {/* Subtle Glow */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${tech.color} blur-2xl opacity-0 group-hover:opacity-20 transition-opacity`}
          />
        </div>
      ))}
    </div>
  );
};
