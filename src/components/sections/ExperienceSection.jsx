import React from "react";
import { experience } from "../../data/portfolioData";
import ExperienceCard from "../cards/ExperienceCard";
import SectionHeading from "../common/SectionHeading";

export default function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <SectionHeading
        eyebrow="Experience"
        title="Professional journey"
        subtitle="Experience across enterprise SharePoint, custom SPFx UI, business automation, integrations, and deployment support."
      />

      <div className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
        {experience.map((item, index) => (
          <ExperienceCard key={item.role} item={item} delay={index * 90} />
        ))}
      </div>
    </section>
  );
}
