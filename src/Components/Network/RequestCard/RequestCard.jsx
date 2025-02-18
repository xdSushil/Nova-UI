import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import axios from "axios";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";

const RequestCard = ({ userData, connectionId }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Message to display in Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Severity of Snackbar

  // Handle Accept Request
  const handleAccept = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/connections/accept/${connectionId}`);
      
      // Check if the response contains the expected success message
      if (response.data.message === "Connection accepted successfully.") {
        setSnackbarMessage(response.data.message);
        setSnackbarSeverity("success");
      } else {
        // Handle unexpected response
        setSnackbarMessage("Unexpected response from server. Please try again.");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      console.error("Error accepting connection:", error);
      setSnackbarMessage("Failed to accept connection. Please try again.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true); // Show Snackbar
    }
  };
  
  // Handle Decline Request
  const handleDecline = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/connections/remove/${connectionId}`);
      
      // Check if the response contains the expected success message
      if (response.data.message === "Connection removed successfully.") {
        setSnackbarMessage(response.data.message);
        setSnackbarSeverity("success");
      } else {
        // Handle unexpected response
        setSnackbarMessage("Unexpected response from server. Please try again.");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      console.error("Error declining connection:", error);
      setSnackbarMessage("Failed to decline connection. Please try again.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true); // Show Snackbar
    }
  };

  // Close Snackbar
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
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

      {/* Card */}
      <Card
        sx={{
          backgroundColor: "#242729",
          color: "#979da1",
          width: 900,
          height: 190,
          borderRadius: 2,
          boxShadow: 3,
          padding: 3,
          overflow: "visible",
          position: "relative",
          marginBottom: "25px",
        }}
      >
        {/* Profile Picture in the top-right corner */}
        <Avatar
          alt="Profile Picture"
          src="/profilepic.png"
          sx={{
            position: "absolute",
            top: 56,
            left: -40,
            width: 80,
            height: 80,
            border: "2px solid",
            borderColor: "gray",
            zIndex: 10,
          }}
        />

        <CardContent sx={{ width: "100%" }}>
          {/* Company Name on the left */}
          <Typography
            sx={{
              position: "absolute",
              top: "19.8%",
              left: 120,
              fontSize: "1.125rem",
              fontWeight: "600",
              color: "gray.300",
            }}
          >
            {userData?.companyName || "Unknown Company"}
          </Typography>

          {/* Address just to the right of the company name */}
          <Typography
            sx={{
              position: "absolute",
              left: "52%",
              transform: "translateX(-50%)",
              fontSize: "0.875rem",
              color: "gray.300",
            }}
          >
            {userData?.address || "No address provided"}
          </Typography>

          {/* Industry on the far right */}
          <Typography
            sx={{
              position: "absolute",
              right: 20,
              fontSize: "0.875rem",
              color: "gray.300",
            }}
          >
            Industry: {userData?.companyIndustry || "Not specified"}
          </Typography>

          {/* Product Types below the description */}
          <Typography
            sx={{
              position: "absolute",
              bottom: "10%",
              left: 120,
              fontSize: "0.875rem",
              color: "gray.300",
            }}
          >
            Supplies: {userData?.productTypes || "Not specified"}
          </Typography>
        </CardContent>

        {/* Buttons in the bottom-right corner */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            display: "flex",
            gap: 8,
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={handleAccept}
            sx={{ textTransform: "none" }}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDecline}
            sx={{ textTransform: "none" }}
          >
            Decline
          </Button>
        </div>
      </Card>
    </>
  );
};

export default RequestCard;