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
import { DEFAULT_SETTINGS, SettingsContext } from "./lib/settings";

const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Admin = lazy(() => import("./pages/Admin"));

export const UIContext = React.createContext(null);

export default function App({ initialSettings = DEFAULT_SETTINGS, settingsRefresh }) {
  const path = usePath();
  const [settings, setSettings] = useState(initialSettings);
  const settingsValue = useMemo(() => ({ settings, setSettings }), [settings]);
  const { theme, toggle } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null); // { group, index }

  const workSlug = path.match(/^\/work\/([\w-]+)\/?$/)?.[1];
  const isAdmin = /^\/admin\/?$/.test(path);
  const route = path === "/" || path === "" ? "home" : workSlug && getWork(workSlug) ? "work" : isAdmin ? "admin" : "404";

  // A returning visitor started from the last saved copy; swap in the latest once it arrives.
  useEffect(() => {
    let live = true;
    settingsRefresh?.then((fresh) => live && fresh && setSettings(fresh));
    return () => { live = false; };
  }, [settingsRefresh]);

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

  if (route === "admin") {
    return (
      <SettingsContext.Provider value={settingsValue}>
        <UIContext.Provider value={ui}>
          <Suspense fallback={<div className="min-h-screen" />}>
            <Admin />
          </Suspense>
        </UIContext.Provider>
      </SettingsContext.Provider>
    );
  }

  return (
    <SettingsContext.Provider value={settingsValue}>
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
    </SettingsContext.Provider>
  );
}
