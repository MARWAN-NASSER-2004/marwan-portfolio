import React, { useState, useEffect } from "react";

interface TextLoopProps {
  words: string[];
  isAr?: boolean;
}

export function TextLoop({ words, isAr }: TextLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 4000); // 4 second loop per word
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <span
      className="relative inline-flex overflow-hidden pb-4 -mb-4"
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}
    >
      {words.map((word, wordIdx) => {
        const isActive = wordIdx === currentIndex;
        // The previous word sliding out
        const isPrev =
          wordIdx === (currentIndex - 1 + words.length) % words.length;

        return (
          <span
            key={wordIdx}
            className={`absolute ${isAr ? "right-0" : "left-0"} flex overflow-hidden`}
            aria-hidden={!isActive}
          >
            {isAr ? (
              <span
                className="inline-block transition-transform duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{
                  transform: `translateY(${isActive ? "0%" : isPrev ? "-120%" : "120%"})`,
                }}
              >
                {word}
              </span>
            ) : (
              word.split("").map((char, charIdx) => {
                // active -> 0%
                // prev -> slides UP to -120%
                // next/inactive -> waits at 120% (below)
                const yPos = isActive ? "0%" : isPrev ? "-120%" : "120%";

                return (
                  <span
                    key={charIdx}
                    className="inline-block transition-transform duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                    style={{
                      transform: `translateY(${yPos})`,
                      // staggered delay per character
                      transitionDelay: `${charIdx * 50}ms`,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                );
              })
            )}
          </span>
        );
      })}
      {/* Invisible placeholder to maintain the width of the largest word perfectly */}
      <span className="invisible grid">
        {words.map((w, i) => (
          <span key={i} className="col-start-1 row-start-1 flex">
            {isAr 
              ? w
              : w.split("").map((char, charIdx) => (
                  <span key={charIdx}>{char === " " ? "\u00A0" : char}</span>
                ))}
          </span>
        ))}
      </span>
    </span>
  );
}
