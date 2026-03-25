import React from "react";

export default function SkillCard({ title, items, delay = 0 }) {
  return (
    <div className="reveal-up" style={{ transitionDelay: `${delay}ms` }}>
      <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-white/10 via-white/[0.04] to-cyan-400/[0.03] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-cyan-400/35 hover:bg-cyan-400/[0.08] hover:shadow-[0_0_22px_rgba(34,211,238,0.08)]">
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute -left-10 top-0 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl" />
          <div className="absolute right-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
        </div>

        <div className="relative">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h3 className="text-xl font-semibold text-white transition-colors duration-500 group-hover:text-cyan-100">
              {title}
            </h3>

            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-500 shadow-[0_0_12px_rgba(14,165,233,0.8)]"></span>
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-50 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-cyan-300/45 hover:bg-cyan-400/18 hover:shadow-[0_0_18px_rgba(34,211,238,0.10)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}