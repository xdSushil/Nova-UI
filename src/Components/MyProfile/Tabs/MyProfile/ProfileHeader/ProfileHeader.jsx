import React from "react";
import { Typography, Divider, Box } from "@mui/material";
import AnimatedDivider from "./AnimatedDivider/AnimatedDivider";
const ProfileHeader = ({currentUser}) => {
  return (
    <Box sx={{ textAlign: "start", mt: 4 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "#31a3a3", 
          textTransform: "uppercase", 
          letterSpacing: 2,
          ml:5,
        }}
      >
        {currentUser.companyName}
      </Typography>
      <AnimatedDivider />
    </Box>
  );
};

export default ProfileHeader;