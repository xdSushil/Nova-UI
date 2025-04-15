import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import ConnectionCard from "../../ConnectionCard/ConnectionCard";

const SentTab = ({ user }) => {
  const [sentConnections, setSentConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSentConnections = async () => {
      try {
        if (!user?.id) {
          console.error("User ID is undefined. Skipping API call.");
          setLoading(false);
          return;
        }

        // Fetch sent connections from the backend
        const response = await axios.get(
          `http://localhost:4000/api/connections/sent/${user.id}`
        );

        // Log the response for debugging
        console.log("API Response:", response.data);

        // Set the fetched connections
        setSentConnections(response.data || []);
      } catch (error) {
        console.error("Error fetching sent connections:", error);
        setSentConnections([]);
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchSentConnections();
  }, [user?.id]);

  // Show a loading spinner while fetching data
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

  // Handle the case where there are no sent connections
  if (sentConnections.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6">No requests sent.</Typography>
        <Typography variant="body1">
          Start connecting with others!
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Render a ConnectionCard for each sent connection */}
      {sentConnections.map((sentConnection) => (
        <ConnectionCard
          key={sentConnection._id}
          userData={sentConnection.receiver || {}} // Ensure receiver exists
          connectionStatus={sentConnection.status}
        />
      ))}
    </Box>
  );
};

export default SentTab;