import { useCallback, useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute("data-theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("ad-theme", theme);
    } catch {
      /* storage blocked: theme still applies for this visit */
    }
  }, [theme]);

  const toggle = useCallback(() => {
    const apply = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
    if (document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.startViewTransition(apply);
    } else apply();
  }, []);

  return { theme, toggle };
}
