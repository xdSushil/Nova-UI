import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'; // Import the upward arrow icon

function ChatCard({ onSendMessage }) {
  const [message, setMessage] = React.useState('');

  // Handle sending a new message
  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  // Handle Enter key press
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#36393f',
        borderRadius: '15px', // Curved edges for the chat card
        padding: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional: Add a subtle shadow
      }}
    >
      {/* Chat Input Field */}
      <TextField
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown} // Listen for "Enter" key
        placeholder="Type a message..."
        variant="outlined"
        size="small"
        sx={{
          backgroundColor: '#40444b',
          borderRadius: '20px', // Make the input field rounded
          input: { color: 'white' },
        }}
      />

      {/* Send Button (Round with Upward Arrow) */}
      <IconButton
        onClick={handleSendMessage}
        sx={{
          marginLeft: '10px',
          backgroundColor: '#7289da', // Discord-like blue color
          color: 'white',
          borderRadius: '50%', // Make the button round
          width: '40px', // Fixed size for the button
          height: '40px', // Fixed size for the button
          '&:hover': {
            backgroundColor: '#5b67c2', // Slightly darker blue on hover
          },
        }}
      >
        <ArrowUpwardIcon /> {/* Upward arrow icon */}
      </IconButton>
    </Box>
  );
}

export default ChatCard;