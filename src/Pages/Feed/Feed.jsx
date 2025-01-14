import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Box, TextField } from "@mui/material";
import ProfilePic from "../../Components/profilePic/Profilepic";

function Feed() {
    const [searchText, setSearchText] = useState("search..."); // State to hold the input value

    const handleSearchChange = (event) => {
        setSearchText(event.target.value); // Update state on user input
    };

    return (
        <div>
            
            <Sidebar />
            <ProfilePic />

            
        </div>
    );
}

export default Feed;
