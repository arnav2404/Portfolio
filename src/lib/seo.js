// Search and link-preview metadata for every page, built from the same data the pages render.
// Used twice: by vite.config.js to write a real HTML file per page at build time (what crawlers and
// link previews read), and by App.jsx to keep the head in sync while visitors navigate in the browser.
import { profile, coreStack } from "../data/profile.js";
import { work, getWork } from "../data/work.js";

export const SITE = "https://arnavdixit.com";
const OG_IMAGE = `${SITE}/og.png`;

// Trims to a search-snippet length on a word boundary.
const clip = (text, max = 158) => {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
};

const person = {
  "@type": "Person",
  "@id": `${SITE}/#person`,
  name: profile.name,
  jobTitle: profile.role,
  worksFor: { "@type": "Organization", name: profile.company },
  address: { "@type": "PostalAddress", addressLocality: "Gurugram", addressRegion: "Haryana", addressCountry: "IN" },
  email: `mailto:${profile.email}`,
  url: `${SITE}/`,
  image: OG_IMAGE,
  sameAs: [profile.linkedin],
  knowsLanguage: ["en", "hi"],
  knowsAbout: ["SharePoint Online", ...coreStack, "PnP JS", "KQL", "Microsoft 365"],
};

export const pages = [{ path: "/" }, ...work.map((w) => ({ path: `/work/${w.slug}` }))];

export function pageMeta(path) {
  const slug = path.match(/^\/work\/([\w-]+)\/?$/)?.[1];
  const study = slug && getWork(slug);

  if (study) {
    const url = `${SITE}/work/${study.slug}`;
    return {
      title: `${study.name}: ${study.kicker} · ${profile.name}`,
      description: clip(`${study.kicker} by ${profile.name}. ${study.tagline} Built with ${study.stack.slice(0, 3).join(", ")}.`),
      url,
      type: "article",
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CreativeWork",
            name: `${study.name}: ${study.kicker}`,
            headline: study.tagline,
            abstract: clip(study.summary, 300),
            url,
            author: { "@id": person["@id"] },
            keywords: study.stack.join(", "),
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: profile.name, item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: study.name, item: url },
            ],
          },
          person,
        ],
      },
      // Shown to crawlers and visitors without JavaScript; the app replaces it once it loads.
      body: [
        `<h1>${esc(`${study.name}: ${study.kicker}`)}</h1>`,
        `<p>${esc(study.tagline)}</p>`,
        `<p>${esc(study.summary)}</p>`,
        `<h2>The problem</h2><p>${esc(study.problem)}</p>`,
        `<p>Built with ${esc(study.stack.join(", "))}.</p>`,
        `<p><a href="/">${esc(`${profile.name}, ${profile.role}`)}</a></p>`,
      ].join(""),
    };
  }

  if (path === "/" || path === "") {
    return {
      title: `${profile.name} · ${profile.role}`,
      description: clip(
        `${profile.name}, ${profile.role} in Gurugram, builds full apps inside SharePoint Online: idea management, a no-code CMS, awards and intranets.`
      ),
      url: `${SITE}/`,
      type: "profile",
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "ProfilePage", url: `${SITE}/`, mainEntity: { "@id": person["@id"] } },
          { "@type": "WebSite", url: `${SITE}/`, name: profile.name },
          person,
        ],
      },
      body: [
        `<h1>${esc(`${profile.name}, ${profile.role}`)}</h1>`,
        `<p>${esc(`${profile.role} in ${profile.location}. I build applications inside SharePoint Online with ${coreStack.join(", ")}. ${profile.available}.`)}</p>`,
        `<h2>Selected work</h2><ul>`,
        ...work.map((w) => `<li><a href="/work/${w.slug}">${esc(w.name)}</a>: ${esc(w.tagline)}</li>`),
        `</ul>`,
      ].join(""),
    };
  }

  return { title: `Not found · ${profile.name}`, description: "", url: `${SITE}${path}`, noindex: true };
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// The <head> tags for one page, as an HTML string for the build.
export function headTags(m) {
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<link rel="canonical" href="${m.url}" />`,
    `<meta property="og:type" content="${m.type}" />`,
    `<meta property="og:site_name" content="${esc(profile.name)}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${m.url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(`${profile.name}, ${profile.role}`)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<script type="application/ld+json">${JSON.stringify(m.jsonLd).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}

export function sitemap(lastmod) {
  const urls = pages.map((p) => `  <url><loc>${SITE}${p.path}</loc><lastmod>${lastmod}</lastmod>${p.path === "/" ? "<priority>1.0</priority>" : ""}</url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

// Keeps the live document's head in step with client-side navigation.
export function applyMeta(path) {
  const m = pageMeta(path);
  document.title = m.title;
  const set = (selector, attr, value) => {
    let el = document.head.querySelector(selector);
    if (!el && value != null) {
      const [, tag, key, name] = selector.match(/^(\w+)\[(\w+(?::\w+)?)="([^"]+)"\]$/) || [];
      if (!tag) return;
      el = document.createElement(tag);
      el.setAttribute(key, name);
      document.head.appendChild(el);
    }
    if (!el) return;
    if (value == null) el.remove();
    else el.setAttribute(attr, value);
  };
  set('meta[name="description"]', "content", m.description || null);
  set('link[rel="canonical"]', "href", m.noindex ? null : m.url);
  set('meta[property="og:title"]', "content", m.title);
  set('meta[property="og:description"]', "content", m.description || null);
  set('meta[property="og:url"]', "content", m.url);
  set('meta[name="robots"]', "content", m.noindex ? "noindex" : null);
}
