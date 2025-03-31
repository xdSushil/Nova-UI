import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

const ChatHeader = ({ ConnectionName, ConnectionAvatar }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar src={ConnectionAvatar} alt={ConnectionName} />
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#e0e0e0" }}>
          {ConnectionName}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatHeader;