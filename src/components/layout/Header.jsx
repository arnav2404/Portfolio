import React from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import portfolioLogo from "../../assets/Logo/Portfolio_logo.png";

const navItems = [
  { label: "Home", page: "home" },
  { id: "about", label: "About", page: "home" },
  { id: "skills", label: "Skills", page: "home" },
  { id: "tools", label: "Tools", page: "home" },
  { label: "Projects", page: "projects" },
  { id: "tawasol", label: "Featured Work", page: "projects" },
  { id: "gallery", label: "Gallery", page: "projects" },
  { id: "projects", label: "Project Cards", page: "projects" },
  { id: "experience", label: "Experience", page: "home" },
  { id: "resume", label: "Resume", page: "home" },
  { id: "contact", label: "Contact", page: "home" },
];

const desktopNavItems = [
  { label: "Home", page: "home" },
  { id: "skills", label: "Skills", page: "home" },
  { label: "Projects", page: "projects" },
  { id: "experience", label: "Experience", page: "home" },
  { id: "contact", label: "Contact", page: "home" },
];

export default function Header({
  profile,
  currentPage = "home",
  onNavigateHome,
  onNavigatePage,
  onNavigateSection,
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    const handleEscape = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const handleNavClick = (event, item) => {
    event.preventDefault();

    if (item.id) {
      onNavigateSection?.(item.id, item.page);
    } else if (item.page === "home") {
      onNavigateHome?.();
    } else {
      onNavigatePage?.(item.page);
    }

    setIsMenuOpen(false);
  };

  const handleBrandClick = (event) => {
    event.preventDefault();
    onNavigateHome?.();
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const getHref = (item) => {
    if (item.id) return `#${item.id}`;
    return item.page === "projects" ? "#projects-page" : "#home";
  };

  const getDesktopLinkClass = (item) => {
    const isActivePage = !item.id && item.page === currentPage;

    return `rounded-full px-3 py-2 transition ${
      isActivePage
        ? "bg-cyan-400/10 text-cyan-200"
        : "text-slate-300 hover:bg-white/5 hover:text-white"
    }`;
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[70] border-b border-white/10 bg-[#07111f]/90 shadow-[0_8px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl supports-[backdrop-filter]:bg-[#07111f]/78">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-[72px] sm:gap-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={handleBrandClick}
            className="group flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-left transition hover:opacity-95 lg:flex-none"
          >
            <span className="grid h-10 w-10 flex-none place-items-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/10 transition group-hover:border-cyan-400/30 sm:h-12 sm:w-12">
              <img
                src={portfolioLogo}
                alt={`${profile.name} logo`}
                className="h-7 w-7 object-contain sm:h-9 sm:w-9"
              />
            </span>

            <span className="min-w-0">
              <span className="block truncate text-base font-bold tracking-wide text-white sm:text-lg">
                {profile.name}
              </span>
              <span className="mt-0.5 block max-w-[210px] truncate text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400 sm:max-w-none sm:text-[11px] sm:tracking-[0.22em]">
                {profile.title}
              </span>
            </span>
          </button>

          <nav className="hidden items-center rounded-full border border-white/10 bg-white/[0.03] p-1 text-sm font-medium shadow-lg shadow-black/10 lg:flex">
            {desktopNavItems.map((item) => (
              <a
                key={`${item.page}-${item.id || item.label}`}
                href={getHref(item)}
                onClick={(event) => handleNavClick(event, item)}
                className={getDesktopLinkClass(item)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white shadow-lg shadow-black/10 transition hover:border-cyan-400/35 hover:bg-cyan-400/[0.08] sm:h-11 sm:w-11 lg:hidden"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div
        id="mobile-navigation"
        className={`fixed inset-0 z-[90] lg:hidden ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <button
          type="button"
          onClick={closeMenu}
          className={`absolute inset-0 h-full w-full bg-black/60 text-left backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close menu overlay"
        />

        <aside
          className={`absolute right-0 top-0 flex h-[100dvh] w-[min(92vw,390px)] flex-col border-l border-white/10 bg-[#07111f]/95 shadow-2xl transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-4 sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-11 w-11 flex-none place-items-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <img
                  src={portfolioLogo}
                  alt={`${profile.name} logo`}
                  className="h-8 w-8 object-contain"
                />
              </span>

              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold text-white">{profile.name}</h2>
                <p className="mt-1 truncate text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  {profile.title}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeMenu}
              className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:border-cyan-400/35 hover:bg-cyan-400/[0.08]"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="scrollbar-thin flex-1 overflow-y-auto px-4 py-4">
            <div className="grid gap-2">
              {navItems.map((item) => {
                const isActivePage = item.page === currentPage;

                return (
                  <a
                    key={`${item.page}-${item.id || item.label}`}
                    href={getHref(item)}
                    onClick={(event) => handleNavClick(event, item)}
                    className="group flex min-h-12 items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/35 hover:bg-cyan-400/[0.08] hover:text-white"
                  >
                    <span>{item.label}</span>
                    <span
                      className={`grid h-7 w-7 place-items-center rounded-full border text-xs transition ${
                        isActivePage
                          ? "border-cyan-300/30 bg-cyan-400/10 text-cyan-200"
                          : "border-white/10 bg-white/5 text-slate-500 group-hover:text-cyan-200"
                      }`}
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </a>
                );
              })}
            </div>
          </nav>

          <div className="border-t border-white/10 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={handleBrandClick}
              className="w-full rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-950/20 transition hover:scale-[1.01] active:scale-[0.99]"
            >
              Back to Home
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
