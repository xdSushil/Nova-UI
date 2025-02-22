import React from "react";
import { Typography, Box } from "@mui/material";
import { PeopleAlt } from "@mui/icons-material";

const EmployeeSection = ({ currentUser }) => {
  if (!currentUser.employeeEmails?.length) return null;

  return (
    <Box sx={{ mt: 3 }}>
      <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
        <PeopleAlt sx={{ color: "#31a3a3", mr: 1 }} />
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#31a3a3" }}>
          Employees:
        </Typography>
      </Box>
      <Box sx={{ pl: 2 }}>
        {currentUser.employeeEmails.map((email, index) => (
          <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
            • {email}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default EmployeeSection;