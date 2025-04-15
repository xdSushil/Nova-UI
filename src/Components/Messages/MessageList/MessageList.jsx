import React, { useContext } from "react";
import { List, ListItem, Avatar, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { AuthContext } from "../../../Providers/UserContext";

const MessageList = ({ messages, currentUserId }) => {
  const { user } = useContext(AuthContext)
  return (
    <List sx={{ flexGrow: 1, overflowY: "auto", padding: 0 }}>
      {messages.map((msg) => {
        // Determine if the message was sent by the current user
        const isSentByCurrentUser = msg.sender === currentUserId;

        return (
          <motion.div
            key={msg._id} // Use the unique message ID from the backend
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ListItem
              sx={{
                display: "flex",
                flexDirection: isSentByCurrentUser ? "row-reverse" : "row",
                alignItems: "flex-start",
                gap: 1,
              }}
            >
              {/* Avatar */}
              <Avatar
                sx={{
                  bgcolor: isSentByCurrentUser ? "#08595e" : "#3f51b5", // Different colors for sender/receiver
                  alignSelf: isSentByCurrentUser ? "flex-end" : "flex-start",
                }}
              >
                {isSentByCurrentUser ? user.companyName : "Them"} {/* Display initials */}
              </Avatar>

              {/* Message Content */}
              <Box
                sx={{
                  maxWidth: "60%", // Limit width for better readability
                  bgcolor: isSentByCurrentUser ? "#08595e" : "#3f51b5", // Different colors for sender/receiver
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  alignSelf: "flex-start",
                }}
              >
                {/* Flex Container for Text and Timestamp */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  {/* Text with Timestamp */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        wordBreak: "break-word", // Ensures long text wraps
                        marginRight: "8px", // Space between text and timestamp
                      }}
                    >
                      {msg.content} {/* Use the decrypted content from the backend */}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        flexShrink: 0, // Prevents timestamp from shrinking
                        color: "#e0e0e0", // Slightly lighter color for timestamp
                      }}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </ListItem>
          </motion.div>
        );
      })}
    </List>
  );
};

export default MessageList;