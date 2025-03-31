import React from "react";
import { List, ListItem, Avatar, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const MessageList = ({ messages }) => {
  return (
    <List sx={{ flexGrow: 1, overflowY: "auto", padding: 0 }}>
      {messages.map((msg) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ListItem
            sx={{
              display: "flex",
              flexDirection: msg.sender === "You" ? "row-reverse" : "row",
              alignItems: "flex-start",
              gap: 1,
            }}
          >
            {/* Avatar */}
            <Avatar
              sx={{
                bgcolor: "#08595e",
                alignSelf: msg.sender === "You" ? "flex-end" : "flex-start",
              }}
            >
              {msg.sender[0]}
            </Avatar>

            {/* Message Content */}
            <Box
              sx={{
                maxWidth: "40%", // Limit width for better readability
                bgcolor: "#08595e",
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
                    {msg.text}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      flexShrink: 0, // Prevents timestamp from shrinking
                      color: "#e0e0e0", // Slightly lighter color for timestamp
                    }}
                  >
                    {msg.timestamp}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </ListItem>
        </motion.div>
      ))}
    </List>
  );
};

export default MessageList;