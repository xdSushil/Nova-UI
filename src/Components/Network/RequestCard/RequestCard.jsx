import React, { useState } from "react";
import { Card, CardContent, Typography, Avatar, Snackbar, Alert, Box } from "@mui/material";
import axios from "axios";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Accept Icon
import CancelIcon from "@mui/icons-material/Cancel"; // Reject Icon
import { keyframes } from "@emotion/react";

// Keyframes for animations
const spin = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  100% { transform: rotate(360deg) scale(1.3); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
`;

const RequestCard = ({ userData, connectionId }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isAccepted, setIsAccepted] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);

  const handleAccept = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/connections/accept/${connectionId}`
      );

      if (response.data.message === "Connection accepted successfully.") {
        setSnackbarMessage(response.data.message);
        setSnackbarSeverity("success");
        setIsAccepted(true);
        setIsDeclined(false);
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
        setIsDeclined(true);
        setIsAccepted(false);
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
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
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
        {/* Profile Picture */}
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
          <Typography sx={{ position: "absolute", top: "19.8%", left: 120, fontSize: "1.125rem", fontWeight: "600", color: "gray.300" }}>
            <BusinessIcon /> {userData?.companyName || "Unknown Company"}
          </Typography>
          <Typography sx={{ position: "absolute", left: "52%", transform: "translateX(-50%)", fontSize: "0.875rem", color: "gray.300" }}>
            <LocationOnIcon /> {userData?.address || "No address provided"}
          </Typography>
          <Typography sx={{ position: "absolute", right: 20, fontSize: "0.875rem", color: "gray.300" }}>
            <InventoryIcon /> Industry: {userData?.companyIndustry || "Not specified"}
          </Typography>
          <Typography sx={{ position: "absolute", bottom: "10%", left: 120, fontSize: "0.875rem", color: "gray.300" }}>
            <CategoryIcon /> Supplies: {userData?.productTypes || "Not specified"}
          </Typography>
        </CardContent>

        {/* Accept/Reject Buttons with Animation */}
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Spinning Checkmark for Accepted */}
          {isAccepted ? (
            <CheckCircleIcon
              sx={{
                fontSize: 48,
                color: "#43b581",
                animation: `${spin} 0.5s ease-in-out forwards`,
              }}
            />
          ) : isDeclined ? (
            // Shaking Cross for Rejected
            <CancelIcon
              sx={{
                fontSize: 48,
                color: "#f04747",
                animation: `${shake} 0.4s ease-in-out`,
              }}
            />
          ) : (
            <>
              {/* Accept Button */}
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: "#43b581",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  "&:hover": { transform: "scale(1.1)" },
                  marginRight: 2,
                }}
                onClick={handleAccept}
              >
                <CheckCircleIcon sx={{ color: "white", fontSize: 30 }} />
              </Box>

              {/* Reject Button */}
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: "#f04747",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  "&:hover": { transform: "scale(1.1)" },
                }}
                onClick={handleDecline}
              >
                <CancelIcon sx={{ color: "white", fontSize: 30 }} />
              </Box>
            </>
          )}
        </Box>
      </Card>
    </>
  );
};

export default RequestCard;