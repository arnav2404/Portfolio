import React from "react";
import { Boxes, LayoutTemplate, ScanSearch, Workflow } from "lucide-react";
import { Section, SectionHead } from "../components/ui";
import { capabilities } from "../data/profile";
import { spotlight } from "../lib/hooks";

const icons = { Boxes, LayoutTemplate, ScanSearch, Workflow };

export default function Capabilities() {
  return (
    <Section id="build">
      <SectionHead index="01" eyebrow="What I build" title={<>More than web parts. <span className="text-ink-3">Whole systems on Microsoft 365.</span></>}>
        Four kinds of work I'm trusted with, each backed by something running in production or in active delivery.
      </SectionHead>
      <div className="grid gap-4 md:grid-cols-2">
        {capabilities.map((c, i) => {
          const Icon = icons[c.icon];
          return (
            <article
              key={c.key}
              onPointerMove={spotlight}
              className="reveal spotlight card group relative overflow-hidden p-7 sm:p-8"
              style={{ "--d": `${(i % 2) * 90}ms` }}
            >
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-surface-2 text-accent-text transition group-hover:scale-110 group-hover:rotate-[-6deg]">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-xs text-ink-3">0{i + 1}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">{c.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-2">{c.blurb}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {c.examples.map((e) => (
                  <li key={e} className="rounded-full bg-surface-2 px-3 py-1 text-xs text-ink-2">
                    {e}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
