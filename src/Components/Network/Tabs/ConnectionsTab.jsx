import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import ConnectionCard from "../../ConnectionCard/ConnectionCard";

const ConnectionsTab = ({ users, user }) => {
  const [connections, setConnections] = useState([]); // State to store fetched connections
  const [loading, setLoading] = useState(true); // Loading state for API call

  // Fetch accepted connections when the component mounts
  useEffect(() => {
    const fetchAcceptedConnections = async () => {
      try {
        if (!user?.id) {
          console.error("User ID is undefined. Skipping API call.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:4000/api/connections/accepted/${user.id}`
        );
        setConnections(response.data.data || []); // Store the fetched connections
      } catch (error) {
        console.error("Error fetching accepted connections:", error);
        setConnections([]); // Fallback to an empty array
      } finally {
        setLoading(false); // Stop loading after the API call
      }
    };

    fetchAcceptedConnections();
  }, [user?.id]); // Re-run the effect if the user ID changes

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

  // Handle the case where there are no connections
  if (connections.length === 0) {
    return (
      <Box>
        Uff, seems empty here! 😕 Start making connections now and grow your network! 🌟
      </Box>
    );
  }

  // Filter users where the connection status is "connected"
  const filteredUsers = users.filter((userData) => {
    const connection = connections.find(
      (conn) =>
        ((conn.senderUserId === user?.id && conn.receiverUserId === userData._id) ||
         (conn.receiverUserId === user?.id && conn.senderUserId === userData._id)) &&
        conn.status === "connected"
    );
    return !!connection; // Show users with accepted connections
  });

  return (
    <Box>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((userData) => {
          const connection = connections.find(
            (conn) =>
              ((conn.senderUserId === user?.id && conn.receiverUserId === userData._id) ||
               (conn.receiverUserId === user?.id && conn.senderUserId === userData._id)) &&
              conn.status === "connected"
          );
          return (
            <ConnectionCard
              key={userData._id}
              userData={userData}
              connectionStatus={connection.status}
            />
          );
        })
      ) : (
        <Box>Uff, seems empty here! 😕 Start making connections now and grow your network! 🌟</Box>
      )}
    </Box>
  );
};

export default ConnectionsTab;