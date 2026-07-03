import React, { useEffect, useRef } from "react";

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars: { x: number; y: number; z: number; size: number; alpha: number }[] = [];
    // Reduced from 400 to 150 for a lighter, faster feel
    const numStars = 150;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * 1000,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
      });
    }

    let animationFrameId: number;

    const draw = () => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      stars.forEach((star) => {
        // Read warp progress from document
        const warpProgressStr = document.documentElement.style.getPropertyValue('--warp-progress');
        const warpProgress = warpProgressStr ? parseFloat(warpProgressStr) : 0;
        
        // Base speed is 1.5, hyperspace speed is up to 150!
        const speed = 1.5 + warpProgress * 150;
        
        // Move stars closer (z decreases)
        const oldZ = star.z;
        star.z -= speed;
        if (star.z <= 0) {
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
          star.z = 1000;
        }

        // Perspective projection
        const scale = 500 / star.z;
        const px = cx + star.x * scale;
        const py = cy + star.y * scale;
        
        // If warp is active, draw lines (trails)
        if (warpProgress > 0.01) {
          const oldScale = 500 / Math.max(1, oldZ);
          const oldPx = cx + star.x * oldScale;
          const oldPy = cy + star.y * oldScale;
          
          if (px >= 0 && px <= width && py >= 0 && py <= height) {
            ctx.beginPath();
            ctx.moveTo(oldPx, oldPy);
            ctx.lineTo(px, py);
            ctx.strokeStyle = `rgba(167, 139, 250, ${Math.min(1, star.alpha + warpProgress)})`; // Purple hyperdrive
            ctx.lineWidth = star.size * scale;
            ctx.lineCap = "round";
            ctx.stroke();
          }
        } else {
          // Normal stars
          if (px >= 0 && px <= width && py >= 0 && py <= height) {
            ctx.beginPath();
            ctx.arc(px, py, star.size * scale, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block opacity-70"
    />
  );
}
