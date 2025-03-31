import React, { useContext, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Grid,
    Box,
    Snackbar,
    Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import RemoveIcon from '@mui/icons-material/Remove';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AuthContext } from "../../../Providers/UserContext";

const ClientAddDialog = ({ open, onClose }) => {
    const [formData, setFormData] = useState({
        client_name: "",
        request: "",
        supply_industry: "",
    });
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const handleCloseSnackbar = () => setSnackbar({ open: false, message: "", severity: "success" });
    const { user } = useContext(AuthContext)
    const [images, setImages] = useState([]);
    const [newItem, setNewItem] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setNewItem(e.target.value);
    }

    const handleImageClick = async () => {
        setImages([...images, newItem]);
        setNewItem("");
    }

    const HandleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    }

    const handleReset = () => {
        setFormData({
            client_name: "",
            request: "",
            supply_industry: "",
            budget: "",
        });
        setImages([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            formData.client_name = user.companyName;
            formData.images = images;
            const response = await axios.post("http://localhost:4000/api/requests/", formData);
            if (response.status === 201) {
                setSnackbar({ open: true, message: "Request added successfully!", severity: "success" });
                onClose();
                handleReset();
            }
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.response?.data?.message || "An error occurred. Please try again.",
                severity: "error",
            });
        }
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth
                maxWidth="md"
                PaperProps={{
                    component: motion.div,
                    initial: { opacity: 0, y: 50 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: 50 },
                    transition: { duration: 0.3 },
                    style: { backgroundColor: "#1c1c1c", color: "#fff", borderRadius: 8 },
                }}
            >
                <DialogTitle>Create a Request</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Requirement"
                                    name="request"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formData.request}
                                    onChange={handleChange}
                                    InputLabelProps={{ style: { color: "#ccc" } }}
                                    InputProps={{ style: { color: "#fff" } }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Budget"
                                    name="budget"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formData.budget}
                                    onChange={handleChange}
                                    InputLabelProps={{ style: { color: "#ccc" } }}
                                    InputProps={{ style: { color: "#fff" } }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Supply Industry"
                                    name="supply_industry"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formData.supply_industry}
                                    onChange={handleChange}
                                    InputLabelProps={{ style: { color: "#ccc" } }}
                                    InputProps={{ style: { color: "#fff" } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "8px",
                                    }}
                                >
                                    {images.map((image, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                padding: "8px 16px",
                                                backgroundColor: "#e0e0e0",
                                                borderRadius: "20px",
                                                fontSize: "14px",
                                                color: "#333",
                                                cursor: "pointer",
                                                "&:hover": {
                                                    backgroundColor: "#d1d1d1",
                                                },
                                            }}
                                        >
                                            <span>{image}</span>

                                            <Button
                                                onClick={() => { HandleRemoveImage(index) }}
                                                sx={{
                                                    minWidth: "auto",
                                                    padding: "4px 8px",
                                                    fontSize: "12px",
                                                    color: "red"
                                                }}
                                            >
                                                <RemoveIcon />
                                            </Button>

                                        </Box>

                                    ))}
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Images"
                                    name="Images"
                                    variant="outlined"
                                    fullWidth
                                    value={newItem}
                                    InputLabelProps={{ style: { color: "#ccc" } }}
                                    InputProps={{ style: { color: "#fff" } }}
                                    placeholder="Add Images with a public URL"
                                    onInput={handleImageChange}
                                />
                                <Button sx={{ marginTop: "10px", color: "gray" }} onClick={handleImageClick}> <AddCircleOutlineIcon /></Button>
                            </Grid>
                        </Grid>

                        {/* Action Buttons */}
                        <Box textAlign="right" mt={4}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleReset}
                                sx={{ mr: 2 }}
                            >
                                Reset
                            </Button>
                            <Button variant="contained" color="primary" type="submit">
                                Create Request
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Snackbar for Notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ClientAddDialog;
