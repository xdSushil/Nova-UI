import React from "react";
import ProductCard from "./ProductCard/ProductCard";
import { motion } from "framer-motion";
import { Box } from "@mui/material";
import User from "../../Pages/UserLayout/User";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality noise-canceling headphones.",
    price: 199.99,
    vendor: {
      name: "AudioTech",
    },
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Track your fitness and stay connected.",
    price: 249.99,
    vendor: {
      name: "TechGear",
    },
  },
  {
    id: 3,
    name: "Laptop",
    description: "Powerful laptop for work and gaming.",
    price: 1299.99,
    vendor: {
      name: "TechWorld",
    },
  },
  {
    id: 4,
    name: "Gaming Mouse",
    description: "Precision gaming mouse with customizable buttons.",
    price: 79.99,
    vendor: {
      name: "GamePro",
    },
  },
  {
    id: 5,
    name: "4K Monitor",
    description: "Ultra HD monitor for immersive viewing.",
    price: 399.99,
    vendor: {
      name: "DisplayTech",
    },
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    description: "Portable speaker with deep bass and clear sound.",
    price: 149.99,
    vendor: {
      name: "SoundWave",
    },
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    description: "Portable speaker with deep bass and clear sound.",
    price: 149.99,
    vendor: {
      name: "SoundWave",
    },
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    description: "Portable speaker with deep bass and clear sound.",
    price: 149.99,
    vendor: {
      name: "SoundWave",
    },
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    description: "Portable speaker with deep bass and clear sound.",
    price: 149.99,
    vendor: {
      name: "SoundWave",
    },
  },
];

const VendorEstore = () => {
  return (


    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)", // 1 column on small screens
          sm: "repeat(1, 1fr)", // 2 columns on medium screens
          md: "repeat(2, 1fr)", // 3 columns on larger screens
          lg: "repeat(3, 1fr)", // 4 columns on large screens
        },
        gap: "30px",
        justifyContent: "center",
        paddingTop: "100px",
        padding: "24px",
        minHeight: "100vh",
        margin:"100px",
        marginLeft:"200px",
        backgroundColor:"transparent",
      }}
    >

      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }} // Staggered animation
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </Box>


  );
};

export default VendorEstore;