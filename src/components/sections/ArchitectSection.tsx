import React from "react";
import { Slider3D } from "../ui/Slider3D";

interface ArchitectSectionProps {
  t: any;
  isAr: boolean;
  activeSection: number;
}

export function ArchitectSection({
  t,
  isAr,
  activeSection,
}: ArchitectSectionProps) {
  return (
    <div
      className={`fixed inset-0 z-10 p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 2xl:p-24 h-screen flex flex-col justify-between overflow-hidden transition-all duration-700 ${activeSection === 1 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      style={{
        transform:
          activeSection === 1
            ? "perspective(1200px) rotateX(calc(var(--mouse-norm-y, 0) * -5deg)) rotateY(calc(var(--mouse-norm-x, 0) * 5deg))"
            : "none",
        transformStyle: "preserve-3d",
      }}
    >
      {/* TOP ROW */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-0">
        {/* Title */}
        <div className="max-w-2xl xl:max-w-3xl w-full">
          <h2
            className={`${isAr ? "text-3xl md:text-5xl lg:text-6xl 2xl:text-[5rem] leading-[1.4]" : "text-4xl md:text-6xl lg:text-[4.5rem] 2xl:text-[6rem] leading-[1] lg:leading-[0.9]"} font-medium tracking-wide text-app-fg mb-2 sm:mb-3 mt-2 lg:mt-0 drop-shadow-lg`}
          >
            {t.sec1Title1}
            <br />
            {t.sec1Title2}
          </h2>
          <p
            className={`text-app-fg/90 font-medium tracking-wide ${isAr ? "text-sm md:text-base leading-[1.8]" : "text-sm md:text-base leading-relaxed"} drop-shadow-md mb-2 lg:mb-0`}
          >
            {t.sec1Subtitle}
          </p>
        </div>

        {/* Top Right */}
        <div className="max-w-sm xl:max-w-md text-app-muted mt-2 lg:mt-4 self-end lg:self-auto w-full lg:w-auto">
          <p className="text-sm md:text-base leading-relaxed mb-4 sm:mb-6 drop-shadow-md">
            {t.sec1Desc}
          </p>
          <button className="font-mono text-[10px] sm:text-xs xl:text-sm tracking-widest text-app-fg hover:text-white uppercase flex items-center gap-2 transition-colors cursor-pointer bg-app-card/60 px-3 py-1.5 xl:px-4 xl:py-2 rounded-full backdrop-blur-sm border border-white/10 w-fit">
            {t.sec1ReadMore}
          </button>
        </div>
      </div>

      {/* MIDDLE: Left & Right side cards only — center stays clear */}
      <div className="flex justify-between items-center pointer-events-none">
        {/* Left side cards */}
        <div className="flex flex-col gap-3 xl:gap-4 w-[160px] sm:w-[200px] lg:w-[240px] xl:w-[300px] 2xl:w-[340px] pointer-events-auto">
          {/* Experience */}
          <div className="border border-white/10 rounded-2xl p-3 sm:p-4 xl:p-5 2xl:p-6 bg-app-card/60 backdrop-blur-md relative overflow-hidden group hover:border-white/20 transition-colors">
            <div className="font-mono text-[8px] sm:text-[9px] xl:text-[11px] 2xl:text-xs tracking-widest text-app-muted/60 uppercase mb-2 xl:mb-3">
              {t.sec1Status}
            </div>
            <div
              className={`${isAr ? "text-2xl sm:text-3xl xl:text-5xl 2xl:text-6xl" : "text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl"} font-medium text-app-fg drop-shadow-lg`}
            >
              {t.sec1ExpYears}
            </div>
            <div className="font-mono text-[8px] sm:text-[9px] xl:text-[11px] 2xl:text-xs tracking-widest text-app-muted/70 uppercase whitespace-pre-line mt-1 xl:mt-2">
              {t.sec1ExpLabel}
            </div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 xl:w-28 xl:h-28 bg-app-accent/10 rounded-full blur-2xl group-hover:bg-app-accent/20 transition-colors" />
          </div>

          {/* Tech Stack */}
          <div className="border border-white/10 rounded-2xl p-3 sm:p-4 xl:p-5 2xl:p-6 bg-app-card/60 backdrop-blur-md hover:border-white/20 transition-colors">
            <div className="font-mono text-[8px] sm:text-[9px] xl:text-[11px] 2xl:text-xs tracking-widest text-app-fg/80 uppercase mb-2 xl:mb-3">
              {t.sec1TechLabel}
            </div>
            <div className="flex flex-col gap-2 xl:gap-3">
              {t.sec1TechCategories.map((cat: any, i: number) => (
                <div key={i}>
                  <div className="font-mono text-[7px] sm:text-[8px] xl:text-[10px] 2xl:text-[11px] tracking-widest text-app-muted/50 uppercase mb-0.5">
                    {cat.label}
                  </div>
                  <div className="text-app-muted text-[10px] sm:text-[11px] xl:text-sm 2xl:text-base">
                    {cat.items}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side cards */}
        <div className="flex flex-col gap-3 xl:gap-4 w-[160px] sm:w-[200px] lg:w-[240px] xl:w-[300px] 2xl:w-[340px] pointer-events-auto">
          {/* Projects */}
          <div className="border border-white/10 rounded-2xl p-3 sm:p-4 xl:p-5 2xl:p-6 bg-app-card/60 backdrop-blur-md relative overflow-hidden group hover:border-white/20 transition-colors">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 xl:w-2 xl:h-2 rounded-full bg-app-success animate-pulse" />
              <div className="font-mono text-[8px] sm:text-[9px] xl:text-[11px] 2xl:text-xs tracking-widest text-app-muted/60 uppercase">
                {t.sec1Uptime}
              </div>
            </div>
            <div
              className={`${isAr ? "text-2xl sm:text-3xl xl:text-5xl 2xl:text-6xl" : "text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl"} font-medium text-app-fg drop-shadow-lg mt-2 xl:mt-3`}
            >
              {t.sec1ProjectsNum}
            </div>
            <div className="font-mono text-[8px] sm:text-[9px] xl:text-[11px] 2xl:text-xs tracking-widest text-app-muted/70 uppercase whitespace-pre-line mt-1 xl:mt-2">
              {t.sec1ProjectsLabel}
            </div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 xl:w-28 xl:h-28 bg-app-success/10 rounded-full blur-2xl group-hover:bg-app-success/20 transition-colors" />
          </div>

          {/* Slider */}
          <div className="border border-white/10 rounded-2xl p-3 sm:p-4 xl:p-5 2xl:p-6 bg-app-card/60 backdrop-blur-md hover:border-white/20 transition-colors">
            <div className="font-mono text-[8px] sm:text-[9px] xl:text-[11px] 2xl:text-xs tracking-widest text-app-muted/60 uppercase mb-2 xl:mb-3">
              {t.sec1Latency}
            </div>
            <Slider3D insights={t.sec1Insights} activeSection={activeSection} />
          </div>
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 lg:gap-0 w-full">
        {/* Bottom Left Stats */}
        <div className="flex flex-row gap-8 lg:gap-16 font-mono text-[10px] sm:text-xs xl:text-sm tracking-widest text-app-muted uppercase">
          <div className="flex flex-col gap-2">
            <div className="w-8 xl:w-10 h-px bg-white/20"></div>
            <span>
              {t.sec1Stat1Num}
              {t.sec1Stat1Text1}
              <br />
              {t.sec1Stat1Text2}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-8 xl:w-10 h-px bg-white/20"></div>
            <span>
              {t.sec1Stat2Num}
              {t.sec1Stat2Text1}
              <br />
              {t.sec1Stat2Text2}
            </span>
          </div>
        </div>

        {/* Bottom Right */}
        <div className="font-mono text-[10px] sm:text-xs xl:text-sm text-app-muted/50 tracking-widest flex items-center gap-3">
          <div className="w-16 md:w-32 xl:w-48 h-px bg-white/10" />
          <span>02 / 03</span>
        </div>
      </div>
    </div>
  );
}
