import { Box, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/UserContext"; // Adjust the path as needed
import axios from "axios";
import ConnectionCard from "../ConnectionCard/ConnectionCard";


function ClientNetwork() {
    const { user } = useContext(AuthContext); // Get the logged-in user's data from AuthContext
    const [users, setUsers] = useState([]); // State to store fetched users
    const [loading, setLoading] = useState(true); // Loading state for API call
    const [connections, setConnections] = useState([]); // State to store fetched users
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          // Fetch users excluding the logged-in user
          const response = await axios.get(
            `http://localhost:4000/api/users/${user.id}`
          );
          setUsers(response.data); // Store the fetched users
        } catch (error) {
          console.error("Error fetching users:", error);
        } finally {
          setLoading(false); // Stop loading after the API call
        }
      };
  
      if (user?.id) {
        fetchUsers(); // Fetch users only if the user is logged in
      }
    }, [user?.id]); // Re-run the effect if the user ID changes
  
    useEffect(() => {
      const fetchConnectionStatus = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/connections/sent/${user.id}`
          );
          if(response.data.length>0){
            setConnections(response.data);
          }
          else{
            setConnections([]);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
          setConnections([]);
        }
      };
      fetchConnectionStatus();
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
          <CircularProgress /> {/* Show a loading spinner */}
        </Box>
      );
    }
  
    return (
      <Box
        sx={{
          position: "absolute",
          left: "15%",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          width: "80%",
          marginTop: "83px",
        }}
      >
        {/* Render ConnectionCard for each user */}
        {users.length > 0 ? (
          users.map((userData) => {
            const connection = connections.find(
              (conn) =>
                (conn.senderUserId === user.id &&
                  conn.receiverUserId === userData._id) ||
                (conn.receiverUserId === user.id &&
                  conn.senderUserId === userData._id)
            );
            console.log("connection", connection)
            return (
              <ConnectionCard
                key={userData._id}
                userData={userData}
                connectionStatus={
                  connection ? connection.status : "stranger"
                }
              />
            );
          })
        ) : (
          <Box>No users available</Box> // Fallback if no users are found
        )}
      </Box>
    );
  }

export default ClientNetwork