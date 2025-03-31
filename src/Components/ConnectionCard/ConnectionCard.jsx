import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Snackbar,
  Alert,
  Button
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import VendorProfileDialog from "../Estore/VendorProfileDialog/VendorProfileDialog";
import { AuthContext } from "../../Providers/UserContext"; // Adjust the path as needed
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";

const ConnectionCard = ({ userData, connectionStatus = "stranger" }) => {
  const [switchState, setSwitchState] = useState(connectionStatus); // states: 'stranger', 'pending', 'connected', 'declined'
  const { user } = useContext(AuthContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSwitchClick = () => {
    if (switchState === "stranger") {
      const sendConnectionRequest = async () => {
        try {
          const response = await axios.post(
            `http://localhost:4000/api/connections/send`,
            {
              senderUserId: user.id,
              receiverUserId: userData._id,
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

  useEffect(() => {
    setSwitchState(connectionStatus);
  }, [connectionStatus]);

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

  const handleProfileClick = () => {
    setIsDialogOpen(true);
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

      <Card
        sx={{
          backgroundColor: "rgba(30, 30, 30, 0.8)",
          backdropFilter: "blur(12px)",
          color: "#979da1",
          width: 900,
          height: 190,
          borderRadius: 2,
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.5)",
          padding: 3,
          overflow: "visible",
          position: "relative",
          marginBottom: "25px",
          "&:hover": {
            transform: "translateY(-10px)",
            transition: "transform 0.3s ease",
          },
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
            width: 80, // 20 * 4 = 80px
            height: 80, // 20 * 4 = 80px
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
          {/* Vendor Details */}
          <Button
                variant="outlined"
                size="small"
                sx={{
                  mt:"100px",
                  ml:"620px",
                  borderColor: "#f0f0f0", // Light gray border
                  color: "#f0f0f0", // Light gray text
                  "&:hover": { borderColor: "#dcdcdc", color: "#dcdcdc" }, // Hover effect
                  textTransform: "none",
                }}
                onClick={handleProfileClick}
              >
                View More
              </Button>
        </CardContent>
        {/* Switch in the bottom-right corner */}
        <div className="absolute bottom-4 right-4">
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
      </Card>
      {/* Profile Dialog */}
      <VendorProfileDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        vendorProfile={userData}
      />
    </>
  );
};

export default ConnectionCard;