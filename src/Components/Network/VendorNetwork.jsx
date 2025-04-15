import React, { useContext, useEffect, useState } from "react";
import { Box, CircularProgress, Tabs, Tab, Typography } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../Providers/UserContext";
import FindTab from "./Tabs/FindTab";
import SentTab from "./Tabs/SentTab";
import RequestsTab from "./Tabs/RequestsTab";
import ConnectionsTab from "./Tabs/ConnectionsTab";

function VendorNetwork() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(0);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Render the appropriate tab component
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <FindTab  user={user} />;
      case 1:
        return <SentTab  user={user} />;
      case 2:
        return <RequestsTab  user={user} />;
      case 3:
        return <ConnectionsTab  user={user} />;
      default:
        return <FindTab  user={user} />;
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "transparent",
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "gray",
          marginLeft: "200px",
          marginTop: "100px",
          marginBottom: "20px",
        }}
      >
        Manage Connections
      </Typography>

      {/* Tabs */}
      <Box
        sx={{
          width: "80%",
          borderBottom: 1,
          borderColor: "divider",
          marginLeft: "200px",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor=""
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="tabs"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#cbc8cf",
              height: "3px",
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#666",
              transition: "color 0.3s ease",
            },
            "& .Mui-selected": {
              color: "#cbc8cf !important",
            },
          }}
        >
          <Tab label="Find" />
          <Tab label="Sent" />
          <Tab label="Requests" />
          <Tab label="Connections" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box
        sx={{
          position: "absolute",
          left: "15%",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          width: "80%",
          marginTop: "5px",
        }}
      >
        {renderTabContent()}
      </Box>
    </Box>
  );
}

export default VendorNetwork;