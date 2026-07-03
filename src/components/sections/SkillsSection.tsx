import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkillCard } from "../ui/SkillCard";


import { Starfield } from "../ui/Starfield";

interface SkillsSectionProps {
  t: any;
  isAr: boolean;
}

export function SkillsSection({ t, isAr }: SkillsSectionProps) {
  const categories = t.skillCategories || [];
  const [activeTab, setActiveTab] = useState(categories[0]?.id || "mobile");

  // Find the active category data
  const activeCategory = categories.find((c: any) => c.id === activeTab);

  return (
    <section className="w-full h-screen flex flex-col items-center justify-start pt-24 lg:pt-32 pb-8 px-6 md:px-12 relative overflow-hidden pointer-events-auto z-10">
      {/* Deep Violet Opaque Background with Starfield */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#150525] via-black to-black pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-60 mix-blend-screen">
          <Starfield />
        </div>
      </div>
      
      {/* Skills UI Content (Fades out during hyperspace warp) */}
      <div 
        className="w-full flex-1 flex flex-col items-center"
        style={{ opacity: "calc(1 - var(--warp-progress, 0) * 3)" }}
      >
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-wide drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] mb-10 text-center uppercase">
          {t.skillsTitle || (isAr ? "المهارات التقنية" : "TECHNICAL SKILLS")}
        </h2>

        {/* Tabs */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-12 max-w-4xl w-full"
          role="tablist"
        >
          {categories.map((cat: any) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(cat.id)}
                className={`relative px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-bold transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-app-accent ${
                  isActive
                    ? "text-white"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                {cat.title}
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="w-full max-w-5xl flex-1 relative perspective-[1000px]">
          <AnimatePresence mode="wait">
            {activeCategory && (
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full absolute inset-0"
                role="tabpanel"
                aria-live="polite"
              >
                {activeCategory.skills.map((skill: any, idx: number) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: idx * 0.08, // Stagger effect
                      ease: "easeOut",
                    }}
                  >
                    <SkillCard skill={skill} isAr={isAr} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
