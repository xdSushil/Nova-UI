import React from 'react'
import SearchBar from "../../Components/search/search";
import { Box, IconButton } from "@mui/material";
import CampaignIcon from '@mui/icons-material/Campaign';
import Switches from '../Switch/Switch';
function FeedHeader() {
  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "12vh",
      width: "100vw",
      backgroundColor: "transparent",
      paddingTop: "1%",
      gap: "50px"

    }}>
      <Box
        sx={{
          backgroundColor: "transparent",
          width: {
            xs: "9.5vw",
            sm: "14vw"

          },
          height: "6vh",
          borderRadius: "5px",
          overflow: "hidden",
          position: "absolute",

          left:
          {
            sm: "12%",
            xs: "3.2%",

          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          marginTop:'6px'
        }}>
        <img src='/logo.png' alt='profile'
          style={{
            width: '80%',
            height: '80%',
            objectFit: '',
          }} />
      </Box>
      <SearchBar />

      {/* notification button */}
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
        <CampaignIcon sx={{
          fontSize: "2vw"
        }} />
      </IconButton>
      
      <Box sx={{
        backgroundColor:"transparent",
        position:"absolute",
        right:"5.5%"
      }}>
        <Switches />
      </Box>

    </Box>
  )
}

export default FeedHeader