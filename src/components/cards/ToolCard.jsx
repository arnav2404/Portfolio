import React from "react";

export default function ToolCard({ tool, delay = 0 }) {
  return (
    <div
      className="reveal-up"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="group flex flex-col items-center justify-center gap-4 rounded-[24px] border border-white/10 bg-white/5 p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-cyan-400/35 hover:bg-cyan-400/[0.08] hover:shadow-[0_0_22px_rgba(34,211,238,0.08)]">

        {/* Icon */}
        <div className="h-14 w-14 flex items-center justify-center rounded-xl bg-white/10 p-2">
            <img
            src={tool.icon}
            alt={tool.name}
            className="h-full w-full object-contain filter brightness-90 group-hover:brightness-110"
            />
        </div>

        {/* Name */}
        <p className="text-sm font-medium text-slate-200 group-hover:text-cyan-100">
          {tool.name}
        </p>
      </div>
    </div>
  );
}