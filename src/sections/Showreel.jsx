import React, { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../lib/hooks";

// Scroll-driven machine tour: a polished engine turns into a technical drawing, comes apart layer
// by layer while the copy explains each layer, then reassembles. Three.js is loaded on demand.

const STEPS = [
  {
    tag: "Assembled",
    title: "Every system I build is a machine of parts.",
    body: "Scroll to take it apart. Each layer is something I design, build and wire together on Microsoft 365.",
    stack: [],
  },
  {
    tag: "The toolbox",
    title: "One toolkit, every moving part.",
    body: "Everything I reach for, from the first web part to the last governance script, working as one system.",
    stack: [],
  },
  {
    tag: "Layer 01 · Interface",
    title: "The lens people actually look through.",
    body: "SPFx web parts and application customizers in React and TypeScript. Responsive, themed light and dark, accessible, and fast on real SharePoint pages.",
    stack: ["SPFx", "React", "TypeScript", "Fluent UI", "SCSS modules"],
  },
  {
    tag: "Layer 02 · Workflow",
    title: "Gears that keep everything moving.",
    body: "Staged reviews, approvals, reminders and escalations. The browser logs an event; Power Automate does the privileged work and sends the right email.",
    stack: ["Power Automate", "Workflow events", "Approvals", "Mail templates"],
  },
  {
    tag: "Layer 03 · Data core",
    title: "A core made of lists and libraries.",
    body: "SharePoint lists, content types and metadata modelled like a real database, with ETag-checked writes so two tabs never overwrite each other.",
    stack: ["SharePoint lists", "PnP JS", "REST", "Content types", "Term store"],
  },
  {
    tag: "Layer 04 · Integrations",
    title: "Pods and wings to the outside world.",
    body: "Microsoft Graph, Viva Engage, Azure AI Face, Power BI and external APIs, brought inside the portal instead of linked out.",
    stack: ["Microsoft Graph", "Viva Engage", "Azure AI Face", "Power BI", "KQL search"],
  },
  {
    tag: "Layer 05 · Security & governance",
    title: "The housing that holds it together.",
    body: "Role-based access through SharePoint groups, audit trails, scripted provisioning and a client that never holds the keys.",
    stack: ["SharePoint groups", "Audit log", "PnP PowerShell", "CSOM", "Site scripts"],
  },
  {
    tag: "Reassembled",
    title: "Then it ships as one product.",
    body: "One SPFx package, one shared customizer, every layer working together. That is how Innov8, Athar Awards and Tawasol were built.",
    stack: [],
  },
];

const LAYERS = [
  { name: "Interface", share: 26 },
  { name: "Workflow", share: 18 },
  { name: "Data core", share: 22 },
  { name: "Integrations", share: 20 },
  { name: "Security", share: 14 },
];
const LAYER_INK = ["#1d2026", "#4f7300", "#0b8295", "#6b4fd8", "#cf4b2a", "#a86f00"];

const LABELS = {
  toolboxRight: ["spfx", "react", "typescript", "fluent ui", "pnp js", "power automate"],
  toolboxLeft: ["microsoft graph", "azure ai", "power bi", "pnp powershell", "kql search"],
  layers: LAYERS.map((l) => l.name.toLowerCase()),
};

// Ink colours used while the section is on "paper".
const PAPER_VARS = {
  "--ink": "#15171c",
  "--ink-2": "#3c414c",
  "--ink-3": "#6c707b",
  "--line": "rgba(10,13,20,0.1)",
  "--line-strong": "rgba(10,13,20,0.2)",
  "--accent-text": "#4a6a00",
  "--surface": "#f1efe9",
};

const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export default function Showreel() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const sceneRef = useRef(null);
  const markerRef = useRef(null);
  const [active, setActive] = useState(0);
  const [paper, setPaper] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduced = usePrefersReducedMotion();
  const n = STEPS.length;

  // Load the 3D scene only when the section gets close to the viewport.
  useEffect(() => {
    const section = sectionRef.current;
    let disposed = false;
    let resizeObs;
    let visObs;
    const load = new IntersectionObserver(
      async ([e]) => {
        if (!e.isIntersecting || sceneRef.current) return;
        load.disconnect();
        try {
          const { createMachine } = await import("../three/machineScene.js");
          if (disposed) return;
          const m = createMachine(canvasRef.current, overlayRef.current, LABELS);
          sceneRef.current = m;
          const size = () => {
            const r = canvasRef.current.getBoundingClientRect();
            m.resize(r.width, r.height);
          };
          size();
          resizeObs = new ResizeObserver(size);
          resizeObs.observe(canvasRef.current);
          visObs = new IntersectionObserver(([v]) => (v.isIntersecting && !reduced ? m.start() : m.stop()));
          visObs.observe(section);
          window.dispatchEvent(new Event("scroll"));
        } catch {
          setFailed(true);
        }
      },
      { rootMargin: "600px 0px" }
    );
    load.observe(section);

    const themeObs = new MutationObserver(() => sceneRef.current?.theme());
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      disposed = true;
      load.disconnect();
      resizeObs?.disconnect();
      visObs?.disconnect();
      themeObs.disconnect();
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [reduced]);

  // Scroll drives the paper fade, explode amount, labels, pose and the copy.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
      const pos = p * n;
      const idx = Math.min(n - 1, Math.floor(pos));
      const b = smooth(0.55, 1.15, pos) * (1 - smooth(n - 1.45, n - 0.85, pos));
      setActive(idx);
      setPaper(b > 0.5);
      stageRef.current?.style.setProperty("--b", b.toFixed(3));
      if (markerRef.current) markerRef.current.style.left = `calc(12px + ${p.toFixed(4)} * (100% - 24px))`;
      sceneRef.current?.set({
        b,
        explode: smooth(1.55, 2.4, pos) * (1 - smooth(n - 1.6, n - 0.8, pos)),
        toolbox: smooth(1.05, 1.35, pos) * (1 - smooth(1.7, 1.95, pos)),
        tags: smooth(2.15, 2.45, pos) * (1 - smooth(n - 1.3, n - 1.05, pos)),
        focus: idx >= 2 && idx <= n - 2 ? idx - 1 : 0,
        pose: Math.max(0, pos - 0.5),
        progress: p,
        steps: n,
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onMove = (e) => sceneRef.current?.pointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, [n]);

  const jump = (i) => {
    const el = sectionRef.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (total * (i + 0.4)) / n, behavior: "smooth" });
  };

  const s = STEPS[active];
  const focus = active >= 2 && active <= n - 2 ? active - 1 : 0;

  return (
    <section id="tour" ref={sectionRef} aria-label="How I build, as a machine taken apart" className="relative" style={{ height: `${n * 100 + 40}vh` }}>
      <div
        ref={stageRef}
        className="sticky top-0 h-[100svh] overflow-hidden text-ink"
        style={{
          "--b": 0,
          "--sbg": "color-mix(in oklab, var(--bg), #e7e4dc calc(var(--b) * 100%))",
          background: "var(--sbg)",
          ...(paper ? PAPER_VARS : null),
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(55%_60%_at_66%_50%,var(--accent-soft),transparent_70%)] transition-opacity duration-700 max-md:bg-[radial-gradient(70%_45%_at_50%_30%,var(--accent-soft),transparent_70%)]"
          style={{ opacity: "calc(1 - var(--b))" }}
        />
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
        {failed && <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />}

        <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,var(--sbg),transparent)]" />
        <div aria-hidden className="absolute inset-y-0 left-0 hidden w-[46%] bg-[linear-gradient(to_right,var(--sbg)_35%,transparent)] md:block" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[58%] bg-[linear-gradient(to_top,var(--sbg)_45%,transparent)] md:hidden" />
        <div ref={overlayRef} aria-hidden className="pointer-events-none absolute inset-0" />

        <div className="pointer-events-none relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 md:justify-start md:pb-0 md:pt-32">
          <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-ink-3">
            <span className="text-accent-text">How I build</span>
            <span className="h-px w-8 bg-line-strong" />
            {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </p>

          <div key={active} className="max-w-sm lg:max-w-md">
            <p className="rise font-mono text-xs uppercase tracking-[0.2em]" style={{ color: focus ? (paper ? LAYER_INK[focus] : undefined) : undefined }}>
              <span className={focus ? "" : "text-accent-text"}>{s.tag}</span>
            </p>
            <h2 className="rise mt-4 font-display text-[clamp(2rem,3.8vw,3.3rem)] font-extrabold leading-[0.98] tracking-[-0.04em]" style={{ "--d": "60ms" }}>
              {s.title}
            </h2>
            <p className="rise mt-5 text-base leading-relaxed text-ink-2" style={{ "--d": "120ms" }}>
              {s.body}
            </p>
            {s.stack.length > 0 && (
              <ul className="rise mt-6 flex flex-wrap gap-2" style={{ "--d": "180ms" }}>
                {s.stack.map((t) => (
                  <li key={t} className="flex items-center gap-1.5 font-mono text-[11px] text-ink-2">
                    <span className="text-ink-3">→</span>
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="pointer-events-auto mt-8 flex items-center gap-2" role="tablist" aria-label="Machine layers">
            {STEPS.map((st, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={st.tag}
                onClick={() => jump(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-10 bg-accent-text" : "w-4 bg-line-strong hover:bg-ink-3"}`}
              />
            ))}
          </div>
        </div>

        {/* Layer breakdown + scroll timeline, bottom right on larger screens */}
        <div className="pointer-events-none absolute bottom-6 right-6 hidden w-72 space-y-2 md:block">
          <div
            className={`rounded-xl bg-[#1b1d22] p-4 text-[#e9e7e1] shadow-2xl transition-all duration-500 ${focus ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
          >
            <div className="flex items-baseline justify-between text-xs">
              <span className="font-semibold">Build breakdown</span>
              <span className="font-mono text-[11px] text-[#a9aab0]">{focus ? LAYERS[focus - 1].name : ""}</span>
            </div>
            <div className="mt-3 flex h-2 gap-0.5 overflow-hidden rounded-full">
              {LAYERS.map((l, i) => (
                <span
                  key={l.name}
                  className="transition-opacity duration-500"
                  style={{ width: `${l.share}%`, background: LAYER_INK[i + 1], filter: "brightness(1.5)", opacity: !focus || focus === i + 1 ? 1 : 0.3 }}
                />
              ))}
            </div>
            <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 font-mono text-[10.5px]">
              {LAYERS.map((l, i) => (
                <li key={l.name} className="flex items-center gap-1.5 transition-opacity duration-500" style={{ opacity: focus === i + 1 ? 1 : 0.55 }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: LAYER_INK[i + 1], filter: "brightness(1.5)" }} />
                  {l.name}
                </li>
              ))}
            </ul>
          </div>
          <div aria-hidden className="relative flex h-8 items-center justify-between rounded-lg bg-[#1b1d22]/90 px-3">
            {Array.from({ length: 28 }, (_, i) => (
              <span key={i} className={`w-px bg-[#5b5e66] ${i % 4 === 0 ? "h-3" : "h-2"}`} />
            ))}
            <span ref={markerRef} className="absolute top-1/2 h-4 w-0.5 -translate-y-1/2 rounded bg-[#ff5a5f]" style={{ left: 12 }} />
          </div>
        </div>
      </div>
    </section>
  );
}
