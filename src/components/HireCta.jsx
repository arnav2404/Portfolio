import React from "react";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { profile } from "../data/profile";

// The one call to action, repeated at the natural stopping points: after the work and after each case study.
export default function HireCta({ subject = "", className = "" }) {
  const mail = `mailto:${profile.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
  return (
    <div className={`reveal card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7 ${className}`}>
      <div className="min-w-0">
        <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-text">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" /> Available
        </p>
        <p className="mt-2 font-display text-xl font-bold tracking-tight sm:text-2xl">{profile.available}.</p>
      </div>
      <div className="flex flex-none flex-wrap gap-3">
        <a href={profile.resume} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-accent-ink transition hover:-translate-y-0.5">
          <FileText className="h-4 w-4" /> Resume
        </a>
        <a href={mail} className="group inline-flex items-center gap-2 rounded-xl border border-line-strong bg-surface/60 px-5 py-3 font-semibold backdrop-blur transition hover:bg-surface-2">
          <Mail className="h-4 w-4" /> Email me <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
        </a>
      </div>
    </div>
  );
}
