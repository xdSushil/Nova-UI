import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./HomePage.css";

const HomePage = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);

    // Ensure navigation works
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="homepage-container">
            {/* Header Section */}
            <header className="header">
                <button onClick={() => handleNavigation("/register")} className="btn register-btn">
                    Register
                </button>
                <button onClick={() => handleNavigation("/login")} className="btn login-btn">
                    Login
                </button>
            </header>

            {/* Planets Section */}
            <div className="planets-wrapper">
                {/* Vendor Planet */}
                <motion.div
                    className={`planet vendor-planet ${selected === "vendor" ? "active" : ""}`}
                    initial={{ x: "-100%" }}
                    animate={{ x: selected === "vendor" ? "0%" : "-100%" }}
                    transition={{ duration: 0.8 }}
                    onClick={() => setSelected(selected === "vendor" ? null : "vendor")}
                >
                    <div className="planet-ring vendor-ring"></div>
                    {selected === "vendor" && (
                        <div className="planet-info">
                            <h2>Vendor</h2>
                            <p>Manage your business efficiently with Nova's B2B solutions.</p>
                        </div>
                    )}
                </motion.div>

                {/* Client Planet */}
                <motion.div
                    className={`planet client-planet ${selected === "client" ? "active" : ""}`}
                    initial={{ x: "100%" }}
                    animate={{ x: selected === "client" ? "0%" : "100%" }}
                    transition={{ duration: 0.8 }}
                    onClick={() => setSelected(selected === "client" ? null : "client")}
                >
                    <div className="planet-ring client-ring"></div>
                    {selected === "client" && (
                        <div className="planet-info">
                            <h2>Client</h2>
                            <p>Connect with vendors seamlessly and enhance collaboration.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default HomePage;
