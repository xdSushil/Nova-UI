import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import ConnectionCard from "../../ConnectionCard/ConnectionCard";

const SentTab = ({ users, user }) => {
  const [sentConnections, setSentConnections] = useState([]); // State to store fetched sent connections
  const [loading, setLoading] = useState(true); // Loading state for API call

  // Fetch sent connections when the component mounts
  useEffect(() => {
    const fetchSentConnections = async () => {
      try {
        if (!user?.id) {
          console.error("User ID is undefined. Skipping API call.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:4000/api/connections/sent/${user.id}`
        );
        setSentConnections(response.data || []); // Store the fetched sent connections
      } catch (error) {
        console.error("Error fetching sent connections:", error);
        setSentConnections([]); // Fallback to an empty array
      } finally {
        setLoading(false); // Stop loading after the API call
      }
    };

    fetchSentConnections();
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

  // Handle the case where there are no sent connections
  if (sentConnections.length === 0) {
    return <Box>No pending requests sent</Box>;
  }

  // Filter users where the logged-in user is the sender and the status is "pending"
  const filteredUsers = users.filter((userData) => {
    const connection = sentConnections.find(
      (conn) =>
        conn.senderUserId === user?.id &&
        conn.receiverUserId === userData._id &&
        conn.status === "pending"
    );
    return !!connection; // Show users with pending requests sent by the logged-in user
  });

  return (
    <Box>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((userData) => {
          const connection = sentConnections.find(
            (conn) =>
              conn.senderUserId === user?.id &&
              conn.receiverUserId === userData._id &&
              conn.status === "pending"
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
        <Box>No pending requests sent</Box>
      )}
    </Box>
  );
};

export default SentTab;