import React from "react";
import { Dialog, DialogContent, Typography, Box, Divider, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";

const ProductDialog = ({ open, onClose, product }) => {
  if (!product) return null;

  const {
    name,
    description,
    price,
    discount,
    category,
    subcategory,
    industryKeywords,
    stockQuantity,
    sku,
    images,
    videos,
    attributes,
    vendorName,
    shippingDetails,
    warrantyInfo,
    additionalNotes,
  } = product;

  // Calculate discounted price
  const discountedPrice = discount ? price - (price * (discount / 100)) : null;

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          fullScreen
          open={open}
          onClose={onClose}
          PaperComponent={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogContent
            sx={{
              bgcolor: "#121212",
              color: "#e0e0e0",
              borderRadius: "16px",
              width: "800px",
              margin: "0 auto",
              padding: "32px",
              position: "relative",
              backdropFilter: "blur(10px)",
              mt:"12px",
            }}
          >
            {/* Close Button */}
            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 16,
                top: 16,
                color: "#999",
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Product Header */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                {name}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#aaa" }}>
                {category} {subcategory && `> ${subcategory}`}
              </Typography>
            </Box>

            {/* Product Images */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Product Images
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  overflowX: "auto",
                  "& img": {
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  },
                }}
              >
                {images?.map((image, index) => (
                  <img key={index} src={image} alt={`${name}-image-${index}`} />
                ))}
              </Box>
            </Box>

            {/* Product Videos */}
            {videos?.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Product Videos
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    overflowX: "auto",
                  }}
                >
                  {videos.map((video, index) => (
                    <video
                      key={index}
                      src={video}
                      controls
                      style={{
                        width: "200px",
                        height: "150px",
                        borderRadius: "8px",
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Pricing and Stock */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Pricing & Availability
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Rs.{discountedPrice ? discountedPrice.toFixed(2) : price.toFixed(2)}
                </Typography>
                {discount > 0 && (
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: "line-through",
                      color: "#aaa",
                    }}
                  >
                    Rs.{price.toFixed(2)}
                  </Typography>
                )}
                {discount > 0 && (
                  <Typography
                    variant="body2"
                    sx={{ color: "#4caf50", fontWeight: "bold" }}
                  >
                    {discount}% OFF
                  </Typography>
                )}
              </Box>
              <Typography variant="body2" sx={{ mt: 1 }}>
                In Stock: {stockQuantity} units available
              </Typography>
            </Box>

            {/* Attributes */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Attributes
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {attributes.color?.length > 0 && (
                  <Typography variant="body1">
                    Colors: {attributes.color.join(", ")}
                  </Typography>
                )}
                {attributes.size?.length > 0 && (
                  <Typography variant="body1">
                    Sizes: {attributes.size.join(", ")}
                  </Typography>
                )}
                {attributes.material && (
                  <Typography variant="body1">
                    Material: {attributes.material}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Shipping Details */}
            {shippingDetails && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Shipping Details
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {shippingDetails.estimatedTime && (
                    <Typography variant="body1">
                      Estimated Delivery: {shippingDetails.estimatedTime}
                    </Typography>
                  )}
                  {shippingDetails.weight && (
                    <Typography variant="body1">
                      Weight: {shippingDetails.weight} kg
                    </Typography>
                  )}
                  {shippingDetails.dimensions && (
                    <Typography variant="body1">
                      Dimensions: {shippingDetails.dimensions.length}cm x{" "}
                      {shippingDetails.dimensions.width}cm x{" "}
                      {shippingDetails.dimensions.height}cm
                    </Typography>
                  )}
                </Box>
              </Box>
            )}

            {/* Warranty and Notes */}
            <Box sx={{ mb: 4 }}>
              {warrantyInfo && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6">Warranty</Typography>
                  <Typography variant="body1">{warrantyInfo}</Typography>
                </Box>
              )}
              {additionalNotes && (
                <Box>
                  <Typography variant="h6">Additional Notes</Typography>
                  <Typography variant="body1">{additionalNotes}</Typography>
                </Box>
              )}
            </Box>

            {/* Vendor Info */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6">Vendor</Typography>
              <Typography variant="body1">{vendorName}</Typography>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ProductDialog;