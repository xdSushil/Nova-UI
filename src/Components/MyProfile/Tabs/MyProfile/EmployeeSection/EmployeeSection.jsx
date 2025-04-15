import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { PeopleAlt } from "@mui/icons-material";
import axios from "axios";

const EmployeeSection = ({ currentUser }) => {
  const [connections, setConnections] = useState([])
  
  useEffect(()=>{
    const fetchConnections = async () => {
      try{
        const response = await axios.get(`http://localhost:4000/api/users/connections/${currentUser._id}`)
        setConnections(response.data)
      }catch(error){
        console.log("Error fetching connections in profile:", error)
      }
    }
    fetchConnections();
  }, [])

  if (!currentUser.employeeEmails?.length) return null;
  return (
    <Box sx={{ mt: 3 }}>
      <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
        <PeopleAlt sx={{ color: "#31a3a3", mr: 1 }} />
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#31a3a3" }}>
          Employees:
        </Typography>
        <PeopleAlt sx={{ color: "#31a3a3", mr: 1, ml: 39 }} />
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#31a3a3" }}>
          Connections:
        </Typography>
      </Box>
      <Box display="flex">
        <Box sx={{ pl: 2 }}>
          {currentUser.employeeEmails.map((email, index) => (
            <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
              • {email}
            </Typography>
          ))}
        </Box>

        <Box sx={{ pl: 30 }}>
          {currentUser?.connections?.length > 0 ? (
            connections.map((connection) => (
              <Typography key={connection._id} variant="body2" sx={{ mb: 0.5 }}>
                • {connection.companyName || "Unknown User"}
              </Typography>
            ))
          ) : (
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              No Connections Yet, Make Connections
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeSection;