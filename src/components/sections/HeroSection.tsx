import React from "react";
import { TextLoop } from "../ui/TextLoop";

interface HeroSectionProps {
  t: any;
  isAr: boolean;
  setLang: (lang: "en" | "ar") => void;
  activeSection: number;
}

export function HeroSection({
  t,
  isAr,
  setLang,
  activeSection,
}: HeroSectionProps) {
  return (
    <div
      className={`fixed inset-0 z-10 p-6 sm:p-8 md:p-12 lg:p-16 h-screen flex flex-col justify-between gap-12 lg:gap-0 overflow-hidden transition-opacity duration-700 ${activeSection === 0 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      {/* TOP ROW */}
      <div className="flex flex-col-reverse lg:flex-row justify-between items-start gap-8 lg:gap-0">
        {/* Main Hero Title */}
        <div className="max-w-xl w-full">
          <h1
            className={`${isAr ? "text-3xl md:text-5xl lg:text-6xl 2xl:text-[5rem] leading-[1.4] tracking-normal" : "text-4xl md:text-6xl lg:text-[4.5rem] 2xl:text-[6rem] leading-[1] lg:leading-[0.9] tracking-wide"} font-medium text-app-fg mb-3 sm:mb-4 mt-2 lg:mt-0 flex flex-col items-start text-start`}
          >
            <span className="animate-infinite-float inline-block w-fit">
              {t.title1}
            </span>
            {isAr ? (
              <>
                <span className="animate-infinite-float delay-300 inline-block w-fit text-app-accent">
                  <TextLoop words={t.title3Loop} isAr={isAr} />
                </span>
                <span className="animate-infinite-float delay-500 inline-block w-fit">
                  {t.title2}
                </span>
              </>
            ) : (
              <>
                <span className="animate-infinite-float delay-300 inline-block w-fit">
                  {t.title2}
                </span>
                <span className="animate-infinite-float delay-500 inline-block w-fit text-app-accent">
                  <TextLoop words={t.title3Loop} isAr={isAr} />
                </span>
              </>
            )}
          </h1>
          <p
            className={`text-app-muted text-sm md:text-base ${isAr ? "leading-[1.8]" : "leading-relaxed"} max-w-sm drop-shadow-md text-start me-auto mb-8 sm:mb-12 lg:mb-0`}
          >
            {t.desc}
          </p>
        </div>

        {/* Top Right Info */}
        <div className="font-mono text-[10px] md:text-xs text-app-muted/70 flex items-center gap-4 uppercase tracking-widest mt-0 lg:mt-4 self-end lg:self-auto w-full lg:w-auto justify-end lg:justify-start">
          <button
            onClick={() => setLang(isAr ? "en" : "ar")}
            className="hover:text-app-fg transition-colors border border-white/10 px-3 py-1 rounded-full cursor-pointer bg-app-card/60 backdrop-blur-sm"
          >
            {t.langToggle}
          </button>
          <span className="bg-app-card/60 px-2 py-1 rounded backdrop-blur-sm">
            1/26
          </span>
          <div className="w-16 md:w-32 h-px bg-white/10"></div>
          <span className="bg-app-card/60 px-2 py-1 rounded backdrop-blur-sm">
            {t.nextProj}
          </span>
        </div>
      </div>

      {/* MIDDLE RIGHT: Table */}
      <div className="relative lg:absolute lg:top-1/2 lg:end-8 xl:end-16 lg:-translate-y-1/2 w-full lg:w-[320px] xl:w-[340px] mt-4 lg:mt-0 bg-app-card/40 p-4 rounded-2xl backdrop-blur-md border border-white/10">
        <h3 className="font-mono text-xs tracking-widest text-app-fg/80 mb-4 lg:mb-6 uppercase">
          {t.devSkill}
        </h3>
        <ul className="flex flex-col text-sm border-t border-white/10">
          {t.skills.map((skill: any, index: number) => (
            <li
              key={index}
              className="flex justify-between items-center py-4 border-b border-white/10"
            >
              <span className="text-app-muted/70">{skill.label}</span>
              <span className="text-app-muted">{skill.value}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* BOTTOM ROW */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 lg:gap-0 mt-8 lg:mt-0">
        {/* Bottom Left Card */}
        <div className="border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-full lg:max-w-[360px] bg-app-card/60 backdrop-blur-md">
          <h4 className="font-mono text-xs text-app-muted tracking-widest mb-4 uppercase">
            {t.cardTitle}
          </h4>
          <p
            className={`text-app-muted/70 text-sm ${isAr ? "leading-[1.8]" : "leading-relaxed"} mb-6`}
          >
            {t.cardDesc1}
            <br className="hidden sm:block" />
            {t.cardDesc2}
          </p>
          <button className="px-5 py-2.5 rounded-full border border-white/10 text-app-muted text-sm hover:bg-white/5 hover:text-app-fg transition-colors w-full sm:w-auto cursor-pointer bg-app-card/60">
            {t.hireBtn}
          </button>
        </div>

        {/* Bottom Right Pills */}
        <div className="font-mono text-[10px] sm:text-xs text-app-muted flex flex-wrap lg:flex-nowrap items-center gap-2 sm:gap-3 w-full lg:w-auto pb-4 lg:pb-0 justify-start lg:justify-end">
          <div className="px-4 py-2.5 border border-white/10 rounded-full flex items-center justify-center shrink-0 bg-app-card/60 backdrop-blur-sm">
            JS/TSX
          </div>
          <div className="px-3.5 py-2.5 border border-white/10 rounded-full flex items-center justify-center shrink-0 bg-app-card/60 backdrop-blur-sm">
            A+
          </div>
          <div className="flex border border-white/10 rounded-full overflow-hidden shrink-0 bg-app-card/60 backdrop-blur-sm">
            <div className="px-4 sm:px-5 py-2.5 border-e border-white/10">
              {t.pillFullStack}
            </div>
            <div className="px-4 sm:px-5 py-2.5">{t.pillCloudReady}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
