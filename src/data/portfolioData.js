import resumePdf from "../assets/Arnav_Resume_.pdf";

export const profile = {
  name: "Arnav Dixit",
  title: "SharePoint & SPFx Developer",
  subtitle:
    "I build modern SharePoint Online intranets, custom SPFx solutions, Power Automate workflows, and Microsoft 365 experiences with a strong focus on UI quality, governance, and business usability. I also have working experience with Canvas Apps and basic Dataverse scenarios.",
  location: "Gurugram, Haryana",
  email: "dixitarnav20@gmail.com",
  phone: "+91 9340891701",
  linkedin: "https://www.linkedin.com/in/arnav-dixit-5a5870148/",
  github: "",
  resumeUrl: resumePdf,
};

export const careerStartDate = "2023-05-01";

export const skillGroups = [
  {
    title: "SharePoint Online",
    items: [
      "Modern SharePoint SitePages",
      "Lists & Libraries",
      "Content Types",
      "Site Columns",
      "Permissions & Governance",
      "Search & Metadata",
      "PnP Modern Search",
      "PnP Site Provisioning",
      "PnP Site Theming",
    ],
  },
  {
    title: "SPFx & Frontend",
    items: [
      "SPFx",
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind / SCSS / CSS",
      "Responsive UI",
    ],
  },
  {
    title: "Automation & Low-Code",
    items: [
      "Power Automate",
      "Canvas Apps",
      "Dataverse Basics",
      "Approvals",
      "Reminders & Escalations",
      "Process Automation",
    ],
  },
  {
    title: "Integrations & Tools",
    items: [
      "Microsoft Graph",
      "REST APIs",
      "Third-Party Integrations",
      "PnP JS",
      "PnP PowerShell",
      "PnP Scripting",
      "Power BI",
      "ShareGate",
    ],
  },
];

export const tawasolHighlights = [
  {
    iconKey: "globe",
    title: "Modern Intranet Revamp",
    text: "Built Tawasol as a branded SharePoint Online intranet using SPFx web parts, extensions, custom theming, and reusable UI patterns.",
  },
  {
    iconKey: "layout",
    title: "Content & Engagement Modules",
    text: "Created News Story, News Page Title, More For You, Global Banner, Announcement Banner, Our Values, Viva Engage header, and Events Image Gallery.",
  },
  {
    iconKey: "folder",
    title: "Knowledge Modules",
    text: "Delivered Forms Library, Policies & Procedures landing/detail pages, and dashboard/category web parts with embedded Power BI reports.",
  },
  {
    iconKey: "bell",
    title: "Global Experience Layer",
    text: "Implemented Header, Footer, Floating Navigation, Content Hider, and Notification Center as application customizers across the intranet.",
  },
  {
    iconKey: "search",
    title: "Shared Services & Suggestions",
    text: "Built SearchService, NavigationService, NotificationService, SuggestBox, profile helpers, and reusable card/carousel components.",
  },
  {
    iconKey: "workflow",
    title: "Provisioning & Governance",
    text: "Used PnP PowerShell, PnP JS, and CSOM for templates, content types, site columns, term groups, tenant themes, and rollout automation.",
  },
  {
    iconKey: "badge",
    title: "Integrations & Analytics",
    text: "Integrated Microsoft Graph, Power BI, Tahweel, and Amplitude analytics for search, dashboards, personalization, and CTA tracking.",
  },
  {
    iconKey: "palette",
    title: "Design System",
    text: "Defined SCSS tokens, mixins, and responsive layouts for consistent spacing, typography, cards, carousels, and preview panels.",
  },
];

export const featuredProject = {
  title: "Tawasol – Revamp Intranet Portal",
  duration: "Sep 2025 – Current",
  summary:
    "A modern SharePoint Online intranet revamp built to centralize news, events, policies, forms, dashboards, and collaboration tools in one branded digital workplace.",
  stack: [
    "SharePoint Online",
    "SPFx",
    "PnP JS",
    "PnP PowerShell",
    "Microsoft Graph API",
    "REST APIs",
    "Power BI",
    "SCSS",
    "Amplitude Analytics",
  ],
};

export const projects = [
  {
    title: "GlobalOne News Hub",
    period: "Sep 2024 – Sep 2025",
    summary:
      "A multi-country, multilingual intranet news portal that centralizes corporate news and delivers role- and country-targeted content across one enterprise hub.",
    tech: [
      "SharePoint Online",
      "SPFx",
      "React",
      "Canvas Apps",
      "Power Automate",
      "Microsoft Graph",
      "Custom Connector",
    ],
    bullets: [
      "Built responsive SPFx web parts such as Country Switcher, Language Toggle, and Personalized News Feed.",
      "Created a Canvas App-based editorial console for article submission, tagging, scheduling, and management.",
      "Automated approvals, translation requests, notifications, and lifecycle workflows in Power Automate.",
    ],
  },
  {
    title: "MetaPort – Internal Travel Desk",
    period: "Jun 2023 – Aug 2024",
    summary:
      "An internal travel management solution for travel requests, approvals, itineraries, reminders, and coordinator workflows using SharePoint, Canvas Apps, and Power Automate.",
    tech: [
      "SharePoint Online",
      "Canvas Apps",
      "Power Automate",
      "Microsoft Graph",
      "ShareGate",
    ],
    bullets: [
      "Designed Canvas Apps and customized forms for requests, approver views, and coordinator workbenches.",
      "Built multi-level approval flows, reminders, escalations, and post-trip settlement automation.",
      "Integrated Microsoft Graph for manager, department, and cost center defaults to reduce manual entry.",
    ],
  },
  {
    title: "Custom SharePoint Solutions at Teceon",
    period: "May 2023 – Sep 2025",
    summary:
      "Delivered client-specific SharePoint solutions including custom web parts, forms, permissions, integrations, and workflow-driven business modules.",
    tech: [
      "SharePoint",
      "SPFx",
      "REST APIs",
      "JavaScript",
      "Power Automate",
      "Canvas Apps",
    ],
    bullets: [
      "Developed tailored web parts, workflows, forms, and integration modules to match business requirements.",
      "Implemented role-based access and governance strategies across sites, libraries, and solutions.",
      "Provided documentation, post-deployment support, troubleshooting, and user training.",
    ],
  },
];

export const experience = [
  {
    role: "SharePoint & SPFx Developer",
    company: "Essence Software Solutions Private Limited",
    location: "Gurugram",
    period: "Sep 2025 – Current",
    points: [
      "Designed and developed the Tawasol SharePoint Online intranet using SPFx web parts, extensions, and custom theming.",
      "Built branded engagement modules, CMS-driven pages, notifications, shared services, and analytics-enabled experiences.",
      "Worked across Microsoft Graph, PnP PowerShell, PnP JS, Power BI, reusable components, and responsive SCSS design systems.",
    ],
  },
  {
    role: "SharePoint Developer",
    company: "Teceon Softwares Private Limited",
    location: "New Delhi",
    period: "May 2023 – Sep 2025",
    points: [
      "Built custom SharePoint solutions, forms, workflows, integrations, and enhancements aligned to client requirements.",
      "Developed Canvas Apps and Power Automate flows for business process automation and improved user experience.",
      "Handled post-deployment support, role-based permissions, documentation, and user training.",
    ],
  },
];