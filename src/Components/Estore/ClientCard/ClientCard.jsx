import React from "react";
import { motion } from "framer-motion";
import { Box, Typography, Button, Avatar } from "@mui/material";
import CustomCarousel from "./CustomSlider/CustomSlider2";
const ClientCard = ({ request }) => {
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
          height: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px",
          "&:hover": {
            transform: "translateY(-10px)",
            transition: "transform 0.3s ease",
          },
        }}
      >
        {/* Client Details */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {request.client_name}
          </Typography>
          <Typography variant="body2" sx={{ color: "#aaa", mt: 1 }}>
            Supply Industry: {request.supply_industry}
          </Typography>
          <Typography variant="body2" sx={{ color: "#aaa", mt: 1 }}>
            Budget: Rs.{request.budget}
          </Typography>
        </Box>

        {/* Requirements */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Requirements:
          </Typography>
          <Typography variant="body2" sx={{ color: "#aaa", mt: 1 }}>
            {request.request}
          </Typography>
          
          {/* Product Image */}
          <CustomCarousel>
            {request.images.map((image, index) => {
              return <img key={index} src={image} alt="requestImage" />;
            })}
          </CustomCarousel>
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