import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import RequestCard from "../RequestCard/RequestCard";

const RequestsTab = ({ users, user }) => {
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
        setPendingConnections([]); // Fallback to an empty array
      } finally {
        setLoading(false); // Stop loading after the API call
      }
    };

    fetchPendingConnections();
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

  // Handle the case where there are no pending connections
  if (pendingConnections.length === 0) {
    return <Box>No pending requests received</Box>;
  }

  // Filter users based on pending connections
  const filteredUsers = users.filter((userData) =>
    pendingConnections.some(
      (conn) =>
        conn.senderUserId === userData._id &&
        conn.receiverUserId === user?.id &&
        conn.status === "pending"
    )
  );

  return (
    <Box>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((userData) => {
          const connection = pendingConnections.find(
            (conn) =>
              conn.senderUserId === userData._id &&
              conn.receiverUserId === user?.id &&
              conn.status === "pending"
          );
          return (
            <RequestCard
              key={userData._id}
              userData={userData}
              connectionId={connection._id} // Pass the connection ID for updating the status
            />
          );
        })
      ) : (
        <Box>No pending requests received</Box>
      )}
    </Box>
  );
};

export default RequestsTab;