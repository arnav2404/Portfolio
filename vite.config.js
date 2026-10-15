import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { headTags, pageMeta, pages, sitemap } from "./src/lib/seo.js";

// Writes a real HTML file for every page, each with its own title, description, canonical link,
// link preview and structured data, plus a sitemap. All of it comes from src/lib/seo.js.
function seoPages() {
  const fill = (html, path) => {
    const m = pageMeta(path);
    return html
      .replace(/<!--seo-->|<!--seo:start-->[\s\S]*?<!--seo:end-->/, `<!--seo:start-->\n    ${headTags(m)}\n    <!--seo:end-->`)
      .replace(/<!--seo-body-->|<!--body:start-->[\s\S]*?<!--body:end-->/, `<!--body:start-->${m.body}<!--body:end-->`);
  };
  return {
    name: "seo-pages",
    transformIndexHtml: (html) => fill(html, "/"),
    // Runs after Vite has written index.html, so every page shares its final script and style tags.
    writeBundle({ dir }) {
      const html = readFileSync(join(dir, "index.html"), "utf8");
      for (const { path } of pages.slice(1)) {
        const file = join(dir, `${path.slice(1)}.html`);
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, fill(html, path));
      }
      writeFileSync(join(dir, "sitemap.xml"), sitemap(new Date().toISOString().slice(0, 10)));
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPages()],
  build: {
    target: "es2020",
    cssCodeSplit: true,
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
  },
});
