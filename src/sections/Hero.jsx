import React, { useContext, useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import { UIContext } from "../App";
import SignalField from "../components/SignalField";
import LiveConsole from "../demos/LiveConsole";
import { Link } from "../lib/router";
import { heroVerbs, profile, stats } from "../data/profile";
import { usePrefersReducedMotion, yearsSince } from "../lib/hooks";
import { modKey } from "../components/Nav";

function Typer({ words }) {
  const reduced = usePrefersReducedMotion();
  const [i, setI] = useState(0);
  const [n, setN] = useState(reduced ? words[0].length : 0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (reduced) return undefined;
    const word = words[i];
    let t;
    if (!del && n < word.length) t = setTimeout(() => setN(n + 1), 55);
    else if (!del) t = setTimeout(() => setDel(true), 1900);
    else if (n > 0) t = setTimeout(() => setN(n - 1), 25);
    else {
      setDel(false);
      setI((i + 1) % words.length);
    }
    return () => clearTimeout(t);
  }, [n, del, i, words, reduced]);

  return (
    <span className="text-ink">
      {words[i].slice(0, n)}
      <span className="caret ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.12em] bg-accent-text" />
    </span>
  );
}

export default function Hero() {
  const { openPalette } = useContext(UIContext);
  const years = Math.floor(yearsSince(profile.careerStart) * 10) / 10;
  const heroStats = stats.map((s) => (s.computed === "years" ? { ...s, value: `${years >= 3 ? Math.floor(years) : years}+` } : s));

  return (
    <section id="top" className="noise relative overflow-hidden pb-16 pt-28 sm:pt-32 md:pb-24">
      <SignalField className="mask-fade-b opacity-90" />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--accent-soft),transparent)]" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center lg:gap-10">
        <div className="min-w-0">
          <div className="rise mb-7 inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pl-2 pr-3.5 text-xs text-ink-2 backdrop-blur" style={{ "--d": "0ms" }}>
            <span className="relative flex h-5 items-center gap-1.5 rounded-full bg-accent-soft px-2 font-mono text-[10px] uppercase tracking-wider text-accent-text">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" /> Now
            </span>
            <span className="truncate">Building Innov8 Idea Management at {profile.company}</span>
          </div>

          <h1 className="rise font-display text-[clamp(2.6rem,5.4vw,4.6rem)] font-extrabold leading-[0.95] tracking-[-0.045em]" style={{ "--d": "80ms" }}>
            I build products
            <br />
            that live inside{" "}
            <span className="relative inline-block">
              <span className="text-gradient">SharePoint.</span>
              <svg aria-hidden viewBox="0 0 300 20" className="absolute -bottom-2 left-0 w-full text-accent-text" preserveAspectRatio="none">
                <path d="M2 14 C 60 4, 120 4, 170 10 S 260 18, 298 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="draw-path" />
              </svg>
            </span>
          </h1>

          <p className="rise mt-8 text-lg text-ink-2 sm:text-xl" style={{ "--d": "160ms" }}>
            Lately that means <Typer words={heroVerbs} />
          </p>

          <p className="rise mt-5 max-w-xl leading-relaxed text-ink-3" style={{ "--d": "220ms" }}>
            I'm {profile.name}, a {profile.role} with {Math.floor(years)}+ years on SharePoint Online. My work moved from single web parts to full
            applications: staged review workflows, a CMS for non-technical admins, and a configurable awards platform, built with SPFx, React, TypeScript, Graph and
            Power Automate.
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ "--d": "280ms" }}>
            <Link
              to="/#work"
              className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-accent-ink shadow-[0_10px_40px_-10px_var(--accent)] transition hover:-translate-y-0.5"
            >
              Explore the work <ArrowDownRight className="h-4 w-4 transition group-hover:rotate-[-45deg]" />
            </Link>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-surface/60 px-5 py-3 font-semibold backdrop-blur transition hover:bg-surface-2"
            >
              Resume <ArrowUpRight className="h-4 w-4" />
            </a>
            <button type="button" onClick={openPalette} className="hidden items-center gap-2 px-2 text-sm text-ink-3 hover:text-ink md:inline-flex">
              or press <span className="kbd">{modKey}</span>
            </button>
          </div>

          <p className="rise mt-8 inline-flex items-center gap-2 text-sm text-ink-3" style={{ "--d": "340ms" }}>
            <MapPin className="h-4 w-4" /> {profile.location}, India · {profile.available}
          </p>
        </div>

        <div className="rise min-w-0" style={{ "--d": "250ms" }}>
          <LiveConsole />
        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-6xl px-4 sm:px-6 md:mt-20">
        <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-surface/50 backdrop-blur md:grid-cols-4">
          {heroStats.map((s, i) => (
            <div key={s.label} className={`p-5 sm:p-6 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""} border-line`}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{s.value}</dd>
              <dd className="mt-1 text-sm text-ink-3">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
