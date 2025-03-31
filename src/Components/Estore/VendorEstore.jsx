import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard/ProductCard";
import { motion } from "framer-motion";
import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import User from "../../Pages/UserLayout/User";
import axios from "axios";
import ClientAddDialog from "./ClientAdd/ClientAddDialog";

const VendorEstore = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:4000/api/products");
      setProducts(response.data);
    }
    fetchProducts();
  }, []);
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh", // Full viewport height
        bgcolor: "#121212", // Dark background
        color: "#fff",
        padding: 4,
        width: "100%", // Use full width
        boxSizing: "border-box",
      }}
    >

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          justifyContent: "center",
          paddingTop: "100px",
          padding: "24px",
          minHeight: "100vh",
          margin: "100px",
          marginLeft: "200px",
          backgroundColor: "transparent",
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
      {/* Floating Action Button */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 80,
          zIndex: 1000,
          backgroundColor: "transparent",
        }}
      >
        <Fab
          sx={{
            backgroundColor: "#31a3a3",
            "&:hover": {
              backgroundColor: "#2e8f8f",
            },
          }}
          aria-label="add"
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
      </Box>

      {/* Product Form Dialog */}
      <ClientAddDialog open={open} onClose={handleClose} />
    </Box>


  );
};

export default VendorEstore;