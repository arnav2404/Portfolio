import { useEffect } from "react";

export default function useScrollReveal(refreshKey = "default") {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-up");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    elements.forEach((el) => {
      el.classList.remove("revealed");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [refreshKey]);
}
