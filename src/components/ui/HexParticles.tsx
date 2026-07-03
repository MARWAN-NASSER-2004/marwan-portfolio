import React, { useMemo } from "react";
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaDocker, FaAws, FaFigma } from "react-icons/fa";
import { SiFlutter, SiDotnet, SiTypescript, SiJavascript, SiNextdotjs, SiTailwindcss, SiPostgresql, SiVercel, SiPython, SiCplusplus } from "react-icons/si";

const ICONS = [
  FaReact, SiFlutter, SiDotnet, SiTypescript, SiJavascript,
  FaHtml5, FaCss3Alt, FaNodeJs, FaDocker, FaAws, FaFigma,
  SiNextdotjs, SiTailwindcss, SiPostgresql, SiVercel, SiPython, SiCplusplus
];

export function HexParticles() {
  const particles = useMemo(() => {
    // Generate 65 floating icons
    return Array.from({ length: 65 }).map((_, i) => {
      const Icon = ICONS[Math.floor(Math.random() * ICONS.length)];
      // Randomize position, size, opacity, and parallax speed
      const size = Math.random() * 30 + 15; // 15px to 45px
      const top = Math.random() * 100; // 0 to 100%
      const left = Math.random() * 100; // 0 to 100%
      const opacity = Math.random() * 0.15 + 0.05; // 0.05 to 0.20
      
      // Floating animation delay and duration
      const animDuration = Math.random() * 10 + 10; // 10s to 20s
      const animDelay = Math.random() * -20; // Start at random point
      
      // Parallax intensity
      const parallaxFactor = (Math.random() - 0.5) * 0.06; 

      return {
        id: i,
        Icon,
        size,
        top,
        left,
        opacity,
        animDuration,
        animDelay,
        parallaxFactor,
      };
    });
  }, []);

  const renderParticles = (isBright: boolean) => (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: isBright ? 1 : p.opacity,
            // Mouse Parallax Effect using the CSS vars from useScrollSequence
            transform: `translate(calc(var(--mouse-x, 50vw) * ${p.parallaxFactor}), calc(var(--mouse-y, 50vh) * ${p.parallaxFactor}))`,
            transition: "transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {/* Infinite Float Animation Wrapper */}
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              animation: `float-particle ${p.animDuration}s ease-in-out ${p.animDelay}s infinite`,
            }}
          >
            <p.Icon 
              className={`w-full h-full ${isBright ? "text-app-accent drop-shadow-[0_0_10px_rgba(196,129,255,0.8)]" : "text-white"}`}
            />
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Bright Hover Layer (Masked by Mouse) */}
      <div 
        className="absolute inset-0"
        style={{
          WebkitMaskImage: "radial-gradient(circle 180px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 0%, transparent 100%)",
          maskImage: "radial-gradient(circle 180px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 0%, transparent 100%)",
        }}
      >
        {renderParticles(true)}
      </div>
    </div>
  );
}
