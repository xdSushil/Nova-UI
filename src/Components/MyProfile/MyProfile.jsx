import React, { useEffect, useState, useContext } from 'react';
import { Container, Card, CardContent, Typography, Grid, Divider, Box, CircularProgress } from '@mui/material';
import { AuthContext } from '../../Providers/UserContext';
import UserLayout from '../../Pages/UserLayout/User';
import axios from "axios";
import { Email, Business, LocationOn, People, AccountBalance, PeopleAlt, ShoppingCart } from '@mui/icons-material';

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [currentUser, setUser] = useState(null);

  useEffect(() => {
    const fetchConnectionStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/users/currentUser/${user.id}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchConnectionStatus();
  }, []);

  return (
    <>
      <UserLayout />
      <Box sx={{ mt: 12, pl: 15 }}>
        {!currentUser ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
            <CircularProgress sx={{ color: "#31a3a3" }} size={60} />
          </Box>
        ) : (
          <Container>
            <Card sx={{
              p: 3,
              boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
              borderRadius: 4,
              background: "linear-gradient(130deg, #121212 60%, #1e1e2f 100%)", 
              color: "white"
            }}>
              <CardContent>
                <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom sx={{ color: "#31a3a3" }}>
                  My Profile
                </Typography>
                <Divider sx={{ mt: 2, mb: 3, backgroundColor: "#31a3a3", height: 2, borderRadius: 10 }} />

                {/* Personal & Company Info */}
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    {currentUser.email && <Typography variant="body1"><Email sx={{ mr: 1, color: "#31a3a3" }} /> <b>Email:</b> {currentUser.email}</Typography>}
                    {currentUser.adminEmail && <Typography variant="body1"><Email sx={{ mr: 1, color: "#31a3a3" }} /> <b>Admin Email:</b> {currentUser.adminEmail}</Typography>}
                    {currentUser.address && <Typography variant="body1"><LocationOn sx={{ mr: 1, color: "#31a3a3" }} /> <b>Address:</b> {currentUser.address}</Typography>}
                    {currentUser.companyName && <Typography variant="body1"><Business sx={{ mr: 1, color: "#31a3a3" }} /> <b>Company Name:</b> {currentUser.companyName}</Typography>}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {currentUser.companySize && <Typography variant="body1"><People sx={{ mr: 1, color: "#31a3a3" }} /> <b>Company Size:</b> {currentUser.companySize}</Typography>}
                    {currentUser.clientIndustry && <Typography variant="body1"><Business sx={{ mr: 1, color: "#31a3a3" }} /> <b>Client Industry:</b> {currentUser.clientIndustry}</Typography>}
                    {currentUser.companyIndustry && <Typography variant="body1"><Business sx={{ mr: 1, color: "#31a3a3" }} /> <b>Company Industry:</b> {currentUser.companyIndustry}</Typography>}
                    {currentUser.panNumber && <Typography variant="body1"><AccountBalance sx={{ mr: 1, color: "#31a3a3" }} /> <b>PAN Number:</b> {currentUser.panNumber}</Typography>}
                  </Grid>
                </Grid>

                {/* Employees Section */}
                {currentUser.employeeEmails?.length > 0 && (
                  <>
                    <Divider sx={{ my: 3, backgroundColor: "#31a3a3" }} />
                    <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                      <PeopleAlt sx={{ color: "#31a3a3", mr: 1 }} />
                      <Typography variant="h6" fontWeight="bold" sx={{ color: "#31a3a3" }}>Employees:</Typography>
                    </Box>
                    <Box sx={{ pl: 2 }}>
                      {currentUser.employeeEmails.map((email, index) => (
                        <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>• {email}</Typography>
                      ))}
                    </Box>
                  </>
                )}

                {/* Product & Supplier Details */}
                {(currentUser.productTypes || currentUser.supplierIndustry || currentUser.supplyType) && (
                  <>
                    <Divider sx={{ my: 3, backgroundColor: "#31a3a3" }} />
                    <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                      <ShoppingCart sx={{ color: "#31a3a3", mr: 1 }} />
                      <Typography variant="h6" fontWeight="bold" sx={{ color: "#31a3a3" }}>Product & Supplier Details:</Typography>
                    </Box>
                    {currentUser.productTypes && <Typography variant="body1"><b>Product Types:</b> {currentUser.productTypes}</Typography>}
                    {currentUser.supplierIndustry && <Typography variant="body1"><b>Supplier Industry:</b> {currentUser.supplierIndustry}</Typography>}
                    {currentUser.supplyType && <Typography variant="body1"><b>Supply Type:</b> {currentUser.supplyType}</Typography>}
                  </>
                )}
              </CardContent>
            </Card>
          </Container>
        )}
      </Box>
    </>
  );
};

export default MyProfile;
