import React, { useState } from "react";
import { Box, Fab, Typography } from "@mui/material";
import { motion } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import AddDialog from "./VendorAddProduct/AddDialog";
import ClientCard from "./ClientCard/ClientCard"; // Import the ClientCard component

// Sample client data
const clients = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    requirements: "Looking for a custom gaming PC build with RGB lighting.",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 987 654 321",
    requirements: "Need a wireless headphone with noise cancellation.",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1 555 555 555",
    requirements: "Interested in a 4K monitor for video editing.",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob.brown@example.com",
    phone: "+1 777 888 999",
    requirements: "Wants a budget-friendly smartwatch with fitness tracking.",
  },
  {
    id: 5,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 111 222 333",
    requirements: "Looking for a portable Bluetooth speaker for outdoor use.",
  },
  {
    id: 5,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 111 222 333",
    requirements: "Looking for a portable Bluetooth speaker for outdoor use.",
  },
  {
    id: 5,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 111 222 333",
    requirements: "Looking for a portable Bluetooth speaker for outdoor use.",
  },
  {
    id: 5,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 111 222 333",
    requirements: "Looking for a portable Bluetooth speaker for outdoor use.",
  },
];

const ClientEstore = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh", // Full viewport height
        bgcolor: "#121212", // Dark background
        color: "#fff",
        padding: 4,
        width: "100%", // Use full width
        boxSizing: "border-box",
      }}
    >
      {/* Main Content */}
      {/* <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
        See What the Clients Want...
      </Typography> */}

      {/* Client Cards Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)", // 1 column on small screens
            sm: "repeat(1, 1fr)", // 2 columns on medium screens
            md: "repeat(2, 1fr)", // 3 columns on larger screens
            lg: "repeat(3, 1fr)", // 4 columns on large screens
          },
          gap: "30px", // Gap between cards
          margin: "90px",
          marginLeft: "200px",
          justifyContent: "center",
          paddingTop: "10px", // Padding at the top
        }}
      >
        {clients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }} // Staggered animation
          >
            <ClientCard client={client} />
          </motion.div>
        ))}
      </Box>

      {/* Floating Action Button */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        sx={{
          position: "fixed",
          bottom: 20,
          left: 140,
          zIndex: 1000,
          backgroundColor: "transparent",
        }}
      >
        <Fab
          sx={{
            backgroundColor: "#31a3a3",
            "&:hover": {
              backgroundColor: "#2e8f8f",
            },
          }}
          aria-label="add"
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
      </Box>

      {/* Product Form Dialog */}
      <AddDialog open={open} onClose={handleClose} />
    </Box>
  );
};

export default ClientEstore;