import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
  IconButton,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Chip,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { PlusCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const industryOptions = [
  "Steel Manufacturing",
  "IT Services",
  "Automotive",
  "Pharmaceuticals",
  "Retail",
];

const steps = ["Company Information", "Employee Information", "Supplier Information"];

const InfoDialog = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
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

  const handleNext = () => {
    if (!validateFields()) return;
    toast.success("Info saved!");
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (!validateFields()) return;
    toast.success("Info saved!");
    setActiveStep((prev) => prev - 1);
  };

  const handleSkip = () => {
    setActiveStep((prev) => prev + 1);
  };

  const validateFields = () => {
    const { companyIndustry, companySize, adminEmail, panNumber } = formData;
    if (activeStep === 0) {
      if (!companyIndustry || !companySize || !adminEmail || !panNumber) {
        toast.error("All mandatory fields must be filled!");
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(adminEmail)) {
        toast.error("Invalid email format for Administrator Email!");
        return false;
      }
    }
    return true;
  };

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

  const renderSlideContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              label="Industry Type of Company"
              select
              fullWidth
              value={formData.companyIndustry}
              onChange={(e) => handleChange("companyIndustry", e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#b9babd",
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#31a3a3",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#aaa",
                },
                "& .MuiSelect-icon": {
                  color: "#fff",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "#333",
                    color: "#fff",
                    "& .MuiMenuItem-root": {
                      "&:hover": {
                        backgroundColor: "pink",
                      },
                    },
                  },
                },
              }}
            >
              {industryOptions.map((industry, idx) => (
                <MenuItem sx={{                   }} key={idx} value={industry}>
                  {industry}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Company Size"
              fullWidth
              value={formData.companySize}
              onChange={(e) => handleChange("companySize", e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#31a3a3",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#aaa",
                },
              }}
            />
            <TextField
              label="Administrator Email"
              fullWidth
              value={formData.adminEmail}
              onChange={(e) => handleChange("adminEmail", e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#31a3a3",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#aaa",
                },
              }}
            />
            <TextField
              label="Business PAN Number"
              fullWidth
              value={formData.panNumber}
              onChange={(e) => handleChange("panNumber", e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#31a3a3",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#aaa",
                },
              }}
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {formData.employeeEmails.map((email, idx) => (
                <Chip
                  key={idx}
                  label={email}
                  onDelete={() => removeEmployeeEmail(idx)}
                  deleteIcon={<X size={16} />}
                  sx={{
                    backgroundColor: "#31a3a3",
                    color: "#000",
                    "& .MuiChip-deleteIcon": {
                      color: "#000",
                    },
                  }}
                />
              ))}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TextField
                label="Add Employee Email"
                fullWidth
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    "& fieldset": {
                      borderColor: "#555",
                    },
                    "&:hover fieldset": {
                      borderColor: "#31a3a3",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#aaa",
                  },
                }}
              />
              <IconButton
                onClick={addEmployeeEmail}
                sx={{
                  backgroundColor: "#31a3a3",
                  color: "#000",
                  "&:hover": {
                    backgroundColor: "#1f7a7a",
                  },
                }}
              >
                <PlusCircle size={20} />
              </IconButton>
            </Box>
            <TextField
              label="Address"
              fullWidth
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#31a3a3",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#aaa",
                },
              }}
            />
            <TextField
              label="Client Industry Type"
              select
              fullWidth
              value={formData.clientIndustry}
              onChange={(e) => handleChange("clientIndustry", e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#31a3a3",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#aaa",
                },
                "& .MuiSelect-icon": {
                  color: "#fff",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "#333",
                    color: "#fff",
                    "& .MuiMenuItem-root": {
                      "&:hover": {
                        backgroundColor: "#444",
                      },
                    },
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
              label="Product Types"
              fullWidth
              value={formData.productTypes}
              onChange={(e) => handleChange("productTypes", e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#31a3a3",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#aaa",
                },
              }}
            />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Supplier Industry Type"
              select
              fullWidth
              value={formData.supplierIndustry}
              onChange={(e) => handleChange("supplierIndustry", e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#31a3a3",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#aaa",
                },
                "& .MuiSelect-icon": {
                  color: "#fff",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "#333",
                    color: "#fff",
                    "& .MuiMenuItem-root": {
                      "&:hover": {
                        backgroundColor: "#444",
                      },
                    },
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
              label="Supply Type"
              fullWidth
              value={formData.supplyType}
              onChange={(e) => handleChange("supplyType", e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#31a3a3",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#aaa",
                },
              }}
            />
          </Box>
        );
      default:
        setTimeout(() => {
          navigate("/home");
        }, 2000);
        return (
          <Box sx={{ textAlign: "center", py: 4 }}>

            <Typography variant="h6" sx={{ color: "#fff" }}>
              Profile completed, enjoy your time here! 🎉
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      disableBackdropClick // Prevent closing on outside click
      disableEscapeKeyDown // Prevent closing on ESC key
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: "#1a1a1a",
          color: "#fff",

        },
      }}
    >
      <Typography variant="h4" sx={{ color: "#31a3a3", mb: 1, ml: 3, mt: 4 }}>
        Complete Your Profile
      </Typography>
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <DialogTitle sx={{ textAlign: "center", py: 3 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label} sx={{ color: "white" }}>
                <StepLabel sx={{ color: "white" }}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </DialogTitle>
        <DialogContent sx={{ py: 2 }}>{renderSlideContent()}</DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: 3,
            py: 2,
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          <Button
            onClick={handleSkip}
            sx={{
              color: "#31a3a3",
              "&:hover": {
                backgroundColor: "rgba(49, 163, 163, 0.1)",
              },
            }}
          >
            Skip
          </Button>

          <Button
            onClick={handleBack}
            sx={{
              color: "#31a3a3",
              "&:hover": {
                backgroundColor: "rgba(49, 163, 163, 0.1)",
              },
            }}
          >
            Back
          </Button>

          <Button
            onClick={handleNext}
            sx={{
              backgroundColor: "#31a3a3",
              color: "#000",
              "&:hover": {
                backgroundColor: "#1f7a7a",
              },
            }}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </motion.div>
    </Dialog>
  );
};

export default InfoDialog;