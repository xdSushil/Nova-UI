import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import { PlusCircle, X } from "lucide-react";
import axios from "axios"; // Import Axios for API calls
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Providers/UserContext";

const industryOptions = [
  "Steel Manufacturing",
  "IT Services",
  "Automotive",
  "Pharmaceuticals",
  "Retail",
];

const InfoDialog = () => {
  const [formData, setFormData] = useState({
    companyIndustry: "",
    companySize: "",
    adminEmail: "",
    panNumber: "",
    employeeEmails: [],
    address: "",
    clientIndustry: "",
    productTypes: "",
    supplierIndustry: "",
    supplyType: "",
  });
  const [newEmail, setNewEmail] = useState(""); // Temporary input for new email
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const addEmployeeEmail = () => {
    if (newEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      setFormData((prev) => ({
        ...prev,
        employeeEmails: [...prev.employeeEmails, newEmail],
      }));
      setNewEmail(""); // Clear the input field
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  const removeEmployeeEmail = (index) => {
    const updatedEmails = [...formData.employeeEmails];
    updatedEmails.splice(index, 1);
    setFormData({ ...formData, employeeEmails: updatedEmails });
  };

  const handleSubmit = async () => {
    try {
      // Send the collected data to the backend
      const response = await axios.put(`http://localhost:4000/api/users/${user.id}`, formData);

      // Notify the user of success
      toast.success(response.data.message || "Details saved successfully!");
      // Redirect to the login page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      // Handle errors from the backend
      let errorMessage = "An error occurred while saving your details.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        backgroundColor: "black",
        minHeight: "100vh",
        color: "#fff",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Complete Your Profile
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Fill in the details below or skip for now.
      </Typography>

      {/* Company Information Section */}
      <Box sx={{ width: "100%", maxWidth: "500px", mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: "#aaa" }}>
          Company Information
        </Typography>

        <TextField
          fullWidth
          select
          label="Company Industry"
          value={formData.companyIndustry}
          onChange={(e) => handleChange("companyIndustry", e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#b9babd",
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#31a3a3" },
            },
            "& .MuiInputLabel-root": { color: "#aaa" },
            "& .MuiSelect-icon": { color: "#fff" },
            mb: 2, // Add margin-bottom for spacing
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "#333",
                color: "#fff",
                "& .MuiMenuItem-root": { "&:hover": { backgroundColor: "pink" } },
              },
            },
          }}
        >
          {industryOptions.map((industry, idx) => (
            <MenuItem key={idx} value={industry}>
              {industry}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Company Size"
          value={formData.companySize}
          onChange={(e) => handleChange("companySize", e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#31a3a3" },
            },
            "& .MuiInputLabel-root": { color: "#aaa" },
            mb: 2, // Add margin-bottom for spacing
          }}
        />

        <TextField
          fullWidth
          label="Administrator Email"
          value={formData.adminEmail}
          onChange={(e) => handleChange("adminEmail", e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#31a3a3" },
            },
            "& .MuiInputLabel-root": { color: "#aaa" },
            mb: 2, // Add margin-bottom for spacing
          }}
        />

        <TextField
          fullWidth
          label="PAN Number"
          value={formData.panNumber}
          onChange={(e) => handleChange("panNumber", e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#31a3a3" },
            },
            "& .MuiInputLabel-root": { color: "#aaa" },
            mb: 2, // Add margin-bottom for spacing
          }}
        />
      </Box>

      {/* Employee Emails Section */}
      <Box sx={{ width: "100%", maxWidth: "500px", mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: "#aaa" }}>
          Employee Emails
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {formData.employeeEmails.map((email, idx) => (
            <Chip
              key={idx}
              label={email}
              onDelete={() => removeEmployeeEmail(idx)}
              deleteIcon={<X />}
              sx={{
                backgroundColor: "#31a3a3",
                color: "#000",
                "& .MuiChip-deleteIcon": { color: "#000" },
              }}
            />
          ))}
        </Box>

        <TextField
          fullWidth
          label="Add Employee Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#31a3a3" },
            },
            "& .MuiInputLabel-root": { color: "#aaa" },
            mb: 2, // Add margin-bottom for spacing
          }}
        />
        <Button onClick={addEmployeeEmail} startIcon={<PlusCircle />}>
          Add Email
        </Button>
      </Box>

      {/* Address Section */}
      <Box sx={{ width: "100%", maxWidth: "500px", mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: "#aaa" }}>
          Address
        </Typography>

        <TextField
          fullWidth
          label="Address"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#31a3a3" },
            },
            "& .MuiInputLabel-root": { color: "#aaa" },
            mb: 2, // Add margin-bottom for spacing
          }}
        />
      </Box>

      {/* Client Information Section */}
      <Box sx={{ width: "100%", maxWidth: "500px", mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: "#aaa" }}>
          Client Information
        </Typography>

        <TextField
          fullWidth
          select
          label="Client Industry"
          value={formData.clientIndustry}
          onChange={(e) => handleChange("clientIndustry", e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#31a3a3" },
            },
            "& .MuiInputLabel-root": { color: "#aaa" },
            "& .MuiSelect-icon": { color: "#fff" },
            mb: 2, // Add margin-bottom for spacing
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "#333",
                color: "#fff",
                "& .MuiMenuItem-root": { "&:hover": { backgroundColor: "#444" } },
              },
            },
          }}
        >
          {industryOptions.map((industry, idx) => (
            <MenuItem key={idx} value={industry}>
              {industry}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Product Types"
          value={formData.productTypes}
          onChange={(e) => handleChange("productTypes", e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#31a3a3" },
            },
            "& .MuiInputLabel-root": { color: "#aaa" },
            mb: 2, // Add margin-bottom for spacing
          }}
        />
      </Box>

      {/* Supplier Information Section */}
      <Box sx={{ width: "100%", maxWidth: "500px", mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: "#aaa" }}>
          Supplier Information
        </Typography>

        <TextField
          fullWidth
          select
          label="Supplier Industry"
          value={formData.supplierIndustry}
          onChange={(e) => handleChange("supplierIndustry", e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#31a3a3" },
            },
            "& .MuiInputLabel-root": { color: "#aaa" },
            "& .MuiSelect-icon": { color: "#fff" },
            mb: 2, // Add margin-bottom for spacing
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "#333",
                color: "#fff",
                "& .MuiMenuItem-root": { "&:hover": { backgroundColor: "#444" } },
              },
            },
          }}
        >
          {industryOptions.map((industry, idx) => (
            <MenuItem key={idx} value={industry}>
              {industry}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Supply Type"
          value={formData.supplyType}
          onChange={(e) => handleChange("supplyType", e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#31a3a3" },
            },
            "& .MuiInputLabel-root": { color: "#aaa" },
            mb: 2, // Add margin-bottom for spacing
          }}
        />
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4, gap:5 }}>
        <Button onClick={() => navigate("/home")} color="secondary">
          Skip for Now
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save Details
        </Button>
      </Box>

      {/* Toast Notifications */}
      <ToastContainer />
    </Box>
  );
};

export default InfoDialog;