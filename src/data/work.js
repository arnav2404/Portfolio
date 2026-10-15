// Case studies. Descriptions cover capabilities and architecture only, never client code or data.

export const work = [
  {
    slug: "innov8",
    name: "Innov8",
    kicker: "Innovation portal & idea management",
    tagline: "A full idea-to-implementation platform, running entirely inside SharePoint.",
    period: "2026 – Present",
    role: "SharePoint & SPFx Developer",
    status: "In delivery · Phase 1",
    accent: "lime",
    featured: true,
    visual: "lifecycle",
    summary:
      "Innov8 is a client's innovation portal on SharePoint Online. It has two halves: public portal pages (Home, Who We Are, Strategy, Achievements, Technology & AI Agents, Built Assets, Lab and Culture) and an Idea Management system that replaces the earlier Nectir platform. Everything runs as one SPFx web part plus a shared application customizer, with SharePoint lists as the data store.",
    problem:
      "Ideas lived on a separate platform, reviews happened over email, and leadership had no single view of what was moving. Portal content was edited through a hub that only technical staff were comfortable with.",
    stack: ["SPFx", "React", "TypeScript", "SharePoint REST", "PnP JS", "Microsoft Graph", "Power Automate", "KQL Search", "SCSS modules"],
    facts: [
      { k: "Lifecycle states", v: "9" },
      { k: "Access roles", v: "5" },
      { k: "Portal pages", v: "8" },
      { k: "Deploy footprint", v: "1 web part + 1 customizer" },
    ],
    groups: [
      {
        title: "Idea Management",
        items: [
          "Idea lifecycle: Draft, Initial Screening, Evaluation, Sprint, Implementation, Implemented, plus Hold, Future Implementation and Archive, with a workspace per stage for screening, scoring, decisions and delivery tracking.",
          "Idea Exchange, My Ideas, submission with drafts and attachments, challenges, rewards and an in-app notifications feed.",
          "Executive dashboard and insights with funnel, stage and department breakdowns and CSV export.",
          "Role-based access for owners, contributors, evaluators, executives and operations using SharePoint groups, plus an operations area for migration reconciliation and an audit trail.",
        ],
      },
      {
        title: "CMS dashboard",
        items: [
          "Page and section editors, collection editors, media and link fields, and a layers tree with drag-to-reorder.",
          "Live preview rendered inside the real page frame, so admins see exactly what ships.",
          "Drafts, publish now or schedule, editor and publisher roles, and an audit log.",
        ],
      },
      {
        title: "Portal & platform",
        items: [
          "Portal pages built from the client's approved prototypes, including enterprise search across portal content and a service requests module.",
          "Per-user light / dark / system theme saved in SharePoint with ETag-checked updates and retries.",
        ],
      },
    ],
    flow: {
      title: "How a decision travels",
      nodes: [
        { label: "SPFx web part", sub: "Reviewer clicks Endorse" },
        { label: "Workflow events list", sub: "Event logged, no privileged write" },
        { label: "Power Automate", sub: "Routes, emails, updates status" },
        { label: "Ideas list", sub: "New stage, audit entry" },
        { label: "Dashboards", sub: "Funnel & insights refresh" },
      ],
    },
    decisions: [
      {
        title: "Keep the client off privileged writes",
        body: "Stage changes are requested, not performed, by the browser. Power Automate holds the elevated permissions, which keeps list security simple and auditable.",
      },
      {
        title: "One web part, many apps",
        body: "Portal pages, Idea Management and the CMS share one SPFx package and a common service layer, so theming, access checks and data access are written once.",
      },
      {
        title: "Optimistic concurrency where it matters",
        body: "Preference saves use ETags with retry so concurrent tabs never clobber each other.",
      },
    ],
    screens: ["innov8"],
  },
  {
    slug: "athar-awards",
    name: "Athar Awards",
    kicker: "Recognition programme platform",
    tagline: "A configurable awards platform where admins design the form, the rules and the review.",
    period: "2025 – Present",
    role: "SharePoint & SPFx Developer",
    status: "Part of Tawasol",
    accent: "violet",
    featured: true,
    visual: "builder",
    summary:
      "The admin side of a recognition programme on the Tawasol intranet. Programme owners configure everything themselves: the nomination form, how entries are scored, who reviews what, and which emails go out when.",
    problem:
      "Every awards cycle needed different questions, criteria and reviewers. Hard-coding each cycle meant developer time every year and no flexibility for HR.",
    stack: ["SPFx", "React", "TypeScript", "PnP JS", "SharePoint lists", "Power Automate", "SCSS"],
    facts: [
      { k: "Builders", v: "Form · Scoring · Governance" },
      { k: "Review stages", v: "Reviewers → HC → Voting" },
      { k: "Admin areas", v: "8+" },
    ],
    groups: [
      {
        title: "Build",
        items: [
          "Form builder with section and question settings and a live preview of the nomination form.",
          "Scoring builder and governance rules that define how nominations are judged.",
          "Access settings that control who can nominate, review and administer.",
        ],
      },
      {
        title: "Run",
        items: [
          "Reviewer assignments, HC review panel and evidence viewer.",
          "Voter feedback collection and analytics across the cycle.",
          "Mail templates and notification mappings so every stage sends the right message.",
        ],
      },
    ],
    flow: {
      title: "Programme flow",
      nodes: [
        { label: "Admin configures", sub: "Form, scoring, governance" },
        { label: "Employees nominate", sub: "Generated form" },
        { label: "Reviewers score", sub: "Assigned queues" },
        { label: "HC review & voting", sub: "Feedback captured" },
        { label: "Analytics", sub: "Outcomes & engagement" },
      ],
    },
    decisions: [
      {
        title: "Configuration over code",
        body: "Every cycle-specific choice is data, so a new programme year is set up by HR rather than redeployed by developers.",
      },
      {
        title: "Preview before publish",
        body: "Admins see the nomination form exactly as employees will, while they build it.",
      },
    ],
    screens: ["athar"],
  },
  {
    slug: "tawasol",
    name: "Tawasol",
    kicker: "Intranet revamp",
    tagline: "A branded digital workplace: news, events, forms, policies, dashboards and people in one place.",
    period: "Sep 2025 – Present",
    role: "SharePoint & SPFx Developer",
    status: "Ongoing",
    accent: "coral",
    featured: true,
    visual: "wheel",
    summary:
      "Tawasol is a SharePoint Online intranet revamp built from custom SPFx web parts, a shared application customizer, PnP-based provisioning and analytics.",
    problem:
      "Information was spread across sites and systems. Employees needed one place for news, forms, policies, events, dashboards and their own profile, and the business needed to see what was used.",
    stack: ["SPFx", "React", "TypeScript", "PnP JS", "PnP PowerShell", "Microsoft Graph", "Viva Engage API", "Azure AI Face API", "Power BI", "Google Analytics", "Amplitude", "CSOM"],
    facts: [
      { k: "Web parts in solution", v: "40+" },
      { k: "Site-wide chrome", v: "1 customizer" },
      { k: "Integrations", v: "Graph · Viva Engage · Face AI · Power BI" },
    ],
    groups: [
      {
        title: "Content & engagement",
        items: [
          "Forms Library, Policies & Procedures, Power BI dashboard pages, News Story pages, News Page Title, More For You, Global and Announcement Banners, Our Values, Vision & Mission, Offers & Benefits, Events Image Gallery and Let's Meet.",
          "Feature Wheel: a visual navigation wheel for the portal's key destinations.",
        ],
      },
      {
        title: "Integrations",
        items: [
          "Tawasol Conversations on the Viva Engage REST API: read and post to community threads, with file uploads, without leaving the intranet.",
          "Face matching in the event gallery with Azure AI Face API, so employees can find event photos they appear in.",
        ],
      },
      {
        title: "People & self-service",
        items: [
          "Employee profile page: header card, leave balance, holidays, HR letters, events and training, joined communities.",
          "Tasks, Help / FAQs and Feature Wheel web parts.",
        ],
      },
      {
        title: "Platform",
        items: [
          "Site-wide application customizer: header, footer, floating navigation, breadcrumbs, notification centre, reminder popups, onboarding tour, person hover cards and search suggestions.",
          "Provisioning with PnP PowerShell, PnP JS and CSOM; Google Analytics and Amplitude for page and CTA tracking.",
        ],
      },
    ],
    flow: {
      title: "Event gallery face matching",
      nodes: [
        { label: "Event photos", sub: "Uploaded to the gallery" },
        { label: "Detect & index", sub: "Faces added to a large face list" },
        { label: "Train", sub: "Azure AI Face API" },
        { label: "Find similar", sub: "Matched against your face" },
        { label: "Your photos", sub: "Every event shot you're in" },
      ],
    },
    decisions: [
      {
        title: "One chrome, every page",
        body: "Navigation, notifications and onboarding live in a single application customizer, so the experience is consistent across both portals.",
      },
      {
        title: "Bring the conversation in",
        body: "Viva Engage threads render natively in the intranet instead of linking out.",
      },
    ],
    screens: ["home", "featurewheel", "announcement", "chrome", "news", "dashboards", "forms", "policies", "events", "gallery", "about"],
  },
  {
    slug: "corp-dms",
    name: "Corp DMS",
    kicker: "Enterprise document management",
    tagline: "Making search on a large, legacy document system fast, accurate and trustworthy.",
    period: "2026",
    role: "SharePoint & SPFx Developer",
    status: "2-month delivery",
    accent: "cyan",
    featured: true,
    visual: "kql",
    summary:
      "A SharePoint Online document management application for incoming, outgoing and internal documents across Projects, Shops, Marketing, Management, Mall Operations, Company Library, Policy Templates and Finance. My work made search, document actions, field mappings and the UI reliable while moving legacy patterns into SPFx.",
    problem:
      "Search was slow and sometimes wrong: titles went missing, counts didn't match, filters broke on certain reference numbers, and legacy CSS broke the page layout.",
    stack: ["SPFx 1.17", "React", "TypeScript", "PnP JS", "SPFx Controls React", "KQL", "Managed properties", "Azure Functions APIs", "MS SQL", "Fluent UI"],
    facts: [
      { k: "Search modes fixed", v: "Quick · Advanced · Archive · Report" },
      { k: "Mapping layer", v: "1 central helper" },
      { k: "Departments covered", v: "8" },
    ],
    groups: [
      {
        title: "Search",
        items: [
          "Improved Quick and Advanced Search loading, pagination, filtering, result mapping and count accuracy on large document sets.",
          "Reworked KQL query building and fallback mapping for title, category, Ref No, project lookups, department type and finance fields.",
          "Mapped SQL-backed search responses into the SPFx results and added caching to cut duplicate calls.",
          "Added and corrected managed / crawled property mappings so existing data showed up in search.",
        ],
      },
      {
        title: "Document actions & UI",
        items: [
          "Fixed People Picker multi-user copy/paste, comment visibility after search, duplicate Distribution API calls, History and Link modals and copied document links.",
          "Resolved SharePoint and legacy CSS conflicts so the app stayed inside the page layout.",
        ],
      },
    ],
    flow: {
      title: "Search pipeline",
      nodes: [
        { label: "Filters", sub: "Ref No, category, dates…" },
        { label: "Query builder", sub: "KQL + fallbacks" },
        { label: "Search + SQL API", sub: "Managed properties" },
        { label: "Normalizer", sub: "One business model" },
        { label: "Results grid", sub: "Cached, paginated" },
      ],
    },
    decisions: [
      {
        title: "Normalize once",
        body: "A single helper understands every internal field name variation, instead of each screen guessing.",
      },
      {
        title: "Cache the obvious",
        body: "Repeated lookups are cached so paging and filtering don't re-hit the backend.",
      },
    ],
    screens: ["corpdms"],
  },
  {
    slug: "globalone-news-hub",
    name: "GlobalOne News Hub",
    kicker: "Multilingual news portal",
    tagline: "Targeted, multilingual corporate news across countries from one hub.",
    period: "Sep 2024 – Sep 2025",
    role: "SharePoint Developer · Teceon",
    status: "Delivered",
    accent: "violet",
    featured: false,
    summary:
      "A hub site with associated country news sites for corporate news, announcements and knowledge sharing, with targeted news, multilingual pages, approvals and tenant-only access through Microsoft Entra ID.",
    problem: "Each country published news differently, in different languages, with no shared approval process or targeting.",
    stack: ["SPFx", "React", "TypeScript", "Microsoft Graph", "Canvas Apps", "Power Automate", "Site scripts & designs", "Custom connector"],
    facts: [{ k: "Duration", v: "12 months" }],
    groups: [
      {
        title: "Key work",
        items: [
          "Responsive SPFx web parts and extensions: Country Switcher, Language Toggle and Personalized News Feed.",
          "Canvas App editorial console for publishers to submit, tag, schedule and manage articles using Microsoft Lists and Term Store.",
          "Power Automate workflows for approvals and translation requests; multilingual pages with SPFx localization.",
          "Microsoft Graph for audience targeting and a custom connector to an internal HR / geo directory.",
        ],
      },
    ],
    flow: {
      title: "Publishing flow",
      nodes: [
        { label: "Editor console", sub: "Canvas App" },
        { label: "Approval & translation", sub: "Power Automate" },
        { label: "Country sites", sub: "Hub association" },
        { label: "Personalized feed", sub: "Graph targeting" },
      ],
    },
    decisions: [],
    screens: [],
  },
  {
    slug: "metaport",
    name: "MetaPort",
    kicker: "Internal travel desk",
    tagline: "Travel requests, approvals, itineraries and settlement on Microsoft 365.",
    period: "Jun 2023 – Aug 2024",
    role: "SharePoint Developer · Teceon",
    status: "Delivered",
    accent: "cyan",
    featured: false,
    summary:
      "An internal travel management solution for requests, approvals, itinerary tracking, coordinator actions and post-trip settlement. Canvas Apps handle capture and role-specific views; SharePoint lists and Power Automate handle data, routing, reminders and escalations.",
    problem: "Travel ran on email and spreadsheets with no visibility for coordinators or approvers.",
    stack: ["SharePoint Online", "Canvas Apps", "Power Automate", "Microsoft Graph", "ShareGate"],
    facts: [{ k: "Duration", v: "12 months" }],
    groups: [
      {
        title: "Key work",
        items: [
          "Canvas Apps and customized list forms for request entry, approvals and the coordinator workbench.",
          "Power Automate flows for multi-level approvals, reminders, escalations and settlement tasks.",
          "Lists and content types for trips, itineraries and vendors; forms pre-filled with Graph profile data.",
          "Branded sites, role-based permissions, UAT, training and ShareGate migration.",
        ],
      },
    ],
    flow: {
      title: "Request flow",
      nodes: [
        { label: "Request", sub: "Pre-filled from Graph" },
        { label: "Approvals", sub: "Multi-level" },
        { label: "Coordinator", sub: "Bookings & itinerary" },
        { label: "Settlement", sub: "Post-trip tasks" },
      ],
    },
    decisions: [],
    screens: [],
  },
];

export const getWork = (slug) => work.find((w) => w.slug === slug);

export const accentVar = {
  lime: "var(--accent-text)",
  violet: "var(--violet)",
  cyan: "var(--cyan)",
  coral: "var(--coral)",
};
