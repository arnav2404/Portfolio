import React, { useEffect, useState } from "react";
import LifecycleDemo from "./LifecycleDemo";
import CmsDemo from "./CmsDemo";
import KqlDemo from "./KqlDemo";
import { useInView, usePrefersReducedMotion } from "../lib/hooks";

const TABS = [
  { key: "lifecycle", file: "idea-lifecycle.tsx", caption: "Innov8 · ideas moving through a staged review, every move logged as a workflow event", Demo: LifecycleDemo },
  { key: "cms", file: "cms-dashboard.tsx", caption: "Innov8 CMS · non-technical admins edit, preview, schedule and publish", Demo: CmsDemo },
  { key: "kql", file: "dms-search.kql", caption: "Corp DMS · filters compose a KQL query, mapped and cached", Demo: KqlDemo },
];

export default function LiveConsole() {
  const [tab, setTab] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.15 });
  const reduced = usePrefersReducedMotion();
  const running = inView && !reduced;

  useEffect(() => {
    if (pinned || !running) return undefined;
    const t = setTimeout(() => setTab((v) => (v + 1) % TABS.length), 11000);
    return () => clearTimeout(t);
  }, [tab, pinned, running]);

  const { Demo, caption } = TABS[tab];

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute -inset-8 -z-10 rounded-[40px] bg-[radial-gradient(closest-side,var(--accent-soft),transparent)] blur-2xl" />
      <div className="overflow-hidden rounded-2xl border border-line-strong bg-surface/90 shadow-[var(--shadow)] backdrop-blur">
        <div className="flex items-center gap-3 border-b border-line px-3 py-2">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div role="tablist" aria-label="Live demos" className="scroll-thin flex min-w-0 gap-1 overflow-x-auto">
            {TABS.map((t, i) => (
              <button
                key={t.key}
                role="tab"
                type="button"
                aria-selected={tab === i}
                onClick={() => {
                  setTab(i);
                  setPinned(true);
                }}
                className={`relative flex-none rounded-md px-2.5 py-1 font-mono text-[11px] transition ${
                  tab === i ? "bg-surface-2 text-ink" : "text-ink-3 hover:text-ink-2"
                }`}
              >
                {t.file}
                {tab === i && !pinned && running && (
                  <span key={tab} className="absolute inset-x-2 bottom-0 h-px origin-left bg-accent-text" style={{ animation: "progress 11s linear both" }} />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[300px] p-3 sm:h-[290px]" role="tabpanel">
          <Demo running={running} />
        </div>
        <div className="flex items-center gap-2 border-t border-line px-3 py-2 text-[11px] text-ink-3">
          <span className={`h-1.5 w-1.5 flex-none rounded-full ${running ? "live-dot bg-accent" : "bg-ink-3"}`} />
          <span className="truncate">{caption}</span>
        </div>
      </div>
      <p className="mt-3 text-center font-mono text-[10.5px] text-ink-3">Simulated in your browser · patterns from real projects, no client data</p>
    </div>
  );
}
