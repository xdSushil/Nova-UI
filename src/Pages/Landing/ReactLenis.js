import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const ReactLenis = ({ children, options }) => {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // Default smooth scrolling duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing function
      direction: "vertical", // Scroll direction
      gestureDirection: "vertical", // Gesture direction
      smoothWheel: true, // Enable smooth wheel scrolling
      ...options, // Allow overriding default options
    });

    // Update Lenis on each frame
    const update = (time) => {
      lenis.raf(time);
    };

    const raf = (time) => {
      requestAnimationFrame(update);
    };

    // Start the animation loop
    const rafId = requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [options]);

  return <>{children}</>;
};

export default ReactLenis;