import React, { useEffect, useState } from "react";
import { CalendarClock, CheckCircle2, GripVertical, Image as ImageIcon, Layers } from "lucide-react";

// Simulated Innov8 CMS: an admin edits a field, the preview updates live, then the change is scheduled and published.
const SCRIPTS = [
  { title: "Where bold ideas become real products", sub: "Submit, track and grow your idea with the Lab.", cta: "Share an idea" },
  { title: "Meet the AI agents we've built", sub: "See what the Lab has shipped so far.", cta: "Explore agents" },
  { title: "This quarter's innovation challenge", sub: "Rethink the customer journey. Top ideas get a sprint.", cta: "Join the challenge" },
];

const STATES = [
  { key: "draft", label: "Draft · autosaved", tone: "text-ink-3" },
  { key: "scheduled", label: "Scheduled · Mon 09:00", tone: "text-violet" },
  { key: "published", label: "Published by Publisher", tone: "text-accent-text" },
];

export default function CmsDemo({ running = true }) {
  const [s, setS] = useState(0);
  const [chars, setChars] = useState(0);
  const [phase, setPhase] = useState(0);
  const script = SCRIPTS[s];
  const typed = script.title.slice(0, chars);

  useEffect(() => {
    if (!running) return undefined;
    let t;
    if (chars < script.title.length) t = setTimeout(() => setChars((c) => c + 1), 38);
    else if (phase < 2) t = setTimeout(() => setPhase((p) => p + 1), 1100);
    else
      t = setTimeout(() => {
        setS((v) => (v + 1) % SCRIPTS.length);
        setChars(0);
        setPhase(0);
      }, 1800);
    return () => clearTimeout(t);
  }, [chars, phase, running, script.title.length]);

  const state = STATES[phase];

  return (
    <div className="grid h-full grid-cols-1 gap-2.5 sm:grid-cols-[0.95fr_1.05fr]">
      <div className="flex flex-col gap-2 rounded-lg border border-line bg-bg/40 p-2.5">
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-ink-3">
          <Layers className="h-3 w-3" /> Layers · Home
        </div>
        {["Hero", "Stats", "Challenges", "Stories"].map((l, i) => (
          <div key={l} className={`flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] ${i === 0 ? "border-accent-text/40 bg-accent-soft text-ink" : "border-line text-ink-3"}`}>
            <GripVertical className="h-3 w-3 opacity-60" /> {l}
          </div>
        ))}
        <label className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink-3">Title</label>
        <div className="min-h-[40px] rounded-md border border-line-strong bg-surface px-2 py-1.5 text-[11.5px] leading-snug text-ink">
          {typed}
          <span className="caret ml-px inline-block h-3 w-px translate-y-0.5 bg-accent-text" />
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 text-[10.5px]">
          <span className={`inline-flex items-center gap-1 ${state.tone}`}>
            {phase === 2 ? <CheckCircle2 className="h-3 w-3" /> : <CalendarClock className="h-3 w-3" />}
            {state.label}
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-line bg-gradient-to-br from-surface-2 to-bg p-3">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-ink-3">
          <span>Live preview</span>
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> in page frame
          </span>
        </div>
        <div className="rounded-md border border-line bg-surface p-3">
          <div className="mb-2 flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-1 w-6 rounded-full bg-line-strong" />
            ))}
          </div>
          <p className="font-display text-[15px] font-bold leading-tight text-ink sm:text-base">{typed || " "}</p>
          <p className="mt-1.5 text-[11px] text-ink-3">{script.sub}</p>
          <span className="mt-2.5 inline-block rounded-md bg-accent px-2 py-1 text-[10px] font-semibold text-accent-ink">{script.cta}</span>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="grid h-10 place-items-center rounded border border-line bg-bg/50">
                <ImageIcon className="h-3.5 w-3.5 text-ink-3" />
              </div>
            ))}
          </div>
        </div>
        <p className="mt-2 truncate font-mono text-[10px] text-ink-3">
          audit: {phase === 0 ? "editor updated hero.title" : phase === 1 ? "editor scheduled page/home" : "publisher approved page/home"}
        </p>
      </div>
    </div>
  );
}
