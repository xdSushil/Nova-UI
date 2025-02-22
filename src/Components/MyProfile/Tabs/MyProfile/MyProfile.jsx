import React, { useEffect, useState, useContext } from "react";
import { Container, Box } from "@mui/material";
import { AuthContext } from "../../../../Providers/UserContext";
import axios from "axios";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import EmployeeSection from "./EmployeeSection/EmployeeSection";
import ProductDetails from "./ProductDetails/ProductDetails";
import { motion } from "framer-motion";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [currentUser, setUser] = useState(null);

  useEffect(() => {
    const fetchConnectionStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/users/currentUser/${user.id}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchConnectionStatus();
  }, []);

  if (!currentUser) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          Loading Profile...
        </motion.div>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        {/* Large Circle */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          style={{
            position: "absolute",
            top: "10%",
            left: "-5%",
            width: "50%",
            height: "50%",
            borderRadius: "50%",
            background: "#31a3a3",
            filter: "blur(30px)", // Add blur effect for a glow-like appearance
          }}
        />
        {/* Small Circle */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          style={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: "30%",
            height: "30%",
            borderRadius: "50%",
            background: "#31a3a3",
            filter: "blur(20px)", // Add blur effect for a glow-like appearance
          }}
        />
      </Box>
      <Container sx={{ marginTop: "-10px", 
        backgroundColor: "transaparent",
        marginLeft:"0px",
        display:"flex",
        flexDirection:"column",
        gap:0,
        color:"#bdbbbb"
        }}>
        {/* Profile Header */}
        <ProfileHeader currentUser={currentUser}/>

        {/* Personal & Company Info */}
        <PersonalInfo currentUser={currentUser} />

        {/* Employees Section */}
        <EmployeeSection currentUser={currentUser} />

        {/* Product & Supplier Details */}
        <ProductDetails currentUser={currentUser} />
      </Container>
    </>
  );
};

export default MyProfile;