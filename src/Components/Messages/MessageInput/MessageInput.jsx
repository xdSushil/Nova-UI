import React from "react";
import { TextField, Button, Box } from "@mui/material";

const MessageInput = ({ newMessage, setNewMessage, handleSendMessage }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "8px",
        mt: 2,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        InputProps={{
          style: { color: "#e0e0e0" }, // Text color inside the input
        }}
        sx={{
          transition: "border-color 0.3s ease",
          bgcolor: "#1e1e1e", // Background color of the input
          borderRadius: "24px", // Rounded corners for the TextField
          "& .MuiOutlinedInput-root": {
            borderRadius: "24px", // Ensure inner container has rounded corners
            "& fieldset": {
              borderColor: "transparent", // Remove default border
            },
            "&:hover fieldset": {
              borderColor: "gray", // Border color on hover
              borderRadius: "24px", // Ensure hover state has rounded corners
            },
            "&.Mui-focused fieldset": {
              borderColor: "gray", // Border color when focused
              borderRadius: "24px", // Ensure focus state has rounded corners
            },
            "&.Mui-focused": {
              boxShadow: "0 0 8px rgba(128, 128, 128, 0.5)",
            },
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleSendMessage}
        sx={{
          borderRadius:"30px",
          height:"90%",
          width:"10%",
          mt:"5px",
          bgcolor: "#08595e",
          "&:hover": { bgcolor: "#06454a" },
        }}
      >
        Send
      </Button>
    </Box>
  );
};

export default MessageInput;