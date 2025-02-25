import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

const BackgroundAnimation = () => {
  // Animation Variants for Floating Particles
  const particleVariants = {
    float: {
      x: [0, 20, 0, -20, 0], // Horizontal movement
      y: [0, -20, 0, 20, 0], // Vertical movement
      transition: {
        duration: 5, // Duration of one cycle
        repeat: Infinity, // Infinite loop
        ease: "linear", // Smooth linear motion
      },
    },
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      {/* Particle 1 */}
      <motion.div
        variants={particleVariants}
        animate="float"
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          width: "8px",
          height: "8px",
          backgroundColor: "#31a3a3",
          borderRadius: "50%",
          filter: "blur(2px)", // Soft blur effect
        }}
      />

      {/* Particle 2 */}
      <motion.div
        variants={particleVariants}
        animate="float"
        style={{
          position: "absolute",
          top: "40%",
          right: "15%",
          width: "12px",
          height: "12px",
          backgroundColor: "#31a3a3",
          borderRadius: "50%",
          filter: "blur(3px)",
        }}
      />

      {/* Particle 3 */}
      <motion.div
        variants={particleVariants}
        animate="float"
        style={{
          position: "absolute",
          bottom: "30%",
          left: "25%",
          width: "10px",
          height: "10px",
          backgroundColor: "#31a3a3",
          borderRadius: "50%",
          filter: "blur(2px)",
        }}
      />

      {/* Particle 4 */}
      <motion.div
        variants={particleVariants}
        animate="float"
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "6px",
          height: "6px",
          backgroundColor: "#31a3a3",
          borderRadius: "50%",
          filter: "blur(1px)",
        }}
      />
    </Box>
  );
};

export default BackgroundAnimation;