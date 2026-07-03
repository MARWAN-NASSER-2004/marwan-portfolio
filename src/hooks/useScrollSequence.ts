import { useState, useEffect, useRef } from "react";

export function useScrollSequence() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const frameCount = 300;
    const currentFrame = (index: number) =>
      `/frames/frame_${String(index).padStart(3, "0")}.jpg`;

    const imageCache: Record<number, HTMLImageElement> = {};
    const imagePromises: Record<number, Promise<HTMLImageElement>> = {};

    const loadImage = (index: number): Promise<HTMLImageElement> => {
      if (imageCache[index]) return Promise.resolve(imageCache[index]);
      if (imagePromises[index]) return imagePromises[index];

      const promise = new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.src = currentFrame(index);
        img.onload = () => {
          imageCache[index] = img;
          resolve(img);
        };
      });
      imagePromises[index] = promise;
      return promise;
    };

    // Smart Background Preload (Sliding Window)
    let targetFrameIndex = 1;
    let currentRenderedFrame = 1;
    let animationFrameId: number;
    let lastDrawnFrame = 0;

    const PRELOAD_AHEAD = 80; // Fetch much further ahead for production
    const PRELOAD_BEHIND = 20;
    let isPreloading = false;

    const performSmartPreload = () => {
      if (isPreloading) return;
      isPreloading = true;

      const current = Math.round(targetFrameIndex);
      const start = Math.max(1, current - PRELOAD_BEHIND);
      const end = Math.min(frameCount, current + PRELOAD_AHEAD);

      // Fire in parallel without await (HTTP/2 multiplexing)
      for (let i = start; i <= end; i++) {
        loadImage(i);
      }
      isPreloading = false;
    };

    // Initial load
    loadImage(1).then((img) => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
      performSmartPreload();
    });

    // Cube Transition Variables
    let targetCubeProgress = 0;
    let currentCubeProgress = 0;

    // Warp Transition Variables
    let targetWarpProgress = 0;
    let currentWarpProgress = 0;

    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      setIsScrolled(scrollTop > 10);

      const vh = window.innerHeight;
      let active = 0;
      if (scrollTop > vh * 0.15) active = 1;
      if (scrollTop > vh * 1.1) active = 2;
      if (scrollTop > vh * 1.9) active = 3;
      if (scrollTop > vh * 2.9) active = 4; // Projects section
      setActiveSection(active);

      // Cube rotation math
      const cubeStart = vh * 1.4; // Start rotating after Vision section
      const cubeEnd = vh * 2.1; // End rotating at the new section
      let progress = 0;
      if (scrollTop > cubeStart) {
        progress = Math.min(1, (scrollTop - cubeStart) / (cubeEnd - cubeStart));
      }
      targetCubeProgress = progress;

      // The 3D Scene remains completely fixed.

      // Hardcode the original max scroll top (110vh) so the eye frames are completely unaffected by any new sections (Skills, Projects, etc) added to the bottom of the page.
      const oldMaxScrollTop = vh * 1.1;

      // Calculate where the animation SHOULD be based on scroll position (Cap at 0.8 to keep eye static during cube rotation)
      const scrollFraction = oldMaxScrollTop > 0 ? scrollTop / oldMaxScrollTop : 0;
      targetFrameIndex = Math.min(
        frameCount,
        Math.max(1, Math.ceil(Math.min(scrollFraction, 0.8) * frameCount))
      );

      // We no longer dynamically toggle scroll-snap. It remains 'y mandatory' globally via CSS.

      // Calculate Warp Progress (from 210vh to 410vh)
      const warpStart = vh * 2.1;
      const warpEnd = vh * 3.1;
      if (scrollTop > warpStart) {
        targetWarpProgress = Math.min(1, (scrollTop - warpStart) / (warpEnd - warpStart));
      } else {
        targetWarpProgress = 0;
      }
    };

    let requestCounter = 0;
    let latestDrawnRequest = 0;

    const renderLoop = () => {
      // Lerp (linear interpolate) the current frame towards the target frame
      currentRenderedFrame += (targetFrameIndex - currentRenderedFrame) * 0.04;

      const frameToDraw = Math.round(currentRenderedFrame);

      // Only draw to canvas if the integer frame has changed
      if (
        frameToDraw !== lastDrawnFrame &&
        frameToDraw >= 1 &&
        frameToDraw <= frameCount
      ) {
        lastDrawnFrame = frameToDraw;
        
        const myRequest = ++requestCounter;
        loadImage(frameToDraw).then((img) => {
          // Prevent out-of-order frames from drawing over newer frames
          if (myRequest > latestDrawnRequest) {
            latestDrawnRequest = myRequest;
            context.drawImage(img, 0, 0);
          }
        });
        
        // Trigger preload for the new window
        performSmartPreload();
      }

      // Lerp Cube Progress
      currentCubeProgress += (targetCubeProgress - currentCubeProgress) * 0.06;
      // Cube Hyperspace Fly-by!
      // If warp Progress > 0, the cube flies past the camera (scale up, translate Z, fade out)
      if (cubeRef.current) {
        const rotateY = currentCubeProgress * -90;
        let scale = 1 - Math.sin(currentCubeProgress * Math.PI) * 0.3;
        let translateZ = -50; // -50vw default
        if (currentWarpProgress > 0) {
          // As warp progress goes from 0 to 1, the cube accelerates towards the camera!
          translateZ = -50 + Math.pow(currentWarpProgress, 3) * 100; // Flies forward but doesn't clip!
        }

        cubeRef.current.style.transform = `translateZ(${translateZ}vw) scale(${scale}) rotateY(${rotateY}deg)`;
        // MUST NOT APPLY OPACITY TO CUBE (Breaks preserve-3d in WebKit)
        cubeRef.current.style.opacity = '1';
      }

      // Lerp Warp Progress
      currentWarpProgress += (targetWarpProgress - currentWarpProgress) * 0.05;
      if (Math.abs(targetWarpProgress - currentWarpProgress) < 0.005) {
        currentWarpProgress = targetWarpProgress;
      }
      document.documentElement.style.setProperty('--warp-progress', currentWarpProgress.toString());

      // Projects Section Approach
      const vh = window.innerHeight;
      const warpEnd = vh * 3.1;
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      
      if (currentWarpProgress > 0 && currentWarpProgress < 0.999) {
         // It's approaching!
         const scale = Math.max(0, Math.pow(currentWarpProgress, 4));
         const rotateX = (1 - Math.pow(currentWarpProgress, 2)) * 60; 
         const opacity = Math.min(1, currentWarpProgress * 10);
         const bgOpacity = Math.max(0, Math.pow(currentWarpProgress, 10));
         
         // Fixed header: No need for translateY math to follow scroll! It's naturally fixed.
         document.documentElement.style.setProperty('--projects-transform', `perspective(2000px) rotateX(${rotateX}deg) scale(${scale})`);
         document.documentElement.style.setProperty('--projects-opacity', opacity.toString());
         document.documentElement.style.setProperty('--projects-bg-opacity', bgOpacity.toString());
         document.documentElement.style.setProperty('--projects-visibility', 'visible');
      } else if (currentWarpProgress >= 0.999) {
         // Finished approaching! Now handle normal scrolling
         let finalOpacity = 1;
         let visibility = 'visible';
         
         // Fade out the header as soon as the user scrolls past the warp end point 
         if (scrollTop > warpEnd) {
            const pastWarp = scrollTop - warpEnd;
            finalOpacity = Math.max(0, 1 - (pastWarp / (vh * 0.3))); // Fade out completely within 30vh of scroll
            
            if (finalOpacity <= 0) {
               visibility = 'hidden';
            }
         }
         
         document.documentElement.style.setProperty('--projects-transform', `perspective(2000px) rotateX(0deg) scale(1)`);
         document.documentElement.style.setProperty('--projects-opacity', finalOpacity.toString());
         document.documentElement.style.setProperty('--projects-bg-opacity', `1`);
         document.documentElement.style.setProperty('--projects-visibility', visibility);
      } else {
         document.documentElement.style.setProperty('--projects-transform', `scale(0)`);
         document.documentElement.style.setProperty('--projects-opacity', `0`);
         document.documentElement.style.setProperty('--projects-bg-opacity', `0`);
         document.documentElement.style.setProperty('--projects-visibility', 'hidden');
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // Start the continuous smooth render loop
    animationFrameId = requestAnimationFrame(renderLoop);

    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
      document.documentElement.style.setProperty(
        "--mouse-page-y",
        `${e.pageY}px`
      );
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Cinematic Warp Scroll Hijacker
    // Ensures a small scroll in the Skills section instantly triggers a SLOW, CINEMATIC full warp sequence
    let isWarping = false;
    let touchStartY = 0;
    
    const executeCinematicScroll = (targetScroll: number, duration: number = 1500) => {
      if (isWarping) return;
      isWarping = true;
      
      // CRITICAL: Disable CSS scroll snap while warping so it doesn't fight the custom animation!
      document.documentElement.style.scrollSnapType = 'none';
      
      const startScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const distance = targetScroll - startScroll;
      const startTime = performance.now();

      // Custom easing function for a slow buildup, fast hyperdrive, and smooth landing!
      const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeInOutQuart(progress);

        window.scrollTo(0, startScroll + distance * easeProgress);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          isWarping = false;
          // Restore CSS scroll snap after the warp is complete
          document.documentElement.style.scrollSnapType = 'y mandatory';
        }
      };

      requestAnimationFrame(animateScroll);
    };

    const handleWheel = (e: WheelEvent) => {
      const vh = window.innerHeight;
      const warpStart = vh * 2.1;
      const warpEnd = vh * 3.1;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      
      if (e.deltaY > 0 && scrollTop >= warpStart - 10 && scrollTop < warpEnd - 10) {
        e.preventDefault();
        executeCinematicScroll(warpEnd, 2500); // 2.5 seconds to travel through hyperspace!
      } else if (e.deltaY < 0 && scrollTop <= warpEnd + 10 && scrollTop > warpStart + 10) {
        e.preventDefault();
        executeCinematicScroll(warpStart, 2000); // Slightly faster on the way back
      } else if (isWarping) {
        e.preventDefault(); // Block manual scroll wheel while warping
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isWarping) {
        e.preventDefault(); // Block touch scroll while warping
        return;
      }
      const vh = window.innerHeight;
      const warpStart = vh * 2.1;
      const warpEnd = vh * 3.1;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY; // Positive = scrolling down

      if (deltaY > 20 && scrollTop >= warpStart - 10 && scrollTop < warpEnd - 10) {
        executeCinematicScroll(warpEnd, 2500);
      } else if (deltaY < -20 && scrollTop <= warpEnd + 10 && scrollTop > warpStart + 10) {
        executeCinematicScroll(warpStart, 2000);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return { isScrolled, activeSection, canvasRef, cubeRef, sceneRef };
}
