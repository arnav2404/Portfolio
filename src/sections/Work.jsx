import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHead } from "../components/ui";
import { Link } from "../lib/router";
import { accentVar, work } from "../data/work";
import { screenGroups } from "../data/screens";
import { spotlight } from "../lib/hooks";

const cover = (key, n = 0) => screenGroups.find((g) => g.key === key)?.images[n];

function Visual({ type }) {
  if (type === "lifecycle" && !cover("innov8")) {
    const stages = ["Draft", "Screen", "Eval", "Sprint", "Build", "Done"];
    const heights = [92, 74, 58, 40, 28, 18];
    return (
      <div className="flex h-full items-stretch gap-2 px-1 pt-2">
        {stages.map((s, i) => (
          <div key={s} className="flex flex-1 flex-col justify-end gap-2">
            <div
              className="w-full rounded-t-lg border border-b-0 border-accent-text/30 bg-gradient-to-t from-accent-text/25 to-accent-text/5 transition-all duration-700 group-hover:from-accent-text/45"
              style={{ height: `${heights[i]}%`, transitionDelay: `${i * 60}ms` }}
            />
            <span className="text-center font-mono text-[10px] text-ink-3">{s}</span>
          </div>
        ))}
      </div>
    );
  }
  if (type === "builder" && !cover("athar")) {
    return (
      <div className="grid h-full grid-cols-[1fr_0.8fr] gap-3 p-1">
        <div className="space-y-2">
          {["Nominee", "Why they stand out", "Evidence", "Category"].map((f, i) => (
            <div key={f} className="rounded-lg border border-line bg-surface-2 p-2 transition group-hover:translate-x-1" style={{ transitionDelay: `${i * 50}ms` }}>
              <div className="font-mono text-[9px] uppercase tracking-wider text-ink-3">{f}</div>
              <div className="mt-1.5 h-1.5 rounded-full bg-line-strong" style={{ width: `${80 - i * 12}%` }} />
            </div>
          ))}
        </div>
        <div className="space-y-3 rounded-lg border border-line bg-bg/40 p-2.5">
          <div className="font-mono text-[9px] uppercase tracking-wider text-ink-3">Scoring</div>
          {[70, 45, 85].map((v, i) => (
            <div key={i}>
              <div className="h-1.5 rounded-full bg-line">
                <div className="h-1.5 rounded-full bg-violet transition-all duration-700 group-hover:w-full" style={{ width: `${v}%` }} />
              </div>
            </div>
          ))}
          <div className="pt-1 font-mono text-[9px] text-ink-3">HC review → Voting</div>
        </div>
      </div>
    );
  }
  const img = {
    lifecycle: cover("innov8", 1),
    builder: cover("athar", 0),
    wheel: cover("featurewheel", 0),
    kql: cover("corpdms", 0),
  }[type];
  return img ? (
    <div className="h-full overflow-hidden rounded-xl border border-line">
      <img
        src={img.thumb}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.04]"
      />
    </div>
  ) : null;
}

export default function Work() {
  const featured = work.filter((w) => w.featured);
  const earlier = work.filter((w) => !w.featured);

  return (
    <Section id="work">
      <SectionHead index="02" eyebrow="Selected work" title={<>Things I've built, <span className="text-ink-3">and why they're built that way.</span></>}>
        Each case study covers the problem, what I built, the architecture and the decisions behind it. Client code and data stay private; the thinking doesn't.
      </SectionHead>

      <div className="grid gap-4 md:grid-cols-6">
        {featured.map((w, i) => (
          <Link
            key={w.slug}
            to={`/work/${w.slug}`}
            onPointerMove={spotlight}
            className={`reveal spotlight card group flex flex-col overflow-hidden p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-7 ${
              i === 0 ? "md:col-span-4" : i === 1 ? "md:col-span-2" : "md:col-span-3"
            }`}
            style={{ "--d": `${(i % 2) * 80}ms` }}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: accentVar[w.accent] }}>
                {w.kicker}
              </span>
              <span className="grid h-9 w-9 flex-none place-items-center rounded-full border border-line transition group-hover:rotate-45 group-hover:border-transparent group-hover:bg-accent group-hover:text-accent-ink">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <h3 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">{w.name}</h3>
            <p className="mt-2 max-w-lg text-ink-2">{w.tagline}</p>
            <div className={`mt-6 ${i === 1 ? "h-44" : "h-48 sm:h-56"}`}>
              <Visual type={w.visual} />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 text-xs text-ink-3">
              <span>{w.period}</span>
              <span className="h-1 w-1 rounded-full bg-ink-3" />
              <span>{w.status}</span>
              <span className="ml-auto hidden font-mono sm:inline">{w.stack.slice(0, 3).join(" · ")}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="reveal mt-14">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-ink-3">Earlier · Teceon</p>
        <ul className="divide-y divide-line border-y border-line">
          {earlier.map((w) => (
            <li key={w.slug}>
              <Link to={`/work/${w.slug}`} className="group grid gap-2 py-6 sm:grid-cols-[1fr_1.4fr_auto] sm:items-center sm:gap-8">
                <span className="font-display text-2xl font-bold tracking-tight transition group-hover:translate-x-2">{w.name}</span>
                <span className="text-ink-2">{w.tagline}</span>
                <span className="flex items-center gap-3 font-mono text-xs text-ink-3">
                  {w.period}
                  <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45 group-hover:text-accent-text" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
