import React, { useState, Suspense } from "react";
import { content } from "./data/content";
import { useScrollSequence } from "./hooks/useScrollSequence";
import { BackgroundCanvas } from "./components/ui/BackgroundCanvas";
import { Starfield } from "./components/ui/Starfield";
import { HeroSection } from "./components/sections/HeroSection";
import { ArchitectSection } from "./components/sections/ArchitectSection";
import { VisionSection } from "./components/sections/VisionSection";
const SkillsSection = React.lazy(() => import("./components/sections/SkillsSection").then(m => ({ default: m.SkillsSection })));
const ProjectsSection = React.lazy(() => import("./components/sections/ProjectsSection").then(m => ({ default: m.ProjectsSection })));
import { Preloader } from "./components/ui/Preloader";

export default function App() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [isLoading, setIsLoading] = useState(true);
  const isAr = lang === "ar";
  const t = content[lang];

  const { isScrolled, activeSection, canvasRef, cubeRef, sceneRef } = useScrollSequence();

  return (
    <div
      className={`relative bg-black text-neutral-300 ${isAr ? "font-arabic" : "font-sans"} selection:bg-neutral-800`}
      dir={isAr ? "rtl" : "ltr"}
    >
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      {/* Custom Cursor Ring */}
      <div
        className={`fixed pointer-events-none z-[100] rounded-full shadow-[inset_0_0_20px_rgba(255,255,255,0.25),0_0_20px_rgba(255,255,255,0.15)] transition-opacity duration-500 ${isScrolled ? "opacity-0" : "opacity-100"}`}
        style={{
          width: "240px",
          height: "240px",
          left: "var(--mouse-x, -999px)",
          top: "var(--mouse-y, -999px)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* 3D SCENE WRAPPER */}
      <div 
        ref={sceneRef}
        className="fixed inset-0 w-full h-full overflow-hidden bg-black z-10" 
        style={{ perspective: "2000px", willChange: "transform" }}
      >
        
        {/* Ambient Studio Background behind the cube */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-[#030303] overflow-hidden flex items-center justify-center">
          {/* Massive ambient glow */}
          <div className="absolute w-[70vw] h-[70vw] bg-app-accent/10 rounded-full blur-[120px] opacity-70" />
          
          {/* 3D Perspective Grid Floor */}
          <div 
            className="absolute bottom-0 w-[300vw] h-[150vh] -left-[100vw] opacity-[0.04]" 
            style={{ 
              backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', 
              backgroundSize: '60px 60px', 
              transform: 'perspective(1000px) rotateX(80deg) translateY(200px) translateZ(-200px)',
              transformOrigin: 'bottom'
            }} 
          />
        </div>

        {/* THE CUBE */}
        <div 
          ref={cubeRef}
          className="w-full h-full z-10"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(-50vw) rotateY(0deg)",
            willChange: "transform"
          }}
        >
          {/* FRONT FACE (Main Website) */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ transform: "rotateY(0deg) translateZ(50vw)", backfaceVisibility: "hidden" }}
          >
            {/* WebGL Canvas & Lighting Overlay */}
            <BackgroundCanvas canvasRef={canvasRef} isScrolled={isScrolled} activeSection={activeSection} />

            {/* UI Sections */}
            <HeroSection
              t={t}
              isAr={isAr}
              setLang={setLang}
              activeSection={activeSection}
            />
            <ArchitectSection t={t} isAr={isAr} activeSection={activeSection} />
            <VisionSection t={t} isAr={isAr} activeSection={activeSection} />
          </div>

          {/* RIGHT FACE (Skills) */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ transform: "rotateY(90deg) translateZ(50vw)", backfaceVisibility: "hidden" }}
          >
            {/* Interactive Skills Section (Warp Target) */}
            <div 
              className="w-full transition-opacity duration-700 ease-in-out"
              style={{
                opacity: activeSection >= 3 ? 1 : 0,
                pointerEvents: activeSection >= 3 ? 'auto' : 'none',
                display: activeSection >= 3 ? 'block' : 'none'
              }}
            >
              <Suspense fallback={<div className="w-full h-screen" />}>
                <SkillsSection t={t} isAr={isAr} />
              </Suspense>
            </div>

            {/* Projects Section (Appears after Warp) */}
            <div 
              className="w-full transition-all duration-1000 ease-in-out"
              style={{
                transform: 'var(--projects-transform, translateY(100vh))',
                opacity: 'var(--projects-opacity, 0)',
                visibility: 'var(--projects-visibility, hidden)' as any,
                pointerEvents: activeSection === 4 ? 'auto' : 'none',
              }}
            >
              <Suspense fallback={<div className="w-full min-h-screen" />}>
                <ProjectsSection t={t} isAr={isAr} />
              </Suspense>
            </div>
          </div>

        </div>
      </div>

      {/* Global Scroll Down Indicator */}
      <div 
        className={`fixed bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${
          activeSection < 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        <button
          onClick={() => {
            const vh = window.innerHeight;
            // Scroll to next snap point based on current section
            if (activeSection === 0) {
              window.scrollTo({ top: vh * 0.35, behavior: "smooth" }); // Go to Architect
            } else if (activeSection === 1) {
              window.scrollTo({ top: vh * 1.35, behavior: "smooth" }); // Go to Vision
            } else if (activeSection === 2) {
              window.scrollTo({ top: vh * 2.15, behavior: "smooth" }); // Go to Skills
            }
          }}
          className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-white font-mono text-[10px] sm:text-xs tracking-[0.2em] hover:bg-white/10 hover:border-white/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)] group"
        >
          <span>{isAr ? "التالي" : "SCROLL"}</span>
          <svg className="w-4 h-4 text-app-accent group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* 3D Scene Spacer (Provides the scrollable area for the 3D sequence) */}
      {/* 30vh (hero->architect) + 100vh (architect) + 80vh (vision) + 100vh (warp zone) = 310vh */}
      <div className="relative w-full h-[310vh] pointer-events-none z-0">
        {/* Scroll Snap Points for the 3D Scene */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="h-[30vh] w-full snap-start snap-always" />
          <div className="h-[100vh] w-full snap-start snap-always" />
          <div className="h-[80vh] w-full snap-start snap-always" />
          {/* Skills section snap point (starts at 210vh, ends at 310vh) */}
          <div className="h-[100vh] w-full snap-start snap-always" />
          {/* Snap point for the Projects Section start (at exactly 310vh) */}
          <div className="h-0 w-full snap-start snap-always" />
        </div>
      </div>

      {/* Normal Vertical Scrolling Content Begins Below 410vh */}
      <ProjectsSection t={t} isAr={isAr} />

    </div>
  );
}
