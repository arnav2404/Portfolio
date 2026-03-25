export function clearHashFromUrl() {
  window.history.replaceState(null, "", window.location.pathname + window.location.search);
}

export function scrollToSection(id, headerOffset = 96) {
  const el = document.getElementById(id);
  if (!el) return;

  const elementTop = el.getBoundingClientRect().top + window.pageYOffset;
  const scrollTarget = Math.max(elementTop - headerOffset, 0);

  window.scrollTo({
    top: scrollTarget,
    behavior: "smooth",
  });

  clearHashFromUrl();
}

export function scrollToTop(clearHash = false) {
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (clearHash) {
    clearHashFromUrl();
  }
}