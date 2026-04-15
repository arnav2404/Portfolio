import React from "react";

export default function ExperienceCard({ item, delay = 0 }) {
  return (
    <div className="reveal-up h-full" style={{ transitionDelay: `${delay}ms` }}>
      <div className="group relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-cyan-400/35 hover:bg-cyan-400/[0.08] hover:shadow-[0_0_22px_rgba(34,211,238,0.08)]">
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute -left-10 top-0 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl" />
          <div className="absolute right-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
        </div>

        <div className="relative flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-white">{item.role}</h3>
            <p className="mt-1 text-cyan-300">{item.company}</p>
            <p className="mt-1 text-slate-300">{item.location}</p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
            {item.period}
          </span>
        </div>

        <div className="relative mt-5 grid gap-3">
          {item.points.map((point) => (
            <div
              key={point}
              className="rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm leading-7 text-slate-300"
            >
              {point}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}