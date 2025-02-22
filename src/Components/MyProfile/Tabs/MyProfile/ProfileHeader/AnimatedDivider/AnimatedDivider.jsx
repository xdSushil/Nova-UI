import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

const AnimatedDivider = () => {
  // Animation Variants for the Divider
  const dividerVariants = {
    initial: { scaleX: 1 }, // Full width initially
    animate: {
      scaleX: 0.2, // Shrinks to 20% of its original width
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut", // Smooth spring-like effect
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // Center-align the divider
        my: 2,
      }}
    >
      {/* Animated Divider */}
      <motion.div
        variants={dividerVariants}
        initial="initial"
        animate="animate"
        style={{
          width: "90%", // Smaller width
          height: 2,
          backgroundColor: "#31a3a3",
          borderRadius: 10,
          originX: 0.5, // Ensures scaling happens from the center
        }}
      />
    </Box>
  );
};

export default AnimatedDivider;