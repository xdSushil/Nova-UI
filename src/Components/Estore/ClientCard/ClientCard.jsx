import React from "react";
import { motion } from "framer-motion";
import { Box, Typography, Button, Avatar } from "@mui/material";

const ClientCard = ({ client }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Box
        sx={{
          bgcolor: "#1e1e1e",
          color: "#fff",
          borderRadius: "16px",
          overflow: "hidden",
          position: "relative",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.5)",
          width: "300px",
          height: "350px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          "&:hover": {
            transform: "translateY(-10px)",
            transition: "transform 0.3s ease",
          },
        }}
      >
        {/* Client Details */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {client.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "#aaa", mt: 1 }}>
            Email: {client.email}
          </Typography>
          <Typography variant="body2" sx={{ color: "#aaa", mt: 1 }}>
            Phone: {client.phone}
          </Typography>
        </Box>

        {/* Requirements */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Requirements:
          </Typography>
          <Typography variant="body2" sx={{ color: "#aaa", mt: 1 }}>
            {client.requirements}
          </Typography>
        </Box>

        {/* Action Button */}
        <Button
          variant="contained"
          size="small"
          sx={{
            bgcolor: "#f0f0f0", // Light gray
            color: "#1e1e1e", // Dark text
            "&:hover": { bgcolor: "#dcdcdc" }, // Slightly darker on hover
            textTransform: "none",
            mt: 2,
          }}
        >
          Connect & Create Budget
        </Button>
      </Box>
    </motion.div>
  );
};

export default ClientCard;