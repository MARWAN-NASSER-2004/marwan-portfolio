import React, { useState, useEffect } from "react";

export interface Insight {
  date: string;
  quote: string;
}

interface Slider3DProps {
  insights: Insight[];
  activeSection: number;
}

export function Slider3D({ insights, activeSection }: Slider3DProps) {
  const [insightIndex, setInsightIndex] = useState(0);

  // Auto-play the 3D Slider when its section is active
  useEffect(() => {
    if (activeSection !== 1) return;
    const timer = setInterval(() => {
      setInsightIndex((prev) => (prev + 1) % insights.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeSection, insightIndex, insights.length]);

  return (
    <div className="flex flex-col items-start text-left w-full">
      {/* Compact Buttons */}
      <div className="flex gap-2 mb-3 text-[#a3a3a3]">
        <button
          onClick={() =>
            setInsightIndex(
              (prev) => (prev - 1 + insights.length) % insights.length,
            )
          }
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-neutral-800 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer text-xs"
        >
          &lt;
        </button>
        <button
          onClick={() =>
            setInsightIndex((prev) => (prev + 1) % insights.length)
          }
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-neutral-800 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer text-xs"
        >
          &gt;
        </button>
      </div>

      {/* 3D Container */}
      <div
        className="relative w-full h-[50px]"
        style={{ perspective: "1000px" }}
      >
        {insights.map((insight, idx) => {
          let offset = idx - insightIndex;
          const total = insights.length;

          if (offset < -Math.floor(total / 2)) offset += total;
          if (offset > Math.floor(total / 2)) offset -= total;

          const isActive = offset === 0;

          return (
            <div
              key={idx}
              className="absolute inset-0 flex flex-col items-start justify-start transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? "auto" : "none",
                transformStyle: "preserve-3d",
                transform: isActive
                  ? "rotateX(0deg) translateZ(0px)"
                  : offset < 0
                    ? "rotateX(90deg) translateZ(40px) scale(0.8)"
                    : "rotateX(-90deg) translateZ(40px) scale(0.8)",
              }}
            >
              <div className="font-mono text-[8px] sm:text-[10px] tracking-widest text-app-muted/70 uppercase mb-1.5 flex items-center gap-2">
                {insight.date}
                {/* Progress Bar */}
                <div className="h-[2px] bg-white/10 w-8 overflow-hidden relative hidden sm:block rounded-full">
                  <div
                    className="absolute top-0 left-0 h-full bg-app-fg"
                    style={{
                      width: isActive ? "100%" : "0%",
                      opacity: isActive ? 1 : 0,
                      transition: isActive ? "width 4s linear" : "none",
                    }}
                  />
                </div>
              </div>
              <p className="text-app-fg text-[11px] sm:text-xs max-w-[200px] leading-relaxed drop-shadow-lg font-medium">
                {insight.quote}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
