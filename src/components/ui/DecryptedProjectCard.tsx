import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

interface Project {
  id: string;
  title: string;
  tagline: string;
  techStack: string[];
  image: string;
  githubUrl: string;
  demoUrl: string;
}

interface DecryptedProjectCardProps {
  project: Project;
  imageLeft: boolean;
  t: any;
  isAr: boolean;
  index: number;
}

const sentenceVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 1.2, // Wait for scan-line to start a bit
      staggerChildren: 0.06, // 60ms per character (slower typewriter)
    },
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function DecryptedProjectCard({
  project,
  imageLeft,
  t,
  isAr,
  index,
}: DecryptedProjectCardProps) {
  return (
    <>
      {/* Ghost snap point with 1px height to ensure browser scroll-snap engine detects it, but -mb-[1px] so it doesn't affect layout */}
      <div className="w-full h-[1px] -mb-[1px] snap-start snap-always shrink-0" aria-hidden="true" />
      
      <div
        className={`sticky top-0 w-full min-h-screen flex flex-col ${imageLeft ? "lg:flex-row" : "lg:flex-row-reverse"} items-center justify-between gap-8 lg:gap-16 py-24 md:py-32 group bg-[#050505] border-t border-app-accent/20`}
        style={{ zIndex: 10 + index }}
      >
        {/* IMAGE / SCAN EFFECT */}
      <div className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden border border-white/10 bg-app-card/60 aspect-video shadow-2xl">
        {/* Label above image */}
        <div className="absolute top-0 left-0 w-full bg-black/80 backdrop-blur-md px-4 py-2 border-b border-white/10 z-20 flex items-center justify-between">
          <span className="font-mono text-[10px] md:text-xs text-app-muted uppercase tracking-widest">
            [ENCRYPTED_FILE_{project.id}] // {project.title.toUpperCase()}.SYS
          </span>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <div className="w-2 h-2 rounded-full bg-app-accent/50" />
          </div>
        </div>

        <div className="relative w-full h-full mt-8">
          {/* Base Image (Grayscale + Blur) */}
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover filter grayscale blur-sm opacity-50"
          />

          {/* Color Image (Revealed by clipPath) */}
          <motion.img
            src={project.image}
            alt={`${project.title} full color`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.4 }}
          />

          {/* Scan Line */}
          <motion.div
            initial={{ top: "0%", opacity: 0 }}
            whileInView={{ top: "100%", opacity: [0, 1, 1, 0] }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.4 }}
            className="absolute left-0 w-full h-[2px] bg-app-accent shadow-[0_0_20px_4px_var(--color-app-accent)] z-10"
          />
        </div>
      </div>

      {/* TEXT / HUD CONTENT */}
      <div className="w-full lg:w-1/2 flex flex-col items-start gap-6">
        <motion.div
          variants={sentenceVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-4"
        >
          {/* Title */}
          <h3
            className={`text-4xl md:text-5xl font-extrabold text-white tracking-wide uppercase drop-shadow-lg ${isAr ? "font-arabic" : "font-sans"}`}
          >
            {project.title.split("").map((char, i) => (
              <motion.span key={`${char}-${i}`} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
          </h3>

          {/* Tagline */}
          <p className="text-app-fg/80 text-base md:text-lg leading-relaxed font-mono">
            {project.tagline.split("").map((char, i) => (
              <motion.span key={`${char}-${i}`} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
          </p>
        </motion.div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 mt-2">
          {project.techStack.map((tech, idx) => (
            <motion.span
              key={idx}
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 3.5 + idx * 0.15 }} // Start after slower typewriter finishes
              className="px-3 py-1 bg-app-accent/10 border border-app-accent/30 text-app-accent font-mono text-[10px] md:text-xs uppercase tracking-wider rounded-sm backdrop-blur-md"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* CTA Button */}
        <motion.a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 4.2 }}
          className="mt-6 inline-flex items-center gap-3 px-6 py-3 border border-app-accent/50 text-white font-mono text-xs uppercase tracking-[0.2em] hover:bg-app-accent/20 hover:border-app-accent transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10">
            {t.projectsAccessBtn || "ACCESS_FILE →"}
          </span>
          <div className="absolute inset-0 bg-app-accent/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </motion.a>
      </div>
    </div>
    </>
  );
}
