// Single source of truth for personal details. Update here and the whole site follows.

export const profile = {
  name: "Arnav Dixit",
  first: "Arnav",
  role: "SharePoint & SPFx Developer",
  company: "Essence Software Solutions",
  location: "Gurugram, Haryana",
  hometown: "Gwalior, Madhya Pradesh",
  email: "dixitarnav20@gmail.com",
  phone: "+91 9340891701",
  linkedin: "https://www.linkedin.com/in/arnav-dixit-5a5870148/",
  resume: "/Arnav_Dixit_Resume.pdf",
  careerStart: "2023-05-01",
  available: "Open to SharePoint, SPFx and Microsoft 365 product roles",
  languages: "Hindi (native), English (professional)",
};

// Statements shown in the hero, rotated one at a time.
export const heroVerbs = [
  "idea management platforms",
  "no-code CMS dashboards",
  "awards & recognition systems",
  "enterprise intranets",
  "document search that works",
];

export const capabilities = [
  {
    key: "apps",
    title: "Applications that live inside SharePoint",
    blurb:
      "Not a web part, a product. Multi-role apps with workflows, queues, dashboards and admin consoles that run on SPFx with SharePoint lists as the data store.",
    examples: ["Innov8 Idea Management", "Innov8 CMS", "Athar Awards admin"],
    icon: "Boxes",
  },
  {
    key: "experience",
    title: "Intranet experiences people open every day",
    blurb:
      "Branded portals with news, events, forms, policies, profiles and dashboards, plus the site-wide chrome: header, navigation, notifications and onboarding.",
    examples: ["Tawasol revamp", "Application customizer", "Feature Wheel"],
    icon: "LayoutTemplate",
  },
  {
    key: "search",
    title: "Search & information architecture",
    blurb:
      "KQL query building, managed and crawled properties, result mapping and caching, so large document sets stay findable and counts stay honest.",
    examples: ["Corp DMS search", "Enterprise search", "Search suggestions"],
    icon: "ScanSearch",
  },
  {
    key: "integrations",
    title: "Automation & integrations",
    blurb:
      "Microsoft Graph, Power Automate, Viva Engage, Azure AI Face, Power BI and external approval systems wired into one workplace, with provisioning scripted end to end.",
    examples: ["Viva Engage conversations", "Face-matched gallery", "PnP provisioning"],
    icon: "Workflow",
  },
];

// How I think: engineering principles, each backed by something real I shipped.
export const principles = [
  {
    title: "The browser shouldn't hold the keys.",
    body:
      "In Innov8 the SPFx client never performs privileged writes. It logs a workflow event to a list and Power Automate picks it up for routing, emails and status changes. Users get speed, admins keep control.",
    tag: "Innov8 · security by design",
    code: `await events.add({
  ideaId, action: "Endorse",
  from: "Evaluation", to: "Sprint",
});
// Flow does the privileged part`,
  },
  {
    title: "Two tabs, one truth.",
    body:
      "Theme preferences are saved back to SharePoint with ETag-checked updates and retries, so two tabs saving at once can't silently overwrite each other.",
    tag: "Innov8 · concurrency",
    code: `await item.update(patch, etag)
  .catch(on412(refetchAndRetry));`,
  },
  {
    title: "Normalize once, map everywhere.",
    body:
      "Corp DMS had the same value arriving under a dozen internal names. One mapping layer for titles, categories, projects and finance fields fixed missing results across every search screen.",
    tag: "Corp DMS · data modelling",
    code: `const title = pickFirst(row,
  TITLE_FIELDS_BY_CATEGORY[cat]);`,
  },
  {
    title: "Admins aren't developers. Build for them.",
    body:
      "The Innov8 CMS replaced a content hub with forms, a layers tree, drag-to-reorder and a live preview inside the real page frame. Drafts, scheduling, roles and an audit log come built in.",
    tag: "Innov8 CMS · product thinking",
    code: `publish({ page, at: schedule,
  role: "publisher" }) // audited`,
  },
  {
    title: "Meet people where they already are.",
    body:
      "Viva Engage threads, approvals from other business systems and Power BI reports surface inside the intranet, so nobody has to tab-hop to get work done.",
    tag: "Tawasol · integration",
    code: `GET /messages/in_group.json
  → <Conversation thread />`,
  },
  {
    title: "If it matters, measure it.",
    body:
      "Google Analytics and Amplitude are wired into pages and calls to action, so content decisions are based on what people actually click.",
    tag: "Tawasol · analytics",
    code: `track("cta_click", { page, cta });`,
  },
];

export const stats = [
  { value: "3+", label: "years building on SharePoint Online", computed: "years" },
  { value: "40+", label: "SPFx web parts in the solutions I ship to" },
  { value: "4", label: "enterprise portals shipped or in flight" },
  { value: "9", label: "lifecycle states modelled in Innov8" },
];

export const skillGroups = [
  {
    title: "SharePoint Online",
    items: [
      "Modern sites",
      "Lists & libraries",
      "Content types",
      "Site columns",
      "Metadata",
      "Permissions & groups",
      "Document management",
      "Governance",
    ],
  },
  {
    title: "SPFx & Frontend",
    items: [
      "Web parts",
      "Application customizers",
      "React",
      "TypeScript",
      "JavaScript",
      "SCSS / CSS modules",
      "Fluent UI",
      "Tailwind",
      "Responsive layouts",
      "Light / dark theming",
    ],
  },
  {
    title: "Microsoft 365 & Integrations",
    items: [
      "Microsoft Graph",
      "SharePoint REST",
      "PnP JS",
      "PnP PowerShell",
      "Power Automate",
      "Canvas Apps",
      "Power BI embedding",
      "Viva Engage API",
      "Azure AI Face API",
      "Custom connectors",
      "Dataverse (basic)",
    ],
  },
  {
    title: "Search & Provisioning",
    items: [
      "KQL",
      "Managed & crawled properties",
      "Result mapping",
      "PnP templates",
      "Site scripts & designs",
      "Term store",
      "Tenant themes",
      "CSOM",
    ],
  },
  {
    title: "Tools",
    items: ["VS Code", "Visual Studio", "Gulp / SPFx toolchain", "ShareGate", "MS SQL", "Google Analytics", "Amplitude"],
  },
];

export const experience = [
  {
    company: "Essence Software Solutions Pvt. Ltd.",
    role: "SharePoint & SPFx Developer",
    place: "Gurugram",
    period: "Sep 2025 – Present",
    current: true,
    points: [
      "Building Innov8 Idea Management (Phase 1): submission, staged review, sprint and pipeline boards, challenges, rewards and an executive dashboard.",
      "Built the Innov8 CMS dashboard that replaced the old Portal Content Hub, with live preview, drafts, scheduled publishing, roles and an audit log.",
      "Built the admin side of the Athar Awards programme: form builder, scoring and governance rules, reviewer assignments, HC review, mail templates and analytics.",
      "Delivered Tawasol intranet features and work on the shared application customizer used across both portals.",
      "Worked on Corp DMS search and document actions, and automated provisioning with PnP PowerShell and CSOM.",
    ],
  },
  {
    company: "Teceon",
    role: "SharePoint Developer",
    place: "New Delhi",
    period: "May 2023 – Sep 2025",
    points: [
      "Developed SharePoint solutions covering web parts, workflows, custom forms, list and library configuration and integration modules.",
      "Built custom web parts and extensions from client requirements, business rules and user feedback.",
      "Created Power Automate flows for approvals, scheduled jobs and reminders, and Canvas Apps for request forms.",
      "Set up sites, lists, libraries and permissions, and handled requirements, post-deployment support and knowledge transfer.",
    ],
  },
];

export const education = [
  {
    title: "B.Sc. Computer Science",
    place: "Institute of Technology and Management, Gwalior",
    period: "2020 – 2024",
  },
  {
    title: "Higher Secondary",
    place: "Ashish Convent Hr. Sec. School, Gwalior",
    period: "2019 – 2020",
  },
];
