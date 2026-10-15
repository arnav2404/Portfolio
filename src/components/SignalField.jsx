import React, { useEffect, useRef } from "react";

// A quiet dot grid that wakes up around the pointer and sends occasional "signals" along its rows.
// Pauses when off-screen or hidden, and draws a single static frame for reduced-motion users.
export default function SignalField({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gap = 26;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const pulses = [];

    const colors = () => {
      const s = getComputedStyle(document.documentElement);
      return { dot: s.getPropertyValue("--ink-3").trim(), hot: s.getPropertyValue("--accent-text").trim() };
    };
    let palette = colors();

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) draw(0);
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;

      if (!reduced && Math.random() < 0.025 && pulses.length < 4) {
        const horizontal = Math.random() < 0.6;
        pulses.push({
          horizontal,
          line: Math.floor(Math.random() * ((horizontal ? h : w) / gap)) * gap + gap / 2,
          pos: -60,
          speed: 2 + Math.random() * 3,
        });
      }

      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          const d = Math.hypot(x - pointer.x, y - pointer.y);
          let glow = Math.max(0, 1 - d / 180);
          for (const p of pulses) {
            const on = p.horizontal ? Math.abs(y - p.line) < 1 : Math.abs(x - p.line) < 1;
            if (on) glow = Math.max(glow, Math.max(0, 1 - Math.abs((p.horizontal ? x : y) - p.pos) / 70));
          }
          const breathe = reduced ? 0 : 0.04 * Math.sin(t / 1400 + x * 0.02 + y * 0.03);
          ctx.globalAlpha = Math.min(1, 0.16 + breathe + glow * 0.8);
          ctx.fillStyle = glow > 0.05 ? palette.hot : palette.dot;
          const r = 1 + glow * 1.4;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].pos += pulses[i].speed;
        if (pulses[i].pos > (pulses[i].horizontal ? w : h) + 80) pulses.splice(i, 1);
      }
      if (!reduced && visible) raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - r.left;
      pointer.ty = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting && !document.hidden;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });
    const onVis = () => {
      visible = !document.hidden;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    };
    const mo = new MutationObserver(() => {
      palette = colors();
      if (reduced) draw(0);
    });

    resize();
    draw(0);
    io.observe(canvas);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
