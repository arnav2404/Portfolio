import React from "react";
import { Sparkles } from "lucide-react";

export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="max-w-3xl reveal-up">
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-300">
          <Sparkles className="h-3.5 w-3.5" />
          {eyebrow}
        </p>
      )}

      {title && (
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          {title}
        </h2>
      )}

      {subtitle && (
        <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}