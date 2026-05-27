import React from "react";
import { Sparkles } from "lucide-react";

export default function SectionHeading({ eyebrow, title, subtitle, align = "left" }) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`reveal-up w-full max-w-3xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300 shadow-lg shadow-black/10 sm:text-xs sm:tracking-[0.24em]">
          <Sparkles className="h-3.5 w-3.5 flex-none" />
          <span className="truncate">{eyebrow}</span>
        </p>
      )}

      {title && (
        <h2 className="text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
          {title}
        </h2>
      )}

      {subtitle && (
        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
          {subtitle}
        </p>
      )}
    </div>
  );
}
