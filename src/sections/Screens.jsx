import React, { useContext, useState } from "react";
import { Images, Maximize2 } from "lucide-react";
import { UIContext } from "../App";
import { Section, SectionHead } from "../components/ui";
import { screenGroups } from "../data/screens";

export function ScreenGrid({ groups }) {
  const { openLightbox } = useContext(UIContext);
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((g, i) => (
        <button
          type="button"
          key={g.key}
          onClick={() => openLightbox(g, 0)}
          className="reveal card group overflow-hidden text-left transition duration-500 hover:-translate-y-1 hover:border-line-strong"
          style={{ "--d": `${(i % 3) * 70}ms` }}
        >
          <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-bg-2">
            <img
              src={g.images[0].thumb}
              alt={`${g.title} screenshot`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
            />
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur">
              <Images className="h-3 w-3" /> {g.images.length}
            </span>
            <span className="absolute inset-0 grid place-items-center bg-black/0 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-ink">
                <Maximize2 className="h-5 w-5" />
              </span>
            </span>
          </div>
          <div className="p-5">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">{g.project}</p>
            <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight">{g.title}</h3>
            <p className="mt-1.5 line-clamp-2 text-sm text-ink-3">{g.note}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

export default function Screens() {
  const projects = ["All", ...new Set(screenGroups.map((g) => g.project))];
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(false);
  const list = screenGroups.filter((g) => filter === "All" || g.project === filter);
  const shown = expanded ? list : list.slice(0, 6);

  return (
    <Section id="screens">
      <SectionHead index="04" eyebrow="Screens" title={<>Shipped, <span className="text-ink-3">not mocked.</span></>}>
        Real screens from intranet and DMS work I delivered. Tap any card to flip through the full set.
      </SectionHead>

      <div className="reveal mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter screens by project">
        {projects.map((p) => (
          <button
            type="button"
            key={p}
            role="tab"
            aria-selected={filter === p}
            onClick={() => {
              setFilter(p);
              setExpanded(false);
            }}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              filter === p ? "border-transparent bg-ink text-bg" : "border-line text-ink-2 hover:border-line-strong hover:text-ink"
            }`}
          >
            {p}
            <span className="ml-2 font-mono text-xs opacity-60">
              {p === "All" ? screenGroups.length : screenGroups.filter((g) => g.project === p).length}
            </span>
          </button>
        ))}
      </div>

      <ScreenGrid key={filter + expanded} groups={shown} />

      {list.length > 6 && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="rounded-xl border border-line-strong px-5 py-2.5 text-sm font-semibold transition hover:bg-surface"
          >
            {expanded ? "Show fewer" : `Show all ${list.length} sets`}
          </button>
        </div>
      )}
    </Section>
  );
}
