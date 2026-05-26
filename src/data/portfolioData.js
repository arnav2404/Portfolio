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

export const corpDmsCaseStudy = {
  title: "CorpDMS – Enterprise Document Management & Search Optimization",
  subtitle:
    "A detailed case-study view of a 2-month client delivery where I stabilized search, improved metadata mapping, and made a legacy SharePoint DMS faster and easier for business users.",
  headline: "From inconsistent document search to a cleaner, faster, and more reliable DMS experience.",
  context:
    "CorpDMS is an enterprise document management system on SharePoint Online. It is used to manage, search, distribute, archive, revise, and track business documents across departments, projects, companies, categories, and directions such as Incoming, Outgoing, Internal, Filing, and New Documents.",
  simpleExplanation:
    "The system helps users quickly find important company documents from a large SharePoint-based repository. I improved the search logic, fixed broken filters, normalized inconsistent data fields, stabilized comments/history/link actions, and cleaned up UI issues so business users could find and act on documents with less friction.",
  badges: [
    "2-Month Client Delivery",
    "Long-Pending Requirement",
    "Search Optimization",
    "Legacy UI Stabilization",
  ],
  metrics: [
    { value: "4", label: "Major search areas optimized: Quick, Advanced, Archive, and Reports" },
    { value: "1", label: "Central helper layer created for field normalization and mapping" },
    { value: "13+", label: "Portfolio screens added for DMS search, details, modals, lists, and reports" },
  ],
  pillars: [
    {
      iconKey: "search",
      title: "Search Performance & Accuracy",
      plainText:
        "Users needed faster and more accurate document discovery across reference number, title, category, project, department, status, date, and report filters.",
      technical:
        "Optimized Quick Search, Advanced Search, Archive Search, and Report Search by improving search payload creation, pagination, filtering, KQL fallback mapping, cache helpers, delay loaders, and backend response normalization.",
    },
    {
      iconKey: "mapping",
      title: "Centralized Field Mapping",
      plainText:
        "The same business value was coming from different SharePoint internal names and backend fields, which caused missing titles and incorrect results.",
      technical:
        "Created a separate helper file as a common normalization layer for title fields, category aliases, project/project name mapping, reference number, status, direction, date filters, managed properties, and SQL-backed response fields.",
    },
    {
      iconKey: "integration",
      title: "SharePoint + Backend Integration",
      plainText:
        "The portal had to work with SharePoint search, managed properties, SQL-backed APIs, and legacy document modules together.",
      technical:
        "Improved integration between SPFx React components, PnP JS, SharePoint Search/KQL, managed properties, Azure Function/API endpoints, SQL-backed search responses, and REST-based document services.",
    },
    {
      iconKey: "people",
      title: "People Picker & Distribution Fixes",
      plainText:
        "Users needed reliable multi-user selection and distribution flows while working with document recipients and internal/external users.",
      technical:
        "Fixed People Picker multi-user copy/paste behavior, user value processing, duplicate distribution API calls, recipient handling, and field extraction for document distribution scenarios.",
    },
    {
      iconKey: "comments",
      title: "Comments, History & Linked Documents",
      plainText:
        "Important document actions were not always visible or usable after searching or filtering documents.",
      technical:
        "Fixed comment visibility after search, Ref No. based comment submission, History modal behavior, Linked Documents modal, Item ID/Doc ID conflicts, and link formatting from https:// to file:// style copying where required.",
    },
    {
      iconKey: "ui",
      title: "Legacy UI Stabilization",
      plainText:
        "Old SharePoint page styling was breaking tables and web parts, making the portal harder to use.",
      technical:
        "Refactored HTML/table structure, improved React component layout, resolved legacy CSS conflicts, prevented web part overflow, stabilized table rendering, and improved Quick/Advanced Search layout behavior.",
    },
  ],
  normalizationHelper: {
    description:
      "The most important architectural change was centralizing field and title mapping instead of repeating logic inside multiple components. The helper layer makes the app understand different SharePoint internal names and backend response fields as one consistent business model.",
    examples: [
      "Title normalization across ProjectTitle, MarketingTitle, ManagementTitle, ShopsTitle, FinanceTitle, CompanyLibraryTitle, PolicyTemplateTitle, and raw SharePoint Title.",
      "Category normalization so values like Finance, Finance-Invoice, Finance Payments, Customer Request, Mall Operations, and Company Library can be handled consistently.",
      "Common helpers for advanced date clauses, finance amount/currency filters, search select properties, paged response items, total count mapping, project code, and project display name.",
      "Cleaner mapping for Quick Search, Advanced Search, Report Search, Archive Search, result grids, comments, history, and document details.",
    ],
  },
  mainChanges: [
    {
      iconKey: "performance",
      title: "Optimized search flow",
      points: [
        "Improved Quick Search and Advanced Search loading speed, pagination, filtering, and result mapping.",
        "Added better KQL query construction, fallback mapping, backend payload handling, and cached helper usage.",
        "Fixed Ref No. search issues, including cases such as special reference number formats and Next button behavior.",
      ],
    },
    {
      iconKey: "quality",
      title: "Fixed business-critical defects",
      points: [
        "Resolved People Picker multi-user copy/paste issue and duplicate Distribution API calls.",
        "Fixed comments not appearing after search and comment submission issues when searching by Ref No.",
        "Resolved Item ID/Doc ID conflicts and incorrect total count beside Next/Previous pagination buttons.",
      ],
    },
    {
      iconKey: "actions",
      title: "Improved document action modules",
      points: [
        "Enhanced Document Details, Distribution, Comments, History Modal, Linked Documents Modal, Archive, Lists, Reports, and Generate Reference Number modules.",
        "Improved History and Link modal behavior and made copied document links more usable for end users.",
        "Added finance fields and corrected project/project-name reverse naming logic in Advanced Search.",
      ],
    },
  ],
};

export const projects = [
  {
    title: "CorpDMS – Enterprise Document Management & Search Optimization",
    period: "2-Month Client Delivery",
    label: "Deep Case Study",
    summary:
      "An enterprise SharePoint Online DMS enhancement focused on stabilizing document search, metadata mapping, document tracking, distribution, archive, reporting, and legacy UI compatibility. I took ownership of a long-pending client requirement and improved the reliability of Quick Search, Advanced Search, Archive Search, Reports, comments, pagination, field mapping, and document action modules.",
    plainLanguage:
      "In simple words, I made a large SharePoint document system easier and faster to search by cleaning up how filters, titles, categories, comments, history, and document links work together.",
    impact: [
      "Centralized normalization helper layer",
      "Improved Quick, Advanced, Archive, and Report Search",
      "Stabilized comments, history, linked documents, pagination, and legacy UI",
    ],
    tech: [
      "SharePoint Online",
      "SPFx",
      "React",
      "TypeScript",
      "PnP JS",
      "SharePoint Search",
      "KQL",
      "Managed Properties",
      "Azure Functions",
      "SQL Backend APIs",
      "REST APIs",
      "SCSS/CSS",
    ],
    bullets: [
      "Optimized Quick Search, Advanced Search, Archive Search, and Report Search by improving search payload creation, pagination, filtering, backend API mapping, KQL fallback handling, and response normalization.",
      "Created a separate helper file to normalize inconsistent SharePoint/internal field names across categories, titles, project names, reference numbers, status, direction, dates, and backend response fields.",
      "Fixed missing title and field mapping issues across Quick Search, Advanced Search, Reports, and document result grids by handling multiple internal title fields and managed property variations.",
      "Fixed People Picker multi-user copy/paste issues, comment visibility after search, Ref No. comment submission, duplicate API calls, Item ID/Doc ID conflicts, and incorrect pagination counts.",
      "Improved Document Details, Distribution, Comments, History Modal, Linked Documents Modal, Archive, Lists, Reports, and Generate Reference Number modules for better business usability.",
      "Refactored table structure, React component layout, and legacy CSS conflicts to prevent web part overlap, broken SharePoint page layout, and table overflow issues.",
    ],
  },
  {
    title: "GlobalOne News Hub",
    period: "Sep 2024 – Sep 2025",
    label: "Case Study",
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
    label: "Case Study",
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
    label: "Client Work",
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
      "Owned a time-sensitive enterprise DMS optimization requirement, improving Quick/Advanced/Archive/Report Search, managed-property mapping, SQL-backed search response handling, pagination, comments, People Picker behavior, and legacy UI stability.",
      "Created centralized helper logic to normalize inconsistent SharePoint internal names, category aliases, title mappings, project/project-name values, date filters, and backend response fields.",
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
