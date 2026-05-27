import React from "react";

export default function ToolCard({ tool, delay = 0 }) {
  return (
    <div className="reveal-up h-full min-w-0" style={{ transitionDelay: `${delay}ms` }}>
      <div className="group flex h-full min-h-32 flex-col items-center justify-center gap-3 rounded-[22px] border border-white/10 bg-white/5 p-4 text-center transition-all duration-500 ease-out hover:-translate-y-1 hover:border-cyan-400/35 hover:bg-cyan-400/[0.08] hover:shadow-[0_0_22px_rgba(34,211,238,0.08)] sm:min-h-36 sm:rounded-[24px] sm:p-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 p-2 transition group-hover:bg-white/15 sm:h-14 sm:w-14">
          <img
            src={tool.icon}
            alt={tool.name}
            className="h-full w-full object-contain filter brightness-90 transition group-hover:brightness-110"
          />
        </div>

        <p className="text-xs font-semibold leading-5 text-slate-200 transition group-hover:text-cyan-100 sm:text-sm">
          {tool.name}
        </p>
      </div>
    </div>
  );
}
