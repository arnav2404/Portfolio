import React, { useState } from "react";
import { Section, SectionHead } from "../components/ui";
import { principles } from "../data/profile";

function Code({ code }) {
  return (
    <pre className="scroll-thin overflow-x-auto rounded-xl border border-line bg-bg/70 p-4 font-mono text-[12.5px] leading-relaxed text-ink-2">
      <code>
        {code.split("\n").map((line, i) => (
          <div key={i}>
            <span className="mr-4 select-none text-ink-3/60">{String(i + 1).padStart(2, " ")}</span>
            {line.split(/(\/\/.*$|"[^"]*"|\b(?:await|const|return)\b)/g).map((part, j) =>
              part.startsWith("//") ? (
                <span key={j} className="text-ink-3 italic">{part}</span>
              ) : part.startsWith('"') ? (
                <span key={j} className="text-accent-text">{part}</span>
              ) : /^(await|const|return)$/.test(part) ? (
                <span key={j} className="text-violet">{part}</span>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </div>
        ))}
      </code>
    </pre>
  );
}

export default function Principles() {
  const [active, setActive] = useState(0);
  const p = principles[active];

  return (
    <Section id="thinking">
      <SectionHead index="03" eyebrow="How I think" title={<>Principles I actually <span className="text-gradient">ship with.</span></>}>
        Opinions are cheap. These are decisions I made on real projects, and the reasoning I'd bring to yours.
      </SectionHead>

      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <ol className="reveal space-y-1" role="tablist" aria-label="Engineering principles">
          {principles.map((item, i) => (
            <li key={item.title}>
              <button
                type="button"
                role="tab"
                aria-selected={active === i}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`group flex w-full items-baseline gap-5 rounded-2xl px-4 py-4 text-left transition sm:px-5 ${
                  active === i ? "bg-surface" : "hover:bg-surface/60"
                }`}
              >
                <span className={`font-mono text-xs transition ${active === i ? "text-accent-text" : "text-ink-3"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className={`block font-display text-xl font-semibold tracking-tight transition sm:text-2xl ${active === i ? "text-ink" : "text-ink-3 group-hover:text-ink-2"}`}>
                    {item.title}
                  </span>
                  <span className={`mt-3 block text-sm leading-relaxed text-ink-2 lg:hidden ${active === i ? "" : "hidden"}`}>{item.body}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>

        <div className="reveal hidden lg:block" style={{ "--d": "120ms" }}>
          <div className="sticky top-28">
            <div key={active} className="rise card p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-text">{p.tag}</p>
              <h3 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight">{p.title}</h3>
              <p className="mt-4 leading-relaxed text-ink-2">{p.body}</p>
              <div className="mt-6">
                <Code code={p.code} />
              </div>
              <p className="mt-3 font-mono text-[10.5px] text-ink-3">Illustrative snippet, not client code.</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
