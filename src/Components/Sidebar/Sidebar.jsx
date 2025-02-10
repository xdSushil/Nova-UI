import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { AuthContext } from "../../Providers/UserContext";
import { useNavigate } from "react-router-dom";
import { Paper, Box, Typography, Avatar, Popover, Divider, List, ListItem, ListItemText } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

function Sidebar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeIcon, setActiveIcon] = useState(null); // Start with null to avoid default selection
    const [anchorEl, setAnchorEl] = useState(null); // For profile popover menu
    const [novaAnchorEl, setNovaAnchorEl] = useState(null); // For NOVA popover
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const user = useContext(AuthContext).user || { companyName: "Guest" };
    // Function to handle scroll events
    const handleScroll = () => {
        if (window.scrollY > 50) { // Set scroll threshold (e.g., 50px)
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    const icons = [
        { id: 0.10, Icon: HomeOutlinedIcon, label: 'Home' },
        { id: 1.10, Icon: AssessmentOutlinedIcon, label: 'Analytics' },
        { id: 2.05, Icon: StorefrontOutlinedIcon, label: 'Store' },
        { id: 3.02, Icon: AddBusinessOutlinedIcon, label: 'Network' },
        { id: 4, Icon: ChatBubbleOutlineOutlinedIcon, label: 'Chats' },
    ];

    // Sample data for message previews
    const messagePreviews = [
        { company: "TechCorp", message: "Hey, let's discuss the project...", color: "#FF5733", time: "10:30 AM" }, // Reddish Orange
        { company: "InnovateX", message: "Can you send me the report?", color: "#33FF57", time: "11:15 AM" }, // Greenish
        { company: "DataWave", message: "Meeting at 3 PM today.", color: "#3357FF", time: "12:45 PM" }, // Blueish
        { company: "CloudLink", message: "I'll follow up with the client.", color: "#F3FF33", time: "02:20 PM" }, // Yellowish
    ];

    // Load active icon from localStorage on mount
    useEffect(() => {
        const storedIcon = localStorage.getItem('activeIcon');
        if (storedIcon) {
            setActiveIcon(parseFloat(storedIcon)); // Convert string to float
        } else {
            setActiveIcon(0.10); // Default to "Home" only if no value exists in localStorage
        }
    }, []);

    // Add scroll event listener when the component mounts
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Update localStorage whenever activeIcon changes
    const handleIconClick = (id, label) => {
        setActiveIcon(id);
        localStorage.setItem('activeIcon', id); // Save active icon to localStorage
        navigate("/" + label); // Navigate to the selected route
    };

    // Prevent rendering until activeIcon is initialized
    if (activeIcon === null) {
        return null; // Return null to prevent rendering until activeIcon is set
    }

    // Handle Profile Popover Open
    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Handle Profile Popover Close
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Handle NOVA Popover Open
    const handleNovaClick = (event) => {
        setNovaAnchorEl(event.currentTarget);
    };

    // Handle NOVA Popover Close
    const handleNovaClose = () => {
        setNovaAnchorEl(null);
    };

    const handleSignOut = () => {
        logout(); // Call the logout function to clear user session
        navigate("/login"); // Navigate to the login page
      };

    const open = Boolean(anchorEl);
    const novaOpen = Boolean(novaAnchorEl);
    const popoverId = open ? 'profile-popover' : undefined;
    const novaPopoverId = novaOpen ? 'nova-popover' : undefined;

    // Define NOVA options with random rates
    const novaOptions = [
        { name: "NOVA Free", rate: "Free" }, // New option
        { name: "Classic NOVA", rate: "$20" },
        { name: "Dwarf NOVA", rate: "$40" },
        { name: "Super NOVA", rate: "$60" },
        { name: "Hyper NOVA", rate: "$80" },
    ];

    return (
        <Paper
            sx={{
                backgroundColor: scrolled ? "rgba(255, 255, 255, 0.05)" : "#2d3033", // Sidebar background
                backdropFilter: scrolled ? "blur(20px)" : "none",
                height: "80vh", // Increased height to include user profile
                width: {
                    xs: "11vw", // Slightly narrower width
                    sm: "9vw",
                },
                borderRadius: "13px",
                position: "fixed", // Fixed to the screen
                left: 20, // Span the full width
                bottom: "5%", // Adjusted position
                boxShadow: scrolled ? "0px 4px 25px 15px rgba(0, 0, 0, 0.035)" : "0px 4px 20px 3px #242729",
                color: "#d1cdcd",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start", // Align items to the start
                justifyContent: "space-between", // Space between main content and profile section
                zIndex: 1000, // Keep it on top of other content
                transition: "backdrop-filter 0.3s ease, box-shadow 0.3s ease", // Smooth transition for the blur effect and shadow
                gap: "10px", // Consistent gap between sections
                padding: "10px", // Reduced padding
            }}
        >
            {/* Main Icons and Labels */}
            <Box sx={{ width: "100%" }}>
                {icons.map(({ id, Icon, label }) => (
                    <Box
                        key={id}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: "pointer",
                            width: "100%",
                            padding: "6px 10px", // Slightly increased padding for bigger items
                            borderRadius: "8px",
                            backgroundColor: activeIcon === id ? '#31a3a3' : "transparent", // Original blue
                            "&:hover": {
                                backgroundColor: activeIcon === id ? '#31a3a3' : "rgba(49, 163, 163, 0.1)", // Hover effect matches the new color
                            },
                            marginBottom: "10px", // Spacing between items
                        }}
                        onClick={() => handleIconClick(id, label)}
                    >
                        <Icon
                            sx={{
                                fontSize: {
                                    xs: "19.2px", // Increased icon size by ~20%
                                    sm: "21.6px",
                                },
                                color: activeIcon === id ? "#000000" : "#d1cdcd", // Black for selected icon
                                marginRight: "10px", // Slightly more space between icon and text
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "12px", // Increased font size by ~20%
                                    sm: "14px",
                                },
                                color: activeIcon === id ? "#000000" : "#d1cdcd", // Black for selected text
                                fontWeight: activeIcon === id ? "bold" : "normal",
                            }}
                        >
                            {label}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Message Preview Window */}
            <Box
                sx={{
                    width: "100%",
                    borderTop: "3px solid rgba(255, 255, 255, 0.3)", // Thicker divider line
                    paddingTop: "5px", // Minimal spacing above this section
                    backgroundColor: "#2d3033", // Same as sidebar background
                    borderRadius: "10px", // Curved edges for the entire box
                    padding: "10px", // Padding around the entire box
                }}
            >
                {/* Message Preview Label */}
                <Typography
                    sx={{
                        fontSize: "8px", // Micro-sized label
                        color: "#a0aec0", // Light gray for the label
                        fontWeight: "bold",
                        marginBottom: "4px", // Space below the label
                    }}
                >
                    MESSAGE PREVIEW
                </Typography>

                {/* Scrollable Message List */}
                <Box
                    sx={{
                        maxHeight: "150px", // Compact height for the preview window
                        overflowY: "auto", // Enable scrolling if content overflows
                        backgroundColor: "#25282c", // Darker gray background
                        borderRadius: "8px", // Curved edges for the inner box
                        padding: "8px", // Inner padding
                        "&::-webkit-scrollbar": {
                            width: "6px", // Thin scrollbar
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#4a5568", // Slightly lighter thumb
                            borderRadius: "4px", // Rounded scrollbar thumb
                        },
                        "&::-webkit-scrollbar-track": {
                            backgroundColor: "#25282c", // Matching track color
                        },
                    }}
                >
                    <List dense={true}>
                        {messagePreviews.map((preview, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    padding: "6px 8px", // Compact padding
                                    borderRadius: "8px", // Curved edges for each message
                                    backgroundColor: "#2d3033", // Same as sidebar background
                                    marginBottom: "4px", // Minimal spacing between messages
                                    "&:hover": {
                                        backgroundColor: "#3b4557", // Slightly lighter hover effect
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Typography
                                                sx={{
                                                    fontSize: "8px", // Username font size
                                                    fontWeight: "bold",
                                                    color: preview.color, // Company name color
                                                }}
                                            >
                                                {preview.company}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: "6px", // Smallest size for timestamp
                                                    color: "#a0aec0", // Light gray for timestamp
                                                }}
                                            >
                                                {preview.time}
                                            </Typography>
                                        </Box>
                                    }
                                    secondary={
                                        <Typography
                                            sx={{
                                                fontSize: "8px", // Message font size
                                                color: "#cbd5e0", // Lighter gray for message text
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {preview.message}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>

            {/* Upgrade NOVA and Company Profile Container */}
            <Box
                sx={{
                    width: "100%",
                    borderTop: "3px solid rgba(255, 255, 255, 0.3)", // Thicker divider line
                    paddingTop: "5px", // Minimal spacing above this section
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px", // Minimal gap between Upgrade NOVA and Company Profile
                }}
            >
                {/* Upgrade NOVA Section */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        "&:hover": {
                            backgroundColor: "rgba(49, 163, 163, 0.1)",
                        },
                    }}
                    onClick={handleNovaClick} // Open NOVA popover
                >
                    <Box sx={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
                        <Typography
                            sx={{
                                fontSize: "20px", // Larger diamond-star icon
                                color: "#FFD700", // Yellow color
                                marginRight: "-6px", // Overlap the smaller icon
                            }}
                        >
                            
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "26px", // Smaller diamond-star icon
                                color: "#FFD700", // Yellow color
                            }}
                        >
                            ✨
                        </Typography>
                    </Box>
                    <Typography
                        sx={{
                            fontSize: "12px",
                            color: "#d1cdcd",
                            fontWeight: "bold",
                        }}
                    >
                        Upgrade NOVA
                    </Typography>
                </Box>

                {/* Company Profile Section */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        "&:hover": {
                            backgroundColor: "rgba(49, 163, 163, 0.1)",
                        },
                    }}
                    onClick={handleProfileClick} // Open profile popover
                >
                    <Avatar
                        src="https://cdn-icons-png.flaticon.com/512/9408/9408626.png" // Lightning bolt clipart for profile picture
                        sx={{
                            width: 30,
                            height: 30,
                            bgcolor: "#31a3a3", // Match the original blue
                            fontSize: "14px",
                            color: "#fff",
                            marginRight: "10px",
                            borderRadius: "8px", // Rounded square shape
                        }}
                    >
                        AB
                    </Avatar>
                    <Typography
                        sx={{
                            fontSize: "12px",
                            color: "#d1cdcd",
                            fontWeight: "bold",
                        }}
                    >
                        {user.companyName} 
                    </Typography>
                </Box>
            </Box>

            {/* Profile Popover Menu */}
            <Popover
                id={popoverId}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: "#2d3033",
                        color: "#d1cdcd",
                        borderRadius: "10px",
                        padding: "10px",
                        width: "200px",
                    },
                }}
            >
                {/* Profile Picture and Edit Profile */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                    }}
                >
                    <Avatar
                        src="https://cdn-icons-png.flaticon.com/512/9408/9408626.png" // Lightning bolt clipart for profile picture
                        sx={{
                            width: 40,
                            height: 40,
                            bgcolor: "#31a3a3", // Match the original blue
                            fontSize: "14px",
                            color: "#fff",
                            marginRight: "10px",
                            borderRadius: "8px", // Rounded square shape
                        }}
                    >
                        AB
                    </Avatar>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                color: "#d1cdcd",
                            }}
                        >
                            Edit Profile
                        </Typography>
                    </Box>
                </Box>

                {/* Divider */}
                <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", marginBottom: "10px" }} />

                {/* Manage Inventory Option */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "8px",
                        borderRadius: "8px",
                        "&:hover": {
                            backgroundColor: "rgba(49, 163, 163, 0.1)",
                        },
                    }}
                    onClick={() => console.log("Manage Inventory clicked")}
                >
                    <Typography sx={{ fontSize: "14px", color: "#d1cdcd" }}>Manage Inventory</Typography>
                </Box>

                {/* Settings Option */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "8px",
                        borderRadius: "8px",
                        "&:hover": {
                            backgroundColor: "rgba(49, 163, 163, 0.1)",
                        },
                    }}
                    onClick={() => console.log("Settings clicked")}
                >
                    <Typography sx={{ fontSize: "14px", color: "#d1cdcd" }}>Settings</Typography>
                </Box>

                {/* Sign Out Option */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "8px",
                        borderRadius: "8px",
                        "&:hover": {
                            backgroundColor: "rgba(49, 163, 163, 0.1)",
                        },
                    }}
                    onClick={handleSignOut}
                >
                    <Typography sx={{ fontSize: "14px", color: "#d1cdcd" }}>Sign Out</Typography>
                </Box>
            </Popover>

            {/* NOVA Popover Menu */}
{/* NOVA Popover Menu */}
<Popover
    id={novaPopoverId}
    open={novaOpen}
    anchorEl={novaAnchorEl}
    onClose={handleNovaClose}
    anchorOrigin={{
        vertical: 'center',   // Align vertically at the center of the button
        horizontal: 'right',  // Anchor the popover to the right edge of the button
    }}
    transformOrigin={{
        vertical: 'center',   // Align vertically at the center of the popover
        horizontal: 'left',   // Position the popover to the right of the button
    }}
    sx={{
        '& .MuiPaper-root': {
            backgroundColor: "#2d3033", // Dark background
            color: "#d1cdcd",          // Light text
            borderRadius: "10px",
            padding: "10px",
            width: "200px",            // Fixed width for consistency
        },
    }}
>
    {/* Render NOVA Options */}
    {novaOptions.map((option, index) => (
        <Box
            key={index}
            sx={{
                display: "flex",
                flexDirection: "column", // Stack items vertically
                alignItems: "flex-start", // Align items to the start
                padding: "8px",
                borderRadius: "8px",
                marginBottom: index < novaOptions.length - 1 ? "8px" : 0, // Add spacing between items
                border: option.name === "NOVA Free" ? "2px solid #31a3a3" : "none", // Blue border for "NOVA Free"
                "&:hover": {
                    backgroundColor: "rgba(49, 163, 163, 0.1)", // Hover effect
                },
            }}
            onClick={() => console.log(`${option.name} selected`)}
        >
            {/* Option Name */}
            <Typography
                sx={{
                    fontSize: "14px",
                    color: "#d1cdcd",
                    fontWeight: option.name === "NOVA Free" ? "bold" : "normal",
                }}
            >
                {option.name}
            </Typography>

            {/* Rate */}
            <Typography
                sx={{
                    fontSize: "12px",
                    color: "#FFD700",
                    marginTop: "2px",
                }}
            >
                {option.rate}
            </Typography>

            {/* Micro-text for "Current Plan" */}
            {option.name === "NOVA Free" && (
                <Typography
                    sx={{
                        fontSize: "10px", // Micro-text size
                        color: "#31a3a3", // Match the blue border color
                        marginTop: "4px",
                    }}
                >
                    Current Plan
                </Typography>
            )}
        </Box>
    ))}

    {/* Divider */}
    <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", margin: "8px 0" }} />

    {/* Learn More About Subscriptions Option */}
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "8px",
            "&:hover": {
                backgroundColor: "rgba(49, 163, 163, 0.1)",
            },
        }}
        onClick={() => console.log("Learn more about subscriptions clicked")}
    >
        <Typography sx={{ fontSize: "14px", color: "#64B5F6", fontWeight: "bold" }}>
            Learn more about subscriptions
        </Typography>
    </Box>
</Popover>
        </Paper>
    );
}

export default Sidebar;