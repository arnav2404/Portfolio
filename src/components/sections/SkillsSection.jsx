import React from "react";
import { skillGroups } from "../../data/portfolioData";
import SkillCard from "../cards/SkillCard";
import SectionHeading from "../common/SectionHeading";

export default function SkillsSection() {
  return (
    <section id="skills" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionHeading
        eyebrow="Skills"
        title="Core technologies and strengths"
        subtitle="A practical stack built around SharePoint Online, SPFx, React, Microsoft Graph, Power Automate, Canvas Apps, and polished responsive user interfaces."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((skill, index) => (
          <SkillCard
            key={skill.title}
            title={skill.title}
            items={skill.items}
            delay={index * 50}
          />
        ))}
      </div>
    </section>
  );
}