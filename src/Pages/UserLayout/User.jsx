import React from 'react';
import { Box } from '@mui/material';
import FeedHeader from '../../Components/FeedHeader/FeedHeader';
import Sidebar from '../../Components/Sidebar/Sidebar';
import ProfilePic from '../../Components/profilePic/Profilepic';

function User() {
  return (
    <Box>
      <FeedHeader />
      <Sidebar />
      <ProfilePic />
    </Box>
  );
}

export default User;
