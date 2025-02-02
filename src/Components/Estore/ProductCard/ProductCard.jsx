import React from "react";
import { motion } from "framer-motion";
import { Box, Typography, Button, Avatar } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// 3D Model Component (for hover animation)
function Product3DModel() {
  const { scene } = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"); // Default 3D model (MacBook)
  return (
    <primitive object={scene} scale={1.5} position={[0, 0, 0]} />
  );
}

const ProductCard = ({ product }) => {
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
          
          position: "relative",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.5)",
          width: "300px",
          height: "400px",
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
        {/* 3D Model Viewer */}
        <Canvas
          style={{
            width: "100%",
            height: "200px",
            background: "#2a2a2a",
          }}
        >
          <ambientLight intensity={9} />
          <spotLight position={[150, 15, 15]} angle={1.3} />
          <Product3DModel />
          <OrbitControls enableZoom={false} />
        </Canvas>

        {/* Product Details */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {product.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "#aaa", mt: 1 }}>
            {product.description}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            ${product.price}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: "#f0f0f0", // Light gray
              color: "#1e1e1e", // Dark text
              "&:hover": { bgcolor: "#dcdcdc" }, // Slightly darker on hover
              textTransform: "none",
            }}
          >
            Request Estimate
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderColor: "#f0f0f0", // Light gray border
              color: "#f0f0f0", // Light gray text
              "&:hover": { borderColor: "#dcdcdc", color: "#dcdcdc" }, // Hover effect
              textTransform: "none",
            }}
          >
            Save for Later
          </Button>
        </Box>

        {/* Vendor Details */}
        <Box
          sx={{
            position: "absolute",
            bottom: "-10px",
            right: "-40px",
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "#1e1e1e",
            padding: "4px 8px",
            borderRadius: "16px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Avatar
            src="https://i.pravatar.cc/50" // Default profile picture
            sx={{ width: 24, height: 24 }}
          />
          <Typography variant="caption" sx={{ color: "#aaa" }}>
            {product.vendor.name}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

export default ProductCard;