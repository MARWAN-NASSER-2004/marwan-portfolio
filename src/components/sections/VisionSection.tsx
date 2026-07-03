import React from "react";

interface VisionSectionProps {
  t: any;
  isAr: boolean;
  activeSection: number;
}

export function VisionSection({ t, isAr, activeSection }: VisionSectionProps) {
  const isActive = activeSection === 2;

  return (
    <section
      className={`fixed inset-0 z-10 p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 2xl:p-24 h-screen flex flex-col items-center justify-center pointer-events-none overflow-hidden transition-opacity duration-1000 ${isActive ? "opacity-100" : "opacity-0"}`}
    >
      {/* Cinematic Text Reveal matching the Eye Focus */}
      <div
        className={`max-w-4xl px-6 text-center transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform ${
          isActive
            ? "scale-100 blur-none translate-y-0"
            : "scale-110 blur-xl translate-y-12"
        }`}
      >
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-white leading-[1.2] drop-shadow-[0_0_40px_rgba(255,255,255,0.7)] tracking-tight">
          {t.visionQuote}
        </h2>
      </div>

      {/* CTA Button Pinned to Bottom Center */}
      <div
        className={`absolute bottom-16 sm:bottom-24 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-[600ms] ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      >
        <button
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight * 2.2,
              behavior: "smooth",
            });
          }}
          className="px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-mono text-xs tracking-[0.2em] hover:bg-white/10 hover:border-white/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer pointer-events-auto flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
        >
          {t.viewWork}
          <div className="w-1.5 h-1.5 rounded-full bg-app-accent animate-pulse shadow-[0_0_8px_currentColor]" />
        </button>
      </div>
    </section>
  );
}
