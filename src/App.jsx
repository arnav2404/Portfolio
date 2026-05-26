import React from "react";
import { profile } from "./data/portfolioData";
import { tawasolGallery } from "./data/tawasolGallery";

import Header from "./components/layout/Header";
import HeroSection from "./components/layout/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import SkillsSection from "./components/sections/SkillsSection";
import ToolsSection from "./components/sections/ToolsSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import ResumeSection from "./components/sections/ResumeSection";
import ContactSection from "./components/sections/ContactSection";
import ProjectsPage from "./components/pages/ProjectsPage";
import GalleryViewer from "./components/modals/GalleryViewer";
import ScrollToTopButton from "./components/layout/ScrollToTopButton";

import useScrollReveal from "./hooks/useScrollReveal";
import useScrollTopVisibility from "./hooks/useScrollTopVisibility";
import { scrollToSection, scrollToTop } from "./utils/scroll";

export default function App() {
  const [currentPage, setCurrentPage] = React.useState("home");
  const [pendingSection, setPendingSection] = React.useState(null);
  const [viewer, setViewer] = React.useState(null);
  const showScrollTop = useScrollTopVisibility(300);

  useScrollReveal(currentPage);

  React.useEffect(() => {
    setViewer(null);
  }, [currentPage]);

  React.useEffect(() => {
    if (!pendingSection) return undefined;

    const frame = window.requestAnimationFrame(() => {
      scrollToSection(pendingSection);
      setPendingSection(null);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [currentPage, pendingSection]);

  const navigateHome = () => {
    setCurrentPage("home");
    setPendingSection(null);
    scrollToTop(true);
  };

  const navigateToPage = (page) => {
    setCurrentPage(page);
    setPendingSection(null);
    scrollToTop(true);
  };

  const navigateToSection = (sectionId, page = currentPage) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      setPendingSection(sectionId);
      return;
    }

    scrollToSection(sectionId);
  };

  const openViewer = (sectionIndex) => {
    const section = tawasolGallery[sectionIndex];
    if (!section?.images?.length) return;

    setViewer({
      sectionIndex,
      imageIndex: 0,
    });
  };

  const closeViewer = () => setViewer(null);

  const showPrevImage = () => {
    if (!viewer) return;

    const images = tawasolGallery[viewer.sectionIndex].images;
    setViewer({
      ...viewer,
      imageIndex: viewer.imageIndex === 0 ? images.length - 1 : viewer.imageIndex - 1,
    });
  };

  const showNextImage = () => {
    if (!viewer) return;

    const images = tawasolGallery[viewer.sectionIndex].images;
    setViewer({
      ...viewer,
      imageIndex: viewer.imageIndex === images.length - 1 ? 0 : viewer.imageIndex + 1,
    });
  };

  const activeSection = viewer ? tawasolGallery[viewer.sectionIndex] : null;
  const activeImages = activeSection?.images || [];
  const activeImageSrc = viewer ? activeImages[viewer.imageIndex] : null;

  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <Header
        profile={profile}
        currentPage={currentPage}
        onNavigateHome={navigateHome}
        onNavigatePage={navigateToPage}
        onNavigateSection={navigateToSection}
      />

      <main>
        {currentPage === "home" ? (
          <>
            <HeroSection
              profile={profile}
              onViewProjects={() => navigateToSection("corpdms-case-study", "projects")}
            />
            <AboutSection />
            <SkillsSection />
            <ToolsSection />
            <ExperienceSection />
            <ResumeSection profile={profile} />
            <ContactSection profile={profile} />
          </>
        ) : (
          <ProjectsPage
            onOpenViewer={openViewer}
            onNavigateHome={navigateHome}
          />
        )}
      </main>

      <GalleryViewer
        viewer={viewer}
        activeSection={activeSection}
        activeImages={activeImages}
        activeImageSrc={activeImageSrc}
        onClose={closeViewer}
        onPrev={showPrevImage}
        onNext={showNextImage}
      />

      <ScrollToTopButton
        show={showScrollTop}
        onClick={() => scrollToTop(true)}
      />
    </div>
  );
}
