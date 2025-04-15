import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import ConnectionCard from "../../ConnectionCard/ConnectionCard";

const ConnectionsTab = ({ user }) => {
  const [connections, setConnections] = useState([]); 
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const fetchAcceptedConnections = async () => {
      try {
        if (!user?.id) {
          console.error("User ID is undefined. Skipping API call.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:4000/api/users/connections/${user.id}`
        );
        setConnections(response.data || []); 
      } catch (error) {
        console.error("Error fetching accepted connections:", error);
        setConnections([]); 
      } finally {
        setLoading(false); 
      }
    };

    fetchAcceptedConnections();
  }, [user?.id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (connections.length === 0) {
    return (
      <Box>
        Uff, seems empty here! 😕 Start making connections now and grow your network! 🌟
      </Box>
    );
  }

  return (
    <Box>
      {/* Render a ConnectionCard for each connection */}
      {connections.map((connection) => (  
        <ConnectionCard
          key={connection._id} 
          userData={connection} 
          connectionStatus="connected" 
        />
      ))}
    </Box>
  );
};

export default ConnectionsTab;