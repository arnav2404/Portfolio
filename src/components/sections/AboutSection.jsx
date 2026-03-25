import React from "react";
import SectionHeading from "../common/SectionHeading";

export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionHeading
        eyebrow="About Me"
        title="Developer focused on real SharePoint business solutions"
        subtitle="I work on intranets, custom SPFx components, Power Automate-driven workflows, reusable services, and well-structured UI systems. My recent work centers on Tawasol, a modern intranet revamp, along with multilingual news experiences and internal business solutions built on Microsoft 365."
      />
    </section>
  );
}