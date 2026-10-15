// Screenshots are optimized WebP (full: 1600px, thumbs: 560px) and fingerprinted by Vite.
const full = import.meta.glob("../assets/screens/*/*.webp", { eager: true, import: "default" });
const thumbs = import.meta.glob("../assets/thumbs/*/*.webp", { eager: true, import: "default" });

const meta = {
  innov8: { title: "Innov8 Portal & Idea Management", project: "Innov8", note: "Portal home, sprint pipeline across every lifecycle stage, sprint board, governance operations console, the in-app notifications centre, and the Portal CMS: a page tree with publish states and a design-locked page editor with live preview." },
  athar: { title: "Athar Awards Admin", project: "Athar Awards", note: "Admin dashboard, submissions queue with scoring, versioned forms, the form builder with interactive live preview, and Power Automate mail templates." },
  home: { title: "Homepage & Global Banner", project: "Tawasol", note: "Branded landing experience with hero, banner communication and structured entry points." },
  featurewheel: { title: "Feature Wheel", project: "Tawasol", note: "A visual navigation wheel that surfaces the portal's key destinations and quick actions." },
  announcement: { title: "Announcements & News", project: "Tawasol", note: "Announcement banner and editorial news layout for high-visibility updates." },
  chrome: { title: "Header, Search & Notifications", project: "Tawasol", note: "Site-wide chrome: global header, search suggestions, profile access and notification centre." },
  news: { title: "News & More For You", project: "Tawasol", note: "Story-focused news pages with personalised More For You recommendations." },
  dashboards: { title: "Power BI Dashboards", project: "Tawasol", note: "Category-based dashboard pages with embedded Power BI reports." },
  forms: { title: "Forms Library", project: "Tawasol", note: "Digital and non-digital forms with filters, search, CSV export and a side preview." },
  policies: { title: "Policies & Procedures", project: "Tawasol", note: "Landing and detail views with category tiles, filters and preview panels." },
  events: { title: "Events & Trainings", project: "Tawasol", note: "Event and training listings, details and registration journeys." },
  gallery: { title: "Image Gallery", project: "Tawasol", note: "Event gallery for internal highlights and branded imagery." },
  about: { title: "About pages", project: "Tawasol", note: "Organisation identity, values and structure in a branded layout." },
  corpdms: { title: "Corp DMS Search", project: "Corp DMS", note: "Quick, Advanced, Archive, List and Report search with document details, history and link modals." },
};

const byGroup = {};
for (const [path, src] of Object.entries(full)) {
  const [, group, file] = path.match(/screens\/([^/]+)\/([^/]+)$/);
  (byGroup[group] ||= []).push({ file, src, thumb: thumbs[`../assets/thumbs/${group}/${file}`] || src });
}

export const screenGroups = Object.keys(meta)
  .filter((key) => byGroup[key])
  .map((key) => ({
    key,
    ...meta[key],
    images: byGroup[key].sort((a, b) => a.file.localeCompare(b.file)),
  }));

export const getScreenGroups = (keys) => screenGroups.filter((g) => keys.includes(g.key));
