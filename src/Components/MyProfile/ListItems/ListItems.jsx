import React from "react";
import { ListItemButton, ListItemText, styled } from "@mui/material";
import { motion } from "framer-motion";

// Custom Styled Components
const AnimatedUnderline = styled(motion.div)(({ theme }) => ({
  height: "2px",
  backgroundColor: "gray", // Brighter blue for the underline
  position: "absolute",
  bottom: 0,
  left: 2,
  width: 0, // Starts with no width
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  position: "relative",
  padding: "2px 12px",
  borderRadius: "4px",
  marginBottom:1,
  "&:hover": {
    backgroundColor: "rgba(128, 128, 128, 0.2)", // Very subtle hover background
  },
  "&.Mui-selected": {
    color: "#b3b3b3", // Slightly brighter gray for selected text
    backgroundColor: "rgba(128, 128, 128, 0.1)", // Semi-transparent black background
    borderRadius:"8px",
    "&:hover": {
    backgroundColor: "rgba(128, 128, 128, 0.3)", // Very subtle hover background
  },
  },
}));

const AnimatedListItem = ({ text, value, activeTab, setActiveTab }) => {
  return (
    <StyledListItemButton
      selected={activeTab === value}
      onClick={() => setActiveTab(value)}
    >
      {/* Text */}
      <ListItemText
        primary={text}
        sx={{
          "& .MuiTypography-root": {
            fontWeight: activeTab === value ? "bold" : "normal",
            fontSize:"14px"
          },
        }}
      />

      {/* Animated Underline */}
      <AnimatedUnderline
        initial={{ width: 0 }} // Starts with no width
        animate={
          activeTab === value
            ? { width: "98%" } // Full width when selected
            : { width: 0 }
        }
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </StyledListItemButton>
  );
};

export default AnimatedListItem;