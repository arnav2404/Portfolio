import React from "react";

export default function ProjectCard({ project, delay = 0 }) {
  return (
    <div className="reveal-up h-full" style={{ transitionDelay: `${delay}ms` }}>
      <div className="h-full min-h-[560px] rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/10 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-cyan-400/35 hover:bg-cyan-400/[0.08] hover:shadow-[0_0_22px_rgba(34,211,238,0.08)]">
        <div className="flex h-full flex-col">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
              <p className="mt-1 text-sm text-cyan-300">{project.period}</p>
            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
              Case Study
            </div>
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-300">{project.summary}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-5 grid gap-3">
            {project.bullets.map((bullet) => (
              <div
                key={bullet}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-7 text-slate-300"
              >
                {bullet}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}