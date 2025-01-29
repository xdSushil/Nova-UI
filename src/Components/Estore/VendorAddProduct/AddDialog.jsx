import React, { useState } from "react";
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

const AddDialog = ({ open, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        discount: "",
        category: "",
        subcategory: "",
        stockQuantity: "",
        sku: "",
        vendorName: ""
    });
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const handleCloseSnackbar = () => setSnackbar({ open: false, message: "", severity: "success" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleReset = () => {
        setFormData({
            name: "",
            description: "",
            price: "",
            discount: "",
            category: "",
            subcategory: "",
            stockQuantity: "",
            sku: "",
            vendorName: ""
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitting form data:", formData);
            const response = await axios.post("http://localhost:4000/api/products/", formData);
            if (response.status === 201) {
                setSnackbar({ open: true, message: "Product added successfully!", severity: "success" });
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
                <DialogTitle>Add a Product</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Product Name"
                                    name="name"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    InputLabelProps={{ style: { color: "#ccc" } }}
                                    InputProps={{ style: { color: "#fff" } }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Vendor Name"
                                    name="vendorName"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formData.vendorName}
                                    onChange={handleChange}
                                    InputLabelProps={{ style: { color: "#ccc" } }}
                                    InputProps={{ style: { color: "#fff" } }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Description"
                                    name="description"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formData.description}
                                    onChange={handleChange}
                                    InputLabelProps={{ style: { color: "#ccc" } }}
                                    InputProps={{ style: { color: "#fff" } }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Price"
                                    name="price"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    InputLabelProps={{ style: { color: "#ccc" } }}
                                    InputProps={{ style: { color: "#fff" } }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Discount"
                                    name="discount"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    value={formData.discount}
                                    onChange={handleChange}
                                    InputLabelProps={{ style: { color: "#ccc" } }}
                                    InputProps={{ style: { color: "#fff" } }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Category"
                                    name="category"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formData.category}
                                    onChange={handleChange}
                                    InputLabelProps={{ style: { color: "#ccc" } }}
                                    InputProps={{ style: { color: "#fff" } }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Subcategory"
                                    name="subcategory"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.subcategory}
                                    onChange={handleChange}
                                    InputLabelProps={{ style: { color: "#ccc" } }}
                                    InputProps={{ style: { color: "#fff" } }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Stock Quantity"
                                    name="stockQuantity"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    type="number"
                                    value={formData.stockQuantity}
                                    onChange={handleChange}
                                    InputLabelProps={{ style: { color: "#ccc" } }}
                                    InputProps={{ style: { color: "#fff" } }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="SKU"
                                    name="sku"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.sku}
                                    onChange={handleChange}
                                    InputLabelProps={{ style: { color: "#ccc" } }}
                                    InputProps={{ style: { color: "#fff" } }}
                                />
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
                                Add Product
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

export default AddDialog;
