import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Paper, Box } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';

function Sidebar() {
    const [activeIcon, setActiveIcon] = useState(0.10); // Default active icon
    const [hoveredLabel, setHoveredLabel] = useState(null); // To track hovered icon
    const navigate = useNavigate();

    const icons = [
        { id: 0.10, Icon: HomeOutlinedIcon, label: 'Home' },
        { id: 1.10, Icon: AssessmentOutlinedIcon, label: 'Analytics' },
        { id: 2.05, Icon: StorefrontOutlinedIcon, label: 'Store' },
        { id: 3.02, Icon: AddBusinessOutlinedIcon, label: 'Network' },
        { id: 4, Icon: ChatBubbleOutlineOutlinedIcon, label: 'Chats' },
        { id: 4.96, Icon: SettingsOutlinedIcon, label: 'Settings' },
    ];

    // Load active icon from localStorage on mount
    useEffect(() => {
        const storedIcon = localStorage.getItem('activeIcon');
        if (storedIcon) {
            setActiveIcon(parseFloat(storedIcon)); // Convert string to float
        }
    }, []);

    // Update localStorage whenever activeIcon changes
    const handleIconClick = (id, label) => {
        setActiveIcon(id);
        localStorage.setItem('activeIcon', id); // Save active icon to localStorage
        navigate("/" + label); // Navigate to the selected route
    };

    return (
        <Paper
            sx={{
                backgroundColor: "#1a1919",
                height: {
                    xs: "60vh",
                    sm: "80vh",
                },
                width: {
                    xs: "10vw",
                    sm: "4vw",
                },
                borderRadius: "13px",
                position: "absolute",
                left: {
                    sm: "1.2%",
                    xs: "3%",
                },
                bottom: "9%",
                boxShadow: "0px 4px 25px 5px #1a1919",
                color: "#d1cdcd",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: {
                    xs: 8,
                    sm: 10,
                },
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: `${activeIcon * 18}%`, // Dynamically position the background
                    left: "9.5%",
                    width: {
                        sm: "3.2vw",
                        xs: "2.5vw",
                    },
                    height: {
                        sm: "6.5vh",
                        xs: "4vh",
                    },
                    backgroundColor: '#31a3a3',
                    zIndex: 0,
                    borderRadius: '15px',
                    transition: 'top 0.3s ease',
                    boxShadow: '0px 18px 15px rgba(0, 0, 0, 0.2)',
                }}
            ></Box>

            {icons.map(({ id, Icon, label }) => (
                <Box
                    key={id}
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: "transparent"
                    }}
                    onMouseEnter={() => setHoveredLabel(label)}
                    onMouseLeave={() => setHoveredLabel(null)}
                    onClick={() => handleIconClick(id, label)}
                >
                    <Icon
                        sx={{
                            backgroundColor: "transparent",
                            fontSize: {
                                xs: "20px",
                                sm: "23px",
                            },
                            color: activeIcon === id ? "black" : "#d1cdcd",
                            zIndex: 1,
                            cursor: "pointer",
                            "&:hover": {
                                color: "white",
                                fontSize: {
                                    xs: "22px",
                                    sm: "28px",
                                },
                            },
                        }}
                    />
                    {hoveredLabel === label && (
                        <Box
                            sx={{
                                position: 'absolute',
                                left: '110%',
                                backgroundColor: 'transparent',
                                color: '#d1cdcd',
                                padding: '2px 5px',
                                fontSize: '14px',
                                borderRadius: '4px',
                                pointerEvents: 'none',
                            }}
                        >
                            {label}
                        </Box>
                    )}
                </Box>
            ))}
        </Paper>
    );
}

export default Sidebar;
