import React from "react";
import { Typography, Box } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

const ProductDetails = ({ currentUser }) => {
  if (
    !currentUser.productTypes &&
    !currentUser.supplierIndustry &&
    !currentUser.supplyType
  )
    return null;

  return (
    <Box sx={{ mt: 3 }}>
      <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
        <ShoppingCart sx={{ color: "#31a3a3", mr: 1 }} />
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#31a3a3" }}>
          Product & Supplier Details:
        </Typography>
      </Box>
      {currentUser.productTypes && (
        <Typography variant="body1">
          <b>Product Types:</b> {currentUser.productTypes}
        </Typography>
      )}
      {currentUser.supplierIndustry && (
        <Typography variant="body1">
          <b>Supplier Industry:</b> {currentUser.supplierIndustry}
        </Typography>
      )}
      {currentUser.supplyType && (
        <Typography variant="body1">
          <b>Supply Type:</b> {currentUser.supplyType}
        </Typography>
      )}
    </Box>
  );
};

export default ProductDetails;