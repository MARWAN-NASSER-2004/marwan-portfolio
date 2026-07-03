import React from "react";
import { motion } from "framer-motion";
import { IconMap } from "./IconMap";

interface SkillCardProps {
  skill: {
    name: string;
    icon: string;
    level: number;
    projects: string[];
  };
  isAr: boolean;
}

export function SkillCard({ skill, isAr }: SkillCardProps) {
  // Dynamically load the icon from IconMap
  let Icon = IconMap[skill.icon];
  if (!Icon) Icon = IconMap.FaCode; // Fallback icon

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative z-10 flex flex-col items-center justify-center p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md hover:border-app-accent/50 hover:bg-white/10 hover:z-50 transition-colors cursor-default"
    >
      {/* Background Hexagon Motif (Subtle) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-app-accent" fill="currentColor">
          <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 w-full">
        <Icon className="w-10 h-10 text-white/80 group-hover:text-app-accent transition-colors duration-300" />
        
        <h3 className="text-sm md:text-base font-bold text-white text-center">
          {skill.name}
        </h3>

        {/* Proficiency Indicator (Dots) */}
        <div className="flex gap-1.5 mt-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`w-1.5 h-1.5 rounded-full ${
                level <= skill.level 
                  ? "bg-app-accent shadow-[0_0_8px_var(--color-app-accent)]" 
                  : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Tooltip for Projects */}
      {skill.projects && skill.projects.length > 0 && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 p-3 rounded-xl bg-neutral-900/95 backdrop-blur-md border border-white/10 shadow-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-50 pointer-events-none flex flex-col gap-1">
          <span className="text-[10px] text-app-muted uppercase tracking-wider font-bold mb-1">
            {isAr ? "استُخدم في:" : "Used in:"}
          </span>
          {skill.projects.map((proj, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-white/90">
              <div className="w-1 h-1 rounded-full bg-app-accent" />
              {proj}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
