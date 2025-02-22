import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { Email, Business, LocationOn, People, AccountBalance } from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';

const PersonalInfo = ({ currentUser }) => {
  return (
    <>
    <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
        <PersonIcon sx={{ color: "#31a3a3", mr: 1 }} />
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#31a3a3" }}>
          Company Info:
        </Typography>
      </Box>
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6}>
        {currentUser.email && (
          <Typography variant="body1">
            <Email sx={{ mr: 1, color: "#31a3a3",mb: 0.5 }} /> <b>Email:</b>{" "}
            {currentUser.email}
          </Typography>
        )}
        {currentUser.adminEmail && (
          <Typography variant="body1">
            <Email sx={{ mr: 1, color: "#31a3a3",mb: 0.5 }} /> <b>Admin Email:</b>{" "}
            {currentUser.adminEmail}
          </Typography>
        )}
        {currentUser.address && (
          <Typography variant="body1">
            <LocationOn sx={{ mr: 1, color: "#31a3a3",mb: 0.5 }} /> <b>Address:</b>{" "}
            {currentUser.address}
          </Typography>
        )}
        {currentUser.companySize && (
          <Typography variant="body1">
            <People sx={{ mr: 1, color: "#31a3a3",mb: 0.5 }} /> <b>Company Size:</b>{" "}
            {currentUser.companySize}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        {currentUser.clientIndustry && (
          <Typography variant="body1">
            <Business sx={{ mr: 1, color: "#31a3a3",mb: 0.5 }} /> <b>Client Industry:</b>{" "}
            {currentUser.clientIndustry}
          </Typography>
        )}
        {currentUser.companyIndustry && (
          <Typography variant="body1">
            <Business sx={{ mr: 1, color: "#31a3a3",mb: 0.5 }} /> <b>Company Industry:</b>{" "}
            {currentUser.companyIndustry}
          </Typography>
        )}
        {currentUser.panNumber && (
          <Typography variant="body1">
            <AccountBalance sx={{ mr: 1, color: "#31a3a3",mb: 0.5 }} /> <b>PAN Number:</b>{" "}
            {currentUser.panNumber}
          </Typography>
        )}
      </Grid>
    </Grid>
    </>
  );
};

export default PersonalInfo;