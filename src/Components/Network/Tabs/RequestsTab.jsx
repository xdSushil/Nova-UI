import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import RequestCard from "../RequestCard/RequestCard";

const RequestsTab = ({ user }) => {
  const [pendingConnections, setPendingConnections] = useState([]); // State to store pending connections
  const [loading, setLoading] = useState(true); // Loading state for API call

  // Fetch pending connections when the component mounts
  useEffect(() => {
    const fetchPendingConnections = async () => {
      try {
        if (!user?.id) {
          console.error("User ID is undefined. Skipping API call.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:4000/api/connections/pending/${user.id}`
        );
        setPendingConnections(response.data || []); // Store the fetched pending connections
      } catch (error) {
        console.error("Error fetching pending connections:", error);
        setPendingConnections([]); 
      } finally {
        setLoading(false); 
      }
    };

    fetchPendingConnections();
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

  // Handle the case where there are no pending connections
  if (pendingConnections.length === 0) {
    return <Box>No pending requests received</Box>;
  }

  return (
    <Box>
      {pendingConnections.map((pendingConnection)=>(
        <RequestCard
        key={pendingConnection._id}
        userData={pendingConnection.sender}
        connectionId={pendingConnection._id} 
      />
      ))}
    </Box>
  );
};

export default RequestsTab;