import * as React from 'react';
import Switch from '@mui/joy/Switch';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

function Switches() {
  return (
    <Box
      display="flex"
      flexDirection="row"
      gap={2} // Gap between children
      alignItems="center"
    >
      <Switch
        slotProps={{
          track: {
            children: (
              <React.Fragment>
                <Typography
                  component="span"
                  level="inherit"
                  sx={{ ml: '10px', color: 'white' }} // Adjust text color for better contrast
                >
                  Vendor
                </Typography>
                <Typography
                  component="span"
                  level="inherit"
                  sx={{ mr: '8px', color: 'white' }}
                >
                  Customer
                </Typography>
              </React.Fragment>
            ),
          },
        }}
        sx={{
          '--Switch-thumbSize': '40px', // Increased thumb width
          '--Switch-trackWidth': '135px', // Track width
          '--Switch-trackHeight': '35px', // Track height
          '--Switch-thumbBackground': '#fff', // Thumb color
          '--Switch-trackBackground': '#ccc', // Default track color
          '--Switch-trackBorderRadius': '20px', // Smooth border for track
          '--Switch-trackColor': '#fff', // Track text color
          '--Switch-thumbShadow': '0 0 2px rgba(0,0,0,0.3)', // Optional shadow for thumb

          '&:hover': {
            '--Switch-trackBackground': '#b0b0b0', // Hover color for track
          },
          '&.Mui-checked': {
            '--Switch-trackBackground': '#4caf50', // Custom "on" color
            '--Switch-thumbBackground': '#4caf50', // Thumb blends with track color
          },
        }}
      />
    </Box>
  );
}

export default Switches;
