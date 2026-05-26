import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const cardHover =
  "transform-gpu will-change-transform transition-all duration-500 ease-out hover:-translate-y-1 hover:border-cyan-400/35 hover:bg-cyan-400/[0.08] hover:shadow-[0_0_22px_rgba(34,211,238,0.08)]";

export default function ProjectCard({ project, delay = 0 }) {
  const [expanded, setExpanded] = React.useState(false);
  const bullets = project.bullets || [];
  const highlights = project.highlights || project.impact || [];
  const visibleBullets = expanded ? bullets : bullets.slice(0, 2);
  const visibleTech = expanded ? project.tech : project.tech.slice(0, 7);
  const hasMore = bullets.length > 2 || project.tech.length > 7;

  return (
    <div className="reveal-up" style={{ transitionDelay: `${delay}ms` }}>
      <article className={`group rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/10 ${cardHover}`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-xl font-semibold leading-snug text-white md:text-2xl">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-cyan-300">{project.period}</p>
          </div>

          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 transition-all duration-500 group-hover:border-cyan-400/30 group-hover:text-cyan-100">
            {project.label || "Case Study"}
          </div>
        </div>

        <p className="mt-5 text-sm leading-7 text-slate-300">{project.summary}</p>

        {highlights.length > 0 && (
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-semibold leading-5 text-slate-200 transition-all duration-500 group-hover:border-cyan-400/20 group-hover:bg-cyan-400/[0.06]"
              >
                {item}
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {visibleTech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 transition-all duration-500 group-hover:border-cyan-400/20"
            >
              {item}
            </span>
          ))}
          {!expanded && project.tech.length > visibleTech.length && (
            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
              +{project.tech.length - visibleTech.length} more
            </span>
          )}
        </div>

        <div className="mt-5 grid gap-3">
          {visibleBullets.map((bullet) => (
            <div
              key={bullet}
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-7 text-slate-300 transition-all duration-500 group-hover:border-cyan-400/20 group-hover:bg-black/25"
            >
              {bullet}
            </div>
          ))}
        </div>

        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="mt-5 inline-flex w-fit items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-cyan-100 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-cyan-400/35 hover:bg-cyan-400/[0.08]"
          >
            {expanded ? "Show less" : "Read more"}
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        )}
      </article>
    </div>
  );
}
