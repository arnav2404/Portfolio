import React from "react";
import { Download } from "lucide-react";

export default function ResumeSection({ profile }) {
  return (
    <section id="resume" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="reveal-up">
        <div className="group relative overflow-hidden rounded-[32px] border border-cyan-300/30 bg-gradient-to-r from-cyan-400/12 via-[#08233a] to-blue-500/12 p-8 shadow-[0_0_42px_rgba(34,211,238,0.14)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-cyan-300/45 hover:shadow-[0_0_48px_rgba(34,211,238,0.20)]">
          <div className="absolute -left-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-cyan-400/12 blur-3xl" />
          <div className="absolute right-0 top-0 h-full w-56 rounded-full bg-blue-500/8 blur-3xl" />

          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
            <div className="absolute left-0 top-0 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl" />
          </div>

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                Resume
              </p>
              <h3 className="mt-2 text-3xl font-bold text-white">
                Download my latest resume
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-200 md:text-base">
                It summarizes my experience in SharePoint Online, SPFx development, Power Automate workflows,
                Microsoft Graph integrations, PnP PowerShell provisioning, and selected Canvas App work with
                basic Dataverse knowledge across projects such as Tawasol, GlobalOne News Hub, and MetaPort.
              </p>
            </div>

            <a
              href={profile.resumeUrl}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950 transition-all duration-500 ease-out hover:scale-[1.02]"
            >
              Download Resume <Download className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}