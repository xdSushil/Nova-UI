import React, { useState, useContext } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock, Email, Person } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API calls
import { AuthContext } from "../../Providers/UserContext";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Client-side validation
    if (!name || !email || !password || !confirmPassword) {
      return setNotification({
        open: true,
        message: "All fields are required!",
        severity: "error",
      });
    }
    if (!emailRegex.test(email)) {
      return setNotification({
        open: true,
        message: "Please enter a valid email address!",
        severity: "error",
      });
    }
    if (password !== confirmPassword) {
      return setNotification({
        open: true,
        message: "Passwords do not match!",
        severity: "error",
      });
    }

    try {
      // Send a POST request to the backend API
      const response = await axios.post("http://localhost:4000/api/users", {
        companyName: name, // Assuming 'name' corresponds to 'companyName' in the backend
        email,
        password,
      });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      login(user);
      // Handle successful registration
      setNotification({
        open: true,
        message: response.data.message || "Registration successful!",
        severity: "success",
      });

      // Clear the form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to the login page after a short delay
      setTimeout(() => {
        navigate("/details");
      }, 2000);
    } catch (error) {
      // Handle errors from the backend
      let errorMessage = "An error occurred while registering.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      setNotification({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        backgroundColor: "transparent",
      }}
    >
      <Box textAlign="center" mb={3}>
        <img
          src="/logo.png" // Replace with your logo URL
          alt="Nova"
          style={{
            width: "290px",
            height: "auto",
          }}
        />
      </Box>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 500,
            letterSpacing: "1px",
            color: "#7a7777",
          }}
        >
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Company Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: "#31a3a3" }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  style: { color: "#a9a9a9" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#a9a9a9" },
                    "&:hover fieldset": { borderColor: "#31a3a3" },
                    "&.Mui-focused fieldset": { borderColor: "#31a3a3" },
                  },
                  input: { color: "#fff" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: "#31a3a3" }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  style: { color: "#a9a9a9" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#a9a9a9" },
                    "&:hover fieldset": { borderColor: "#31a3a3" },
                    "&.Mui-focused fieldset": { borderColor: "#31a3a3" },
                  },
                  input: { color: "#fff" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                type={showPassword ? "text" : "password"}
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "#31a3a3" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? (
                          <VisibilityOff sx={{ color: "#31a3a3" }} />
                        ) : (
                          <Visibility sx={{ color: "#31a3a3" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  style: { color: "#a9a9a9" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#a9a9a9" },
                    "&:hover fieldset": { borderColor: "#31a3a3" },
                    "&.Mui-focused fieldset": { borderColor: "#31a3a3" },
                  },
                  input: { color: "#fff" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                type={showPassword ? "text" : "password"}
                label="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "#31a3a3" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? (
                          <VisibilityOff sx={{ color: "#31a3a3" }} />
                        ) : (
                          <Visibility sx={{ color: "#31a3a3" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  style: { color: "#a9a9a9" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#a9a9a9" },
                    "&:hover fieldset": { borderColor: "#31a3a3" },
                    "&.Mui-focused fieldset": { borderColor: "#31a3a3" },
                  },
                  input: { color: "#fff" },
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            sx={{
              backgroundColor: "#31a3a3",
              color: "#fff",
              fontWeight: "bold",
              mt: 3,
              py: 1.5,
              "&:hover": {
                backgroundColor: "#278f8f",
              },
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Register
          </Button>
        </Box>
      </motion.div>
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterForm;