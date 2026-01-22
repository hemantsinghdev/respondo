import React from "react";

export function AccessAuthLayout({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="w-full max-w-[450px] z-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
          {title}
          <span className="text-cyan-500">.</span>
        </h1>
        <p className="text-[#94A3B8] text-sm">{description}.</p>
      </div>

      <div className="bg-[#121212] border border-white/5 rounded-2xl p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
        {/* Subtle top border glow */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        {children}
      </div>
    </div>
  );
}
