import React, { useState, useEffect, useContext } from "react";
import {
  Dialog, DialogContent, IconButton, Typography,
  Divider, Grid, Skeleton, Box, Snackbar,
  Alert
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import ProductCard from "./ProductCard/ProductCard";
import { AuthContext } from "../../../Providers/UserContext";

const VendorProfileDialog = ({ open, onClose, vendorProfile }) => {
  const [products, setProducts] = useState([]);
  const [switchState, setSwitchState] = useState("");
  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!vendorProfile || !open) return;
    const fetchUserProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/products/vendor/${vendorProfile._id}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchUserProducts();
  }, [vendorProfile, open]);


  const fetchConnectionStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/connections/status/${user.id}/${vendorProfile._id}`
      );
      if (response.data.message === "No connection found") {
        setSwitchState("stranger");
      } else {
        const status = response.data.status; // Extract the status from the response
        setSwitchState(status); // Update the connection status state
      }

    } catch (error) {
      console.error("Error fetching connection status:", error);
      setSwitchState("stranger"); // Handle errors gracefully
    }
  };

  useEffect(() => {
    if (!vendorProfile || !open) return;
    fetchConnectionStatus();
  });

  const handleSwitchClick = () => {
    if (switchState === "stranger") {
      const sendConnectionRequest = async () => {
        try {
          const response = await axios.post(
            `http://localhost:4000/api/connections/send`,
            {
              senderUserId: user.id,
              receiverUserId: vendorProfile._id,
              status: "pending",
            }
          );
          setSwitchState("pending");
          setSnackbarMessage("Connection request sent successfully!");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
        } catch (error) {
          console.error("Error sending connection request:", error);
          setSwitchState("stranger");
          setSnackbarMessage("Failed to send connection request. Try again.");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        }
      };
      sendConnectionRequest();
    }
  };

  const getSwitchStyle = () => {
    switch (switchState) {
      case "stranger":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
      case "connected":
        return "bg-green-500";
      case "declined":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  // Snackbar close handler
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  return (
    <AnimatePresence>
      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
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
          <DialogContent sx={{
            bgcolor: "rgba(18, 18, 18, 0.8)",
            color: "#e0e0e0",
            borderRadius: "16px",
            maxWidth: "800px",
            margin: "25px auto",
            padding: "32px",
            position: "relative",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          }}>
            {/* Close Button */}
            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 16,
                top: 16,
                color: "#999"
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Loading State */}
            {!vendorProfile ? (
              <Grid container spacing={4}>
                {[...Array(6)].map((_, i) => (
                  <Grid item xs={12} md={6} key={i}>
                    <Skeleton variant="text" height={40} />
                    <Skeleton variant="text" height={24} />
                    <Skeleton variant="text" height={24} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {/* Switch in the bottom-right corner */}
                <div className="absolute top-4 right-24">
                  <label className="mb-2 text-sm font-semibold block text-center">
                    {switchState === "stranger" && "Connect"}
                    {switchState === "pending" && "Pending"}
                    {switchState === "connected" && "Connected"}
                  </label>
                  <motion.div
                    className={`w-24 h-8 rounded-full flex items-center ${getSwitchStyle()} p-1`}
                    layout
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <motion.div
                      className="w-6 h-6 bg-gray rounded-full shadow-md cursor-pointer"
                      layout
                      onClick={handleSwitchClick}
                      initial={false}
                      animate={{
                        x:
                          switchState === "stranger"
                            ? 0
                            : switchState === "pending"
                              ? 33
                              : 62,
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      style={{
                        pointerEvents:
                          switchState === "pending" || switchState === "connected"
                            ? "none"
                            : "auto",
                      }}
                    ></motion.div>
                  </motion.div>
                </div>

                <Grid container spacing={4}>
                  {/* Company Info */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="h4" sx={{ mb: 3 }}>
                      {vendorProfile.companyName}
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" color="text.secondary">
                        Industry
                      </Typography>
                      <Typography variant="body1">
                        {vendorProfile.companyIndustry || 'N/A'}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" color="text.secondary">
                        Company Size
                      </Typography>
                      <Typography variant="body1">
                        {vendorProfile.companySize || 'N/A'}
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Operations */}
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 2, mt: 8 }}>
                      <Typography variant="subtitle1" color="text.secondary">
                        Address
                      </Typography>
                      <Typography variant="body1">
                        {vendorProfile.address || 'N/A'}
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Product & Supply */}
                  <Grid item xs={12}>
                    <Divider sx={{ mb: 5, bgcolor: "#333" }} />

                    <Typography variant="h6" sx={{ mb: 3 }}>
                      Product & Supply
                    </Typography>

                    <Grid container spacing={4}>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 4 }}>
                          <Typography variant="subtitle1" color="text.secondary">
                            Product Types
                          </Typography>
                          <Typography variant="body1">
                            {vendorProfile.productTypes || 'N/A'}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider sx={{ mb: 5, bgcolor: "#333" }} />
                <Typography variant="h6" sx={{ mb: 3 }}>
                  Products From {vendorProfile.companyName}
                </Typography>
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 0.95 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }} // Staggered animation
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default VendorProfileDialog;