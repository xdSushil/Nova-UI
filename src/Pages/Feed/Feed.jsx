import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";

import ProfilePic from "../../Components/profilePic/Profilepic";

import "./Feed.css"
import FeedHeader from "../../Components/FeedHeader/FeedHeader";
function Feed() {


    return (
        <div>
            {/* header section with logo and search bar */}
            
            <FeedHeader />
            <Sidebar />
            <ProfilePic />


        </div>
    );
}

export default Feed;
