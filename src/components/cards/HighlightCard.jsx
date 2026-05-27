import React from "react";
import {
  BadgeCheck,
  BellRing,
  FolderKanban,
  Globe2,
  LayoutDashboard,
  Palette,
  Search,
  Sparkles,
  Workflow,
} from "lucide-react";

const iconMap = {
  globe: Globe2,
  layout: LayoutDashboard,
  folder: FolderKanban,
  bell: BellRing,
  search: Search,
  workflow: Workflow,
  badge: BadgeCheck,
  palette: Palette,
};

export default function HighlightCard({ iconKey, title, text, delay = 0 }) {
  const Icon = iconMap[iconKey] || Sparkles;

  return (
    <div className="reveal-up h-full min-w-0" style={{ transitionDelay: `${delay}ms` }}>
      <div className="group h-full min-w-0 rounded-[24px] border border-white/10 bg-white/5 p-5 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-cyan-400/35 hover:bg-cyan-400/[0.08] hover:shadow-[0_0_22px_rgba(34,211,238,0.08)] sm:rounded-[26px]">
        <div className="w-fit rounded-2xl bg-cyan-400/10 p-3 text-cyan-300 transition group-hover:bg-cyan-400/15">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-lg font-semibold leading-snug text-white">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-300">{text}</p>
      </div>
    </div>
  );
}
