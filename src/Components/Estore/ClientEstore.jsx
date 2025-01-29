import React, { useState } from "react";
import { Box, Fab } from "@mui/material";
import { motion } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import AddDialog from "./VendorAddProduct/AddDialog";

const ClientEstore = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "50vh",
        bgcolor: "transparent",
        color: "#fff",
        padding: 4,
        width: "50vw",
        marginLeft: "20%",
      }}
    >
      {/* Main Content */}
      <h1>See what the Clients Want..</h1>

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
