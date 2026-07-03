import React from "react";
import { DecryptedProjectCard } from "../ui/DecryptedProjectCard";

interface ProjectsSectionProps {
  t: any;
  isAr: boolean;
}

export function ProjectsSection({ t, isAr }: ProjectsSectionProps) {
  const projects = t.projects || [];

  return (
    <section 
      className="w-full min-h-screen relative z-20"
      style={{
        backgroundColor: "rgba(0, 0, 0, var(--projects-bg-opacity, 1))",
        willChange: "background-color"
      }}
    >
      
      {/* Background Grid Pattern (Subtle) */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at center, rgba(167, 139, 250, 0.3) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Section Header - Only this part scales and flies in 3D! */}
        <div 
          className="h-screen w-full flex items-center justify-center text-center origin-center"
          style={{
            transform: "var(--projects-transform, scale(0))",
            opacity: "var(--projects-opacity, 0)",
            willChange: "transform, opacity"
          }}
        >
          <h2 className="font-mono text-sm md:text-base text-app-accent uppercase tracking-[0.3em] border border-app-accent/30 px-8 py-4 rounded-full bg-app-accent/5 backdrop-blur-sm shadow-[0_0_15px_rgba(167,139,250,0.2)] inline-block">
            {t.projectsHeader || "PROJECT_LOG // SYSTEM_FILES"}
          </h2>
        </div>

        {/* Projects List */}
        <div className="w-full flex flex-col px-6 md:px-12 lg:px-24 pb-32">
          {projects.map((project: any, index: number) => (
            <DecryptedProjectCard
              key={project.id || index}
              project={project}
              index={index}
              imageLeft={index % 2 === 0}
              t={t}
              isAr={isAr}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
