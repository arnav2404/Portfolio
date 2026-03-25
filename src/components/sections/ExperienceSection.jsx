import React from "react";
import { experience } from "../../data/portfolioData";
import ExperienceCard from "../cards/ExperienceCard";
import SectionHeading from "../common/SectionHeading";

export default function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionHeading
        eyebrow="Experience"
        title="Professional journey"
        subtitle="Experience across enterprise SharePoint, custom SPFx UI, business automation, integrations, and deployment support."
      />

      <div className="mt-10 space-y-6">
        {experience.map((item, index) => (
          <ExperienceCard key={item.role} item={item} delay={index * 90} />
        ))}
      </div>
    </section>
  );
}