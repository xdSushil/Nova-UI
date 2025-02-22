import React, { useState } from "react";
import {
    Container,
    Box,
    Typography,
    List,
    Divider,
    styled,
} from "@mui/material";
import UserLayout from "../../Pages/UserLayout/User";
import AnimatedListItem from "./ListItems/ListItems";
import MyProfile from "./Tabs/MyProfile/MyProfile";

// Custom Styled Components
const Sidebar = styled(Box)(({ theme }) => ({
    width: "200px",
    backgroundColor: "transparent", // Light background for sidebar
    padding: "16px",
    borderRadius: "18px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginTop: "70px",

}));

const ContentArea = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    marginLeft: "0px",
    backgroundColor: "transparent", // White background for content
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginTop: "70px"
}
));

const Profile = () => {
    const [activeTab, setActiveTab] = useState("view-profile");
    return (
        <>
            <UserLayout />
            {/* Main Content */}
            <Container
                sx={{
                    marginTop: "40px",
                    display: "flex",
                    gap: "32px",
                }}
            >
                {/* Sidebar Menu */}
                <Sidebar>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 1, color: "gray" }}
                    >
                        Profile Settings
                    </Typography>
                    <List>
                        {/* Basic Profile Options */}
                        <AnimatedListItem
                            text="View Profile"
                            value="view-profile"
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                        {/* Edit Profile */}
                        <AnimatedListItem
                            text="Edit Profile"
                            value="edit-profile"
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />

                        {/* Change Password */}
                        <AnimatedListItem
                            text="Change Password"
                            value="change-password"
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />

                        {/* Manage Employee Roles */}
                        <AnimatedListItem
                            text="Employee Roles"
                            value="manage-roles"
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />

                        {/* Danger Zone */}
                        <Divider sx={{ my: 5, borderColor: "#d0d7de" }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#cf222e", mb: 1 }}>
                            Danger Zone
                        </Typography>

                        {/* Deactivate Account */}
                        <AnimatedListItem
                            text="Deactivate Account"
                            value="deactivate-account"
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />

                        {/* Delete Account */}
                        <AnimatedListItem
                            text="Delete Account"
                            value="delete-account"
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                    </List>
                </Sidebar>

                {/* Content Area */}
                <ContentArea>
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: "bold", mb: 2, color: "#24292f" }}
                    >
                        {activeTab === "view-profile"
                            ? <MyProfile />
                            : activeTab === "edit-profile"
                                ? "Edit Profile"
                                : activeTab === "change-password"
                                    ? "Change Password"
                                    : activeTab === "manage-roles"
                                        ? "Manage Employee Roles"
                                        : activeTab === "deactivate-account"
                                            ? "Deactivate Account"
                                            : activeTab === "delete-account"
                                                ? "Delete Account"
                                                : "Select an Option"}
                    </Typography>
                </ContentArea>
            </Container>
        </>
    );
};

export default Profile;