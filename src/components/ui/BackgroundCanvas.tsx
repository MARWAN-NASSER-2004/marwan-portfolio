import { HexParticles } from "./HexParticles";

interface BackgroundCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isScrolled: boolean;
  activeSection: number;
}

export function BackgroundCanvas({
  canvasRef,
  isScrolled,
  activeSection,
}: BackgroundCanvasProps) {
  return (
    <>
      {/* Background canvas */}
      <div className="fixed inset-0 bg-app-bg pointer-events-none z-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Floating Hexagon Particles Overlay */}
      <HexParticles />

      {/* BG.png Reveal Overlay - only covers the first 100vh */}
      <div
        className={`absolute top-0 left-0 w-full h-[100vh] pointer-events-none z-[5] bg-cover bg-center transition-opacity duration-500 ${isScrolled ? "opacity-0" : "opacity-100"}`}
        style={{
          backgroundImage: "url('/assets/BG.png')",
          maskImage:
            "radial-gradient(circle at var(--mouse-x, -999px) var(--mouse-page-y, -999px), black 118px, transparent 122px)",
          WebkitMaskImage:
            "radial-gradient(circle at var(--mouse-x, -999px) var(--mouse-page-y, -999px), black 118px, transparent 122px)",
        }}
      />
    </>
  );
}
