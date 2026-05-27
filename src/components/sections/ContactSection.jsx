import React from "react";
import { ExternalLink, Github, Linkedin, Mail, Phone } from "lucide-react";
import ContactCard from "../cards/ContactCard";
import SectionHeading from "../common/SectionHeading";

export default function ContactSection({ profile }) {
  const hasPhone = Boolean(profile.phone?.trim());
  const hasGithub = Boolean(profile.github?.trim());

  const gridClass =
    hasPhone && hasGithub
      ? "sm:grid-cols-2 xl:grid-cols-4"
      : hasPhone || hasGithub
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2";

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8">
      <SectionHeading
        eyebrow="Contact"
        title="Let’s connect"
        subtitle="I’m open to SharePoint, SPFx, Microsoft 365, and intranet-focused opportunities, collaborations, and conversations."
      />

      <div className={`mt-8 grid gap-5 sm:mt-10 ${gridClass}`}>
        <ContactCard
          href={`mailto:${profile.email}`}
          title="Email"
          text={profile.email}
          icon={<Mail className="h-5 w-5" />}
          delay={0}
        />

        {hasPhone && (
          <ContactCard
            href={`tel:${profile.phone}`}
            title="Phone"
            text={profile.phone}
            icon={<Phone className="h-5 w-5" />}
            delay={80}
            isPhone
          />
        )}

        <ContactCard
          href={profile.linkedin}
          title="LinkedIn"
          text={
            <span className="inline-flex items-center gap-2">
              View Profile <ExternalLink className="h-4 w-4" />
            </span>
          }
          icon={<Linkedin className="h-5 w-5" />}
          delay={hasPhone ? 160 : 80}
          external
        />

        {hasGithub && (
          <ContactCard
            href={profile.github}
            title="GitHub"
            text={
              <span className="inline-flex items-center gap-2">
                Explore Code <ExternalLink className="h-4 w-4" />
              </span>
            }
            icon={<Github className="h-5 w-5" />}
            delay={hasPhone ? 240 : 160}
            external
          />
        )}
      </div>
    </section>
  );
}
