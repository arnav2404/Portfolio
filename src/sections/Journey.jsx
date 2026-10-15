import React from "react";
import { GraduationCap } from "lucide-react";
import { Section, SectionHead } from "../components/ui";
import { education, experience } from "../data/profile";

export default function Journey() {
  return (
    <Section id="journey">
      <SectionHead index="06" eyebrow="Journey" title={<>From list forms <span className="text-ink-3">to full platforms.</span></>}>
        Started on workflows, Canvas Apps and custom forms. Now building multi-role applications and the platform pieces under them.
      </SectionHead>

      <ol className="relative ml-2 border-l border-line">
        {experience.map((e, i) => (
          <li key={e.company} className="reveal relative pb-14 pl-8 sm:pl-12" style={{ "--d": `${i * 80}ms` }}>
            <span className={`absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-bg ${e.current ? "live-dot bg-accent" : "bg-ink-3"}`} />
            <div className="grid gap-4 md:grid-cols-[220px_1fr] md:gap-10">
              <div>
                <p className="font-mono text-xs text-ink-3">{e.period}</p>
                <p className="mt-2 text-sm text-ink-3">{e.place}</p>
                {e.current && <span className="mt-3 inline-block rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-text">Current</span>}
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight">{e.role}</h3>
                <p className="mt-1 text-ink-2">{e.company}</p>
                <ul className="mt-5 space-y-3">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-3 leading-relaxed text-ink-2">
                      <span className="mt-2.5 h-1 w-3 flex-none rounded-full bg-accent-text" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
        <li className="reveal relative pl-8 sm:pl-12">
          <span className="absolute -left-[13px] top-0 grid h-6 w-6 place-items-center rounded-full border border-line bg-surface text-ink-3">
            <GraduationCap className="h-3.5 w-3.5" />
          </span>
          <div className="grid gap-3 sm:grid-cols-2">
            {education.map((ed) => (
              <div key={ed.title} className="card p-5">
                <p className="font-mono text-xs text-ink-3">{ed.period}</p>
                <p className="mt-2 font-semibold">{ed.title}</p>
                <p className="text-sm text-ink-3">{ed.place}</p>
              </div>
            ))}
          </div>
        </li>
      </ol>
    </Section>
  );
}
