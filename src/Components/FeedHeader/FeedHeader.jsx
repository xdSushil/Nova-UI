import React, { useState, useEffect } from 'react';
import SearchBar from "../../Components/search/search";
import { Box, IconButton } from "@mui/material";
import CampaignIcon from '@mui/icons-material/Campaign';
import Switches from '../Switch/Switch';
import { useNavigate } from 'react-router-dom';

function FeedHeader() {
  const [scrolled, setScrolled] = useState(false); // State to track if the page is scrolled
  const navigate = useNavigate();

  // Function to handle scroll events
  const handleScroll = () => {
    if (window.scrollY > 50) { // Set scroll threshold (e.g., 50px)
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // Add scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "12vh",
        width: "100vw",
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.0015)" : "transparent", // Light transparent background to apply blur effect
        paddingTop: "1%",
        gap: "50px",
        position: "fixed", // Use fixed position for it to stay visible while scrolling
        top: 0, // Stick it to the top of the page
        left: 0,
        backdropFilter: scrolled ? "blur(10px)" : "none", // Apply blur only when scrolled
        boxShadow: scrolled ? "0px 4px 25px 15px rgba(0, 0, 0, 0.035)" : "none", // Optional shadow when scrolled
        zIndex: 1000, // Keep it on top of other content
        transition: "backdrop-filter 0.3s ease, box-shadow 0.3s ease", // Smooth transition for the blur effect and shadow
        
      }}
    >
      <Box
        sx={{
          backgroundColor: "transparent",
          width: {
            xs: "9.5vw",
            sm: "17vw",
          },
          height: "8vh",
          borderRadius: "5px",
          overflow: "hidden",
          position: "absolute",
          left: {
            sm: "9%",
            xs: "3.2%",
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          marginTop: '6px',
        }}
        onClick={() => navigate("/Home")}
      >
        <img
          src='/logo.png'
          alt='logo'
          style={{
            width: '80%',
            height: '80%',
            objectFit: 'contain',
          }}
        />
      </Box>

      <SearchBar />

      {/* Notification button */}
      <IconButton
        sx={{
          width: "5vw",
          boxShadow: "0px 4px 25px 15px #1a1919",
          marginLeft: "0px",
          backgroundColor: "#31a3a3",
          color: "#121212",
          padding: "12px",
          borderRadius: "23%",
          position: "absolute",
          right: "20%",
          "&:hover": {
            backgroundColor: "#2e8f8f",
          },
        }}
      >
        <CampaignIcon sx={{ fontSize: "2vw" }} />
      </IconButton>

      <Box sx={{
        backgroundColor: "transparent",
        position: "absolute",
        right: "5.5%",
      }}>
        <Switches />
      </Box>
    </Box>
  );
}

export default FeedHeader;
