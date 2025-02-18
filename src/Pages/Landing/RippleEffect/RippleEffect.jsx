import React, { useEffect, useRef } from "react";

const RippleEffect = ({ backgroundImage }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Settings for the ripple effect
    const rippleSettings = {
      maxSize: 100,
      animationSpeed: 5,
      strength: 0.02, // Distortion strength
    };

    const canvasSettings = {
      ratio: window.devicePixelRatio || 1,
    };

    // Initialize canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * canvasSettings.ratio;
      canvas.height = window.innerHeight * canvasSettings.ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resizeCanvas();

    // Handle window resizing
    window.addEventListener("resize", resizeCanvas);

    // Load background image
    let backgroundImageLoaded = false;
    const img = new Image();
    if (backgroundImage) {
      img.src = backgroundImage;
      img.onload = () => {
        backgroundImageLoaded = true;
      };
    }

    // Ripple class definition
    class Ripple {
      constructor(x, y, circleSize) {
        this.position = { x, y };
        this.circleSize = circleSize;
        this.maxSize = rippleSettings.maxSize;
        this.opacity = 1;
        this.animationSpeed = rippleSettings.animationSpeed;
        this.opacityStep = (this.animationSpeed / (this.maxSize - circleSize)) / 2;
      }

      update() {
        this.circleSize += this.animationSpeed;
        this.opacity -= this.opacityStep;
      }
    }

    // Ripples array
    const ripples = [];

    // Create a displacement map
    const displacementMap = ctx.createImageData(canvas.width, canvas.height);

    // Function to update the displacement map
    const updateDisplacementMap = () => {
      // Clear the displacement map
      displacementMap.data.fill(0);

      ripples.forEach((ripple) => {
        const { position, circleSize, opacity } = ripple;
        const radius = circleSize;
        const intensity = opacity * rippleSettings.strength;

        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const dx = x - position.x;
            const dy = y - position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < radius) {
              const angle = Math.atan2(dy, dx);
              const displacementX = Math.cos(angle) * intensity;
              const displacementY = Math.sin(angle) * intensity;

              const index = (y * canvas.width + x) * 4;
              displacementMap.data[index] += displacementX * 255;
              displacementMap.data[index + 1] += displacementY * 255;
            }
          }
        }
      });
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (backgroundImageLoaded) {
        // Draw the background image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Update displacement map
        updateDisplacementMap();

        // Apply displacement effect
        const originalData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const distortedData = ctx.createImageData(canvas.width, canvas.height);

        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const index = (y * canvas.width + x) * 4;

            const displacementX = displacementMap.data[index] / 255;
            const displacementY = displacementMap.data[index + 1] / 255;

            const sourceX = Math.min(
              Math.max(0, Math.floor(x + displacementX * rippleSettings.strength * canvas.width)),
              canvas.width - 1
            );
            const sourceY = Math.min(
              Math.max(0, Math.floor(y + displacementY * rippleSettings.strength * canvas.height)),
              canvas.height - 1
            );

            const sourceIndex = (sourceY * canvas.width + sourceX) * 4;

            distortedData.data[index] = originalData.data[sourceIndex];
            distortedData.data[index + 1] = originalData.data[sourceIndex + 1];
            distortedData.data[index + 2] = originalData.data[sourceIndex + 2];
            distortedData.data[index + 3] = 255;
          }
        }

        ctx.putImageData(distortedData, 0, 0);
      }

      // Remove faded ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        if (ripples[i].opacity <= 0) {
          ripples.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    // Mouse move event listener
    const handleMouseMove = (e) => {
      const x = e.clientX * canvasSettings.ratio;
      const y = e.clientY * canvasSettings.ratio;
      ripples.unshift(new Ripple(x, y, 2));
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    animate();

    // Cleanup on unmount
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [backgroundImage]);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

export default RippleEffect;