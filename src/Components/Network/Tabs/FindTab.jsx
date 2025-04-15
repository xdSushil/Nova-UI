import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import ConnectionCard from "../../ConnectionCard/ConnectionCard";
import axios from "axios";

const FindTab = ({ user }) => {
  const [newUsers, setNewUsers] = useState([])
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    const fetchNewUsers = async () => {
      try{
        const response = await axios.get(`http://localhost:4000/api/users/newUsers/${user.id}`);
        setNewUsers(response.data);
      }catch(error){
        console.log("Error fetching new users:", error)
      }finally {
        setLoading(false); 
      }

    }

    fetchNewUsers()
  },[])
  {if (newUsers.length === 0){
    return <Box>No new Users Right Now</Box>
  }}

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

  return (
    <Box>
    {newUsers.map((newUser)=>(
          <ConnectionCard
            key={newUser._id}
            userData={newUser}
            connectionStatus="stranger"
          />
    ))}
    </Box>
  );
};

export default FindTab;