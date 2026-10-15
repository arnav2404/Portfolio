import React from "react";
import sharepoint from "../assets/logos/SharePoint_logo.svg";
import automate from "../assets/logos/Power_Automate_logo.svg";
import apps from "../assets/logos/Powerapps_logo.svg";
import azure from "../assets/logos/Azure_logo.svg";
import pnp from "../assets/logos/Powershell_logo.svg";

const items = [
  { name: "SharePoint Online", icon: sharepoint },
  { name: "SPFx" },
  { name: "React" },
  { name: "TypeScript" },
  { name: "Power Automate", icon: automate },
  { name: "Microsoft Graph" },
  { name: "PnP JS" },
  { name: "PnP PowerShell", icon: pnp },
  { name: "Power Apps", icon: apps },
  { name: "KQL" },
  { name: "Azure AI Face", icon: azure },
  { name: "Viva Engage API" },
  { name: "Power BI" },
  { name: "Fluent UI" },
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="border-y border-line bg-bg-2/60 py-5" aria-label="Technologies I work with">
      <div className="mask-fade-x overflow-hidden">
        <ul className="marquee flex w-max items-center gap-10 pr-10">
          {row.map((it, i) => (
            <li key={i} aria-hidden={i >= items.length} className="flex items-center gap-2.5 whitespace-nowrap font-display text-lg font-semibold text-ink-3 sm:text-xl">
              {it.icon ? <img src={it.icon} alt="" className="h-6 w-6" loading="lazy" width="24" height="24" /> : <span className="h-1.5 w-1.5 rounded-full bg-accent-text" />}
              {it.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
