import React, { useState, useEffect, useContext } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { AuthContext } from "../../Providers/UserContext"; // Adjust the path as needed
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConnectionCard = ({ userData, connectionStatus = "stranger" }) => {
  const [switchState, setSwitchState] = useState(connectionStatus); // states: 'stranger', 'pending', 'connected', 'declined'
  const { user } = useContext(AuthContext);
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
          toast.success("Connection request sent successfully!");
        } catch (error) {
          console.error("Error sending connection request:", error);
          setSwitchState("stranger");
          toast.error("Failed to send connection request. Try again.");
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

  return (
    <>
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          backgroundColor: "#1a1d21",
          color: "#d1d5db",
          border: "1px solid #2a2e35",
          borderRadius: "8px",
        }}
        progressStyle={{ backgroundColor: "#0077b6" }}
      />

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
    </>
  );
};

export default ConnectionCard;
