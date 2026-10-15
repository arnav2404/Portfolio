import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../lib/router";
import { accentVar, getWork, work } from "../data/work";
import { getScreenGroups } from "../data/screens";
import { ScreenGrid } from "../sections/Screens";
import { Tag } from "../components/ui";
import LifecycleDemo from "../demos/LifecycleDemo";
import CmsDemo from "../demos/CmsDemo";
import KqlDemo from "../demos/KqlDemo";
import { useInView, usePrefersReducedMotion } from "../lib/hooks";
import { profile } from "../data/profile";
import HireCta from "../components/HireCta";

const demosFor = {
  innov8: [
    { title: "Idea lifecycle", note: "Ideas move through staged review; every move is a workflow event that Power Automate acts on.", Demo: LifecycleDemo },
    { title: "CMS dashboard", note: "Admins edit in a form, see it live in the real page frame, then schedule and publish.", Demo: CmsDemo },
  ],
  "corp-dms": [{ title: "Search composer", note: "Filters compose a KQL query; results are normalized and cached.", Demo: KqlDemo }],
};

function DemoFrame({ title, note, Demo }) {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const reduced = usePrefersReducedMotion();
  return (
    <div ref={ref} className="reveal card overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
        <span className="font-display font-semibold">{title}</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-ink-3">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" /> simulated
        </span>
      </div>
      <div className="h-[300px] p-4">
        <Demo running={inView && !reduced} />
      </div>
      <p className="border-t border-line px-5 py-3 text-sm text-ink-3">{note}</p>
    </div>
  );
}

function Flow({ flow, color }) {
  return (
    <div className="reveal card overflow-hidden p-6 sm:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">Architecture</p>
      <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">{flow.title}</h3>
      <ol className="mt-8 flex flex-col gap-0 lg:flex-row lg:items-stretch">
        {flow.nodes.map((n, i) => (
          <li key={n.label} className="flex flex-col items-stretch lg:flex-1 lg:flex-row lg:items-stretch">
            <div className="rise flex-1 rounded-2xl border border-line bg-surface-2 p-4" style={{ "--d": `${i * 90}ms` }}>
              <span className="font-mono text-[10px]" style={{ color }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-1 font-semibold leading-tight">{n.label}</p>
              <p className="mt-1 text-sm text-ink-3">{n.sub}</p>
            </div>
            {i < flow.nodes.length - 1 && (
              <svg aria-hidden className="mx-auto h-8 w-6 flex-none lg:h-6 lg:w-10 lg:self-center" viewBox="0 0 24 24">
                <line x1="12" y1="0" x2="12" y2="24" stroke={color} strokeWidth="2" className="flow-line lg:hidden" />
                <line x1="0" y1="12" x2="24" y2="12" stroke={color} strokeWidth="2" className="flow-line hidden lg:block" />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function CaseStudy({ slug }) {
  const w = getWork(slug);
  const color = accentVar[w.accent];
  const idx = work.findIndex((x) => x.slug === slug);
  const next = work[(idx + 1) % work.length];
  const screens = getScreenGroups(w.screens);
  const demos = demosFor[slug] || [];

  return (
    <article className="pt-28 sm:pt-32">
      <header className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Link to="/#work" className="rise inline-flex items-center gap-2 text-sm text-ink-3 transition hover:text-ink">
          <ArrowLeft className="h-4 w-4" /> All work
        </Link>
        <p className="rise mt-10 font-mono text-xs uppercase tracking-[0.22em]" style={{ color, "--d": "60ms" }}>
          {w.kicker}
        </p>
        <h1 className="rise mt-4 font-display text-[clamp(3rem,10vw,8rem)] font-extrabold leading-[0.9] tracking-[-0.05em]" style={{ "--d": "120ms" }}>
          {w.name}
        </h1>
        <p className="rise mt-6 max-w-3xl text-xl leading-relaxed text-ink-2 sm:text-2xl" style={{ "--d": "180ms" }}>
          {w.tagline}
        </p>

        <dl className="rise mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4" style={{ "--d": "240ms" }}>
          {[
            ["Role", w.role],
            ["Timeline", w.period],
            ["Status", w.status],
            ["Built by", profile.name],
          ].map(([k, v]) => (
            <div key={k} className="bg-bg p-5">
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">{k}</dt>
              <dd className="mt-2 font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        <ul className="rise mt-6 flex flex-wrap gap-2" style={{ "--d": "300ms" }}>
          {w.stack.map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>
      </header>

      <div className="mx-auto max-w-6xl space-y-24 px-4 py-24 sm:px-6 md:space-y-32">
        <section className="grid gap-10 md:grid-cols-2">
          <div className="reveal">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-3">The problem</h2>
            <p className="mt-4 font-display text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">{w.problem}</p>
          </div>
          <div className="reveal" style={{ "--d": "100ms" }}>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-3">The product</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">{w.summary}</p>
            <dl className="mt-8 grid grid-cols-2 gap-3">
              {w.facts.map((f) => (
                <div key={f.k} className="flex flex-col-reverse rounded-2xl border border-line p-4">
                  <dt className="mt-1 text-xs text-ink-3">{f.k}</dt>
                  <dd className="font-display text-xl font-bold tracking-tight" style={{ color }}>
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {demos.length > 0 && (
          <section>
            <h2 className="reveal mb-8 font-display text-3xl font-bold tracking-tight sm:text-4xl">See the idea in motion</h2>
            <div className={`grid gap-4 ${demos.length > 1 ? "lg:grid-cols-2" : ""}`}>
              {demos.map((d) => (
                <DemoFrame key={d.title} {...d} />
              ))}
            </div>
            <p className="mt-4 font-mono text-[11px] text-ink-3">Recreated for this portfolio. No client code, data or branding.</p>
          </section>
        )}

        <section>
          <h2 className="reveal mb-10 font-display text-3xl font-bold tracking-tight sm:text-4xl">What I built</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {w.groups.map((g, gi) => (
              <div key={g.title} className={`reveal card p-7 ${w.groups.length % 2 && gi === w.groups.length - 1 ? "md:col-span-2" : ""}`}>
                <h3 className="font-display text-xl font-semibold tracking-tight">{g.title}</h3>
                <ul className="mt-5 space-y-3.5">
                  {g.items.map((it) => (
                    <li key={it} className="flex gap-3 leading-relaxed text-ink-2">
                      <span className="mt-2.5 h-1 w-3 flex-none rounded-full" style={{ background: color }} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {w.flow && <Flow flow={w.flow} color={color} />}

        {w.decisions.length > 0 && (
          <section>
            <h2 className="reveal mb-10 font-display text-3xl font-bold tracking-tight sm:text-4xl">Decisions worth explaining</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {w.decisions.map((d, i) => (
                <div key={d.title} className="reveal border-t-2 pt-5" style={{ borderColor: color, "--d": `${i * 80}ms` }}>
                  <h3 className="font-display text-lg font-semibold tracking-tight">{d.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-2">{d.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {screens.length > 0 && (
          <section>
            <h2 className="reveal mb-10 font-display text-3xl font-bold tracking-tight sm:text-4xl">Screens</h2>
            <ScreenGrid groups={screens} />
          </section>
        )}
      </div>

      <Link to={`/work/${next.slug}`} className="group block border-t border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-16 sm:px-6 md:py-24">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-3">Next case study</p>
            <p className="mt-3 font-display text-4xl font-extrabold tracking-tight transition group-hover:translate-x-2 sm:text-6xl">{next.name}</p>
            <p className="mt-2 text-ink-3">{next.kicker}</p>
          </div>
          <span className="grid h-16 w-16 flex-none place-items-center rounded-full border border-line-strong transition group-hover:border-transparent group-hover:bg-accent group-hover:text-accent-ink sm:h-24 sm:w-24">
            <ArrowRight className="h-6 w-6 transition group-hover:-rotate-45" />
          </span>
        </div>
      </Link>
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <HireCta subject={`About ${w.name}`} />
      </div>
    </article>
  );
}
