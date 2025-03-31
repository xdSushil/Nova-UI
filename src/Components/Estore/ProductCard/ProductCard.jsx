import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Box, Typography, Avatar, IconButton, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import CustomCarousel from "./CustomSlider/CustomSlider1";
import VendorProfileDialog from "../VendorProfileDialog/VendorProfileDialog";
import ProductDialog from "./ProductDialog/ProductDialog";
const ProductCard = ({ product }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [vendorProfile, setVendorProfile] = useState(null);

  useEffect(() => {
    const fetchVendorProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/users/currentUser/${product.vendorId}`
        );
        setVendorProfile(response.data);
      } catch (error) {
        console.error("Error fetching vendor profile:", error);
      }
    };

    if (isDialogOpen && !vendorProfile) {
      fetchVendorProfile();
    }
  }, [isDialogOpen, product.vendorId, vendorProfile]);

  const handleProfileClick = () => {
    setIsDialogOpen(true);
  };

  const handleProductClick = () => {
    setIsProductDialogOpen(true);
  }

  return (
    <>
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
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
            justifyContent: "space-between",
            padding: "16px",
            "&:hover": {
              transform: "translateY(-10px)",
              transition: "transform 0.3s ease",
            },
          }}
        >
          {/* Product Image */}
          <CustomCarousel>
            {product.images.map((image, index) => {
              return <img key={index} src={image} alt={product.name} />;
            })}
          </CustomCarousel>
          {/* Product Details and Action Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              backgroundColor: "transparent",
              width: "65%",
              height: "263px",
              mt: "22px",
              mr: "75px"
            }}
          >
            {/* Product Details */}
            <Box sx={{
              textAlign: "start", mt: 0,
            }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {product.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa", mt: 2 }}>
                {product.description}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Rs.{product.price}
              </Typography>
              <Typography sx={{ fontSize: "13px", mt: 0, fontWeight: "light" }}>
                Discount: {product.discount? product.discount : "N/A"}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "13px", mt: 6, fontWeight: "light" }}>
              Stock Available: {product.stockQuantity}
            </Typography>
            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                mt: 1,
                mb:3,
                padding: "10px",
                ml: "-10px"
              }}
            >
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
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderColor: "#f0f0f0", // Light gray border
                  color: "#f0f0f0", // Light gray text
                  "&:hover": { borderColor: "#dcdcdc", color: "#dcdcdc" }, // Hover effect
                  textTransform: "none",
                }}
                onClick={handleProductClick}
              >
                View More
              </Button>
            </Box>
          </Box>

          {/* Vendor Details */}
          <Box
            sx={{
              position: "absolute",
              bottom: "16px",
              right: "40px",
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "#1e1e1e",
              padding: "4px 8px",
              borderRadius: "16px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
              cursor:"pointer",
            }}
            onClick={handleProfileClick}
          >
            <Avatar
              src="https://i.pravatar.cc/50" // Default profile picture
              sx={{ width: 44, height: 44 }}
            />
            <Typography variant="h6" sx={{ color: "#aaa" }}>
              {product.vendorName}
            </Typography>
            <IconButton sx={{ color: "#aaa", marginLeft: "8px" }}>
              <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
            </IconButton>
          </Box>
        </Box>
      </motion.div>
      {/* Profile Dialog */}
      <VendorProfileDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        vendorProfile={vendorProfile}
      />

      {/* Product Dialog */}
      <ProductDialog
        open={isProductDialogOpen}
        onClose={() => setIsProductDialogOpen(false)}
        product={product}
      />
    </>
  );
};

export default ProductCard;