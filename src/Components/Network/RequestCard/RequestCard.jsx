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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isAccepted, setIsAccepted] = useState(false); // State to track acceptance
  const [isDeclined, setIsDeclined] = useState(false); // State to track decline

  const handleAccept = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/connections/accept/${connectionId}`
      );

      if (response.data.message === "Connection accepted successfully.") {
        setSnackbarMessage(response.data.message);
        setSnackbarSeverity("success");
        setIsAccepted(true); // Trigger animation for acceptance
      } else {
        setSnackbarMessage("Unexpected response from server. Please try again.");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      console.error("Error accepting connection:", error);
      setSnackbarMessage("Failed to accept connection. Please try again.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleDecline = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/connections/remove/${connectionId}`
      );

      if (response.data.message === "Connection removed successfully.") {
        setSnackbarMessage(response.data.message);
        setSnackbarSeverity("success");
        setIsDeclined(true); // Trigger animation for decline
      } else {
        setSnackbarMessage("Unexpected response from server. Please try again.");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      console.error("Error declining connection:", error);
      setSnackbarMessage("Failed to decline connection. Please try again.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

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
            <BusinessIcon />
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
            <LocationOnIcon />
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
            <InventoryIcon />
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
            <CategoryIcon />
            Supplies: {userData?.productTypes || "Not specified"}
          </Typography>
        </CardContent>

        {/* Yin-Yang Buttons */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            display: "flex",
            gap: isAccepted ? 0 : 8, // Join the symbols when accepted
            transition: "gap 0.5s ease-in-out",
          }}
        >
          {/* Yin Symbol */}
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              backgroundColor: "green",
              position: "relative",
              cursor: "pointer",
              opacity: isDeclined ? 0 : 1, // Fade out on decline
              transition: "opacity 0.5s ease-in-out",
            }}
            onClick={handleAccept}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "white",
              }}
            ></div>
          </div>

          {/* Yang Symbol */}
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              backgroundColor: "red",
              position: "relative",
              cursor: "pointer",
              opacity: isDeclined ? 0 : 1, // Fade out on decline
              transition: "opacity 0.5s ease-in-out",
            }}
            onClick={handleDecline}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "black",
              }}
            ></div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default RequestCard;