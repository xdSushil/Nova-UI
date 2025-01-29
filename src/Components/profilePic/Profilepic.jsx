import { Box } from '@mui/material'
import React from 'react'

function ProfilePic() {
  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        width: {
          xs: "9.5vw",
          sm: "3.7vw"

        },
        height: "7vh",
        borderRadius: "5px",
        overflow: "hidden",
        
        bottom: "5px",
        position: "fixed", // Fixed to the screen

        left: 20, // Span the full width

      }}>
      <img src='/profilepic.webp' alt='profile'
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }} />
    </Box>
  )
}

export default ProfilePic