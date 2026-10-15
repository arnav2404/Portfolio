import React, { Suspense, lazy, useCallback, useEffect, useMemo, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import Lightbox from "./components/Lightbox";
import Home from "./pages/Home";
import { usePath } from "./lib/router";
import { useTheme } from "./lib/theme";
import { useReveal } from "./lib/hooks";
import { getWork } from "./data/work";
import { applyMeta } from "./lib/seo";

const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const NotFound = lazy(() => import("./pages/NotFound"));

export const UIContext = React.createContext(null);

export default function App() {
  const path = usePath();
  const { theme, toggle } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null); // { group, index }

  const workSlug = path.match(/^\/work\/([\w-]+)\/?$/)?.[1];
  const route = path === "/" || path === "" ? "home" : workSlug && getWork(workSlug) ? "work" : "404";

  useReveal(path);

  useEffect(() => applyMeta(path), [path]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openLightbox = useCallback((group, index = 0) => setLightbox({ group, index }), []);
  const ui = useMemo(
    () => ({ theme, toggleTheme: toggle, openPalette: () => setPaletteOpen(true), openLightbox }),
    [theme, toggle, openLightbox]
  );

  return (
    <UIContext.Provider value={ui}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" className="relative">
        <Suspense fallback={<div className="min-h-screen" />}>
          {route === "home" && <Home />}
          {route === "work" && <CaseStudy key={workSlug} slug={workSlug} />}
          {route === "404" && <NotFound />}
        </Suspense>
      </main>
      <Footer />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <Lightbox state={lightbox} onChange={setLightbox} />
      <Analytics />
    </UIContext.Provider>
  );
}
