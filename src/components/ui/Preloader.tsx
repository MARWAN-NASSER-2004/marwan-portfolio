import React, { useState, useEffect } from "react";

const BOOT_LOGS = [
  "INITIALIZING NEURAL LINK...",
  "BYPASSING SECURITY PROTOCOLS...",
  "LOADING CORE MODULES: [OK]",
  "ESTABLISHING SECURE CONNECTION...",
  "DECRYPTING PORTFOLIO ASSETS...",
  "RENDERING 3D ENVIRONMENT...",
  "SYNCING TIMELINES...",
  "CALIBRATING AESTHETICS...",
  "SYSTEM BOOT: COMPLETE",
];

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [phase, setPhase] = useState<"loading" | "reveal">("loading");

  // Lock scrolling while preloader is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    let loadedCount = 0;
    const totalFrames = 300;
    let isCompleted = false;
    
    let isWindowLoaded = document.readyState === "complete";
    const handleLoad = () => { 
      isWindowLoaded = true; 
      checkComplete();
    };
    
    if (!isWindowLoaded) {
      window.addEventListener("load", handleLoad);
    }

    const checkComplete = () => {
      if (isCompleted) return;
      // We require ALL 300 frames to load + the main window load event
      if (loadedCount >= totalFrames && isWindowLoaded) {
        isCompleted = true;
        setProgress(100);
        
        // Brief pause at 100% before reveal
        setTimeout(() => {
          setPhase("reveal");
          // Wait for the split-door CSS transition to finish before unmounting
          setTimeout(onComplete, 1200); 
        }, 400);
      }
    };

    // Preload all 300 frames to make the progress bar REAL
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      // Ensure we hit the same cache URL as useScrollSequence
      img.src = `/frames/frame_${String(i).padStart(3, "0")}.jpg`;
      
      const onImageLoadOrError = () => {
        loadedCount++;
        if (!isCompleted) {
          // Cap at 99% until window is fully loaded
          const percentage = Math.floor((loadedCount / totalFrames) * 99);
          setProgress(prev => Math.max(prev, percentage));
        }
        checkComplete();
      };

      img.onload = onImageLoadOrError;
      img.onerror = onImageLoadOrError;
    }

    // Terminal Logs Simulation
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < BOOT_LOGS.length) {
        setLogs((prev) => [...prev, BOOT_LOGS[logIndex]].slice(-5));
        logIndex++;
      }
    }, 300);

    return () => {
      clearInterval(logInterval);
      window.removeEventListener("load", handleLoad);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col">
      {/* Top Door */}
      <div 
        className={`absolute top-0 left-0 w-full h-[50vh] bg-[#050505] border-b border-app-accent/30 transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] shadow-[0_10px_30px_rgba(196,129,255,0.1)] ${phase === "reveal" ? "-translate-y-full" : "translate-y-0"}`}
      ></div>
      
      {/* Bottom Door */}
      <div 
        className={`absolute bottom-0 left-0 w-full h-[50vh] bg-[#050505] border-t border-app-accent/30 transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] shadow-[0_-10px_30px_rgba(196,129,255,0.1)] ${phase === "reveal" ? "translate-y-full" : "translate-y-0"}`}
      ></div>

      {/* Content Layer */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${phase === "reveal" ? "opacity-0 scale-110" : "opacity-100 scale-100"}`}>
        
        {/* Hexagon Wrapper */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* SVG Hexagon Tracer */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full text-app-accent -rotate-90"
            style={{ filter: "drop-shadow(0 0 15px rgba(196, 129, 255, 0.4))" }}
          >
            <polygon
              points="50 5, 90 25, 90 75, 50 95, 10 75, 10 25"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="280"
              strokeDashoffset={280 - (280 * progress) / 100}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-75 ease-linear"
            />
          </svg>
          
          {/* Progress Text */}
          <div className="font-mono text-5xl font-bold text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
            {progress}<span className="text-2xl text-app-accent/80">%</span>
          </div>
        </div>

        {/* Terminal Logs (Bottom Left) */}
        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 font-mono text-[10px] md:text-xs text-app-accent/80 space-y-1">
          {logs.map((log, idx) => (
            <div key={idx} className="animate-fade-in-up">
              <span className="text-white/50">{">"}</span> {log}
            </div>
          ))}
          <div className="animate-pulse text-white">_</div>
        </div>
      </div>
    </div>
  );
}
