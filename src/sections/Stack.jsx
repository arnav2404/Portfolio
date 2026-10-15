import React from "react";
import { Section, SectionHead } from "../components/ui";
import { skillGroups } from "../data/profile";
import sharepoint from "../assets/logos/SharePoint_logo.svg";
import automate from "../assets/logos/Power_Automate_logo.svg";
import apps from "../assets/logos/Powerapps_logo.svg";
import azure from "../assets/logos/Azure_logo.svg";
import pnp from "../assets/logos/Powershell_logo.svg";

const logos = [
  { name: "SharePoint", icon: sharepoint },
  { name: "Power Automate", icon: automate },
  { name: "Power Apps", icon: apps },
  { name: "Azure", icon: azure },
  { name: "PnP PowerShell", icon: pnp },
];

export default function Stack() {
  return (
    <Section id="stack">
      <SectionHead index="05" eyebrow="Stack" title={<>The toolbox, <span className="text-ink-3">grouped the way I use it.</span></>}>
        Deep on SharePoint and SPFx, comfortable across the wider Microsoft 365 platform, and fluent in the frontend that makes it feel modern.
      </SectionHead>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="reveal card flex flex-col justify-between overflow-hidden p-7 lg:row-span-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-text">Platform</p>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">Microsoft 365, end to end</h3>
            <p className="mt-3 text-ink-2">From site provisioning and search schema to the React UI and the flows behind it.</p>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3">
            {logos.map((l) => (
              <li key={l.name} className="flex items-center gap-3 rounded-xl border border-line bg-surface-2 p-3 text-sm">
                <img src={l.icon} alt="" className="h-7 w-7" loading="lazy" width="28" height="28" />
                <span className="leading-tight">{l.name}</span>
              </li>
            ))}
          </ul>
        </div>
        {skillGroups.slice(0, 4).map((g, i) => (
          <div key={g.title} className="reveal card p-7" style={{ "--d": `${(i % 2) * 80}ms` }}>
            <h3 className="font-display text-lg font-semibold tracking-tight">{g.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li key={s} className="rounded-lg border border-line px-2.5 py-1.5 text-[13px] text-ink-2 transition hover:border-accent-text hover:text-ink">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="reveal mt-6 text-sm text-ink-3">
        <span className="font-semibold text-ink-2">Also:</span> {skillGroups[4].items.join(" · ")}
      </p>
    </Section>
  );
}
