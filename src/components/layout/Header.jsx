import React from "react";
import { Menu, X } from "lucide-react";
import { scrollToSection, scrollToTop } from "../../utils/scroll";

const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "tawasol", label: "Featured Work" },
  { id: "gallery", label: "Gallery" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

export default function Header({ profile }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    scrollToTop(true);
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07111f]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <button
            type="button"
            onClick={handleBrandClick}
            className="cursor-pointer text-left transition hover:opacity-90"
          >
            <h1 className="text-lg font-bold tracking-wide text-white">{profile.name}</h1>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
              {profile.title}
            </p>
          </button>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#about" onClick={(e) => handleNavClick(e, "about")} className="transition hover:text-white">
              About
            </a>
            <a href="#skills" onClick={(e) => handleNavClick(e, "skills")} className="transition hover:text-white">
              Skills
            </a>
            <a href="#projects" onClick={(e) => handleNavClick(e, "projects")} className="transition hover:text-white">
              Projects
            </a>
            <a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className="transition hover:text-white">
              Contact
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:border-cyan-400/35 hover:bg-cyan-400/[0.08] md:hidden"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 md:hidden ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          onClick={closeMenu}
          className={`absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`absolute right-0 top-0 flex h-full w-[86vw] max-w-[360px] flex-col border-l border-white/10 bg-[#07111f]/95 shadow-2xl transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-white">{profile.name}</h2>
              <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-400">
                SharePoint and SPFx Developer
              </p>
            </div>

            <button
              type="button"
              onClick={closeMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:border-cyan-400/35 hover:bg-cyan-400/[0.08]"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400/35 hover:bg-cyan-400/[0.08] hover:text-white"
                >
                  <span>{item.label}</span>
                  <span className="text-cyan-300">•</span>
                </a>
              ))}
            </div>
          </nav>

          <div className="border-t border-white/10 p-4">
            <button
              type="button"
              onClick={handleBrandClick}
              className="w-full rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]"
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </>
  );
}