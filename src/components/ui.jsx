import React from "react";

export function SectionHead({ index, eyebrow, title, children, className = "" }) {
  return (
    <div className={`reveal mb-12 grid gap-6 md:mb-16 md:grid-cols-[1fr_minmax(0,0.9fr)] md:items-end ${className}`}>
      <div>
        <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-ink-3">
          {index && <span className="text-accent-text">{index}</span>}
          <span className="h-px w-8 bg-line-strong" />
          {eyebrow}
        </p>
        <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] font-bold leading-[1.02] tracking-[-0.03em] text-balance">{title}</h2>
      </div>
      {children && <p className="max-w-xl text-base leading-relaxed text-ink-2 md:justify-self-end md:text-lg">{children}</p>}
    </div>
  );
}

export function Tag({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-ink-2 ${className}`}>
      {children}
    </span>
  );
}

export function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 ${className}`}>
      {children}
    </section>
  );
}
