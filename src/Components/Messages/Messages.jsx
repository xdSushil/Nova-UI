import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/UserContext"
import { Box } from "@mui/material";
import ChatHeader from "./ChatHeader/ChatHeader";
import MessageList from "./MessageList/MessageList";
import MessageInput from "./MessageInput/MessageInput";
import Sidebar from "./Sidebar/Sidebar";
import UserLayout from "../../Pages/UserLayout/User";

const ChatPage = () => {
  const User = useContext(AuthContext)
  const [ connections, setConnections ] = useState ([]);
  useEffect(()=>{
    const fetchConnections = async () => {
    try{
      const response = await axios.get(`http://localhost:4000/api/connections/accepted/${User.user.id}`)
      setConnections(response.data.data);
    }catch(error){
      console.log("Error fetching Connections:", error);
    }
  }
  fetchConnections();
  },[])
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedConnection, setSelectedConnection] = useState(null);

  // Fetch or initialize messages for the selected Connection
  const handleSelectConnection = (connection) => {
    setSelectedConnection(connection);
    // Simulate fetching messages for the selected Connection
    setMessages([
      { id: 1, sender: "Connection", text: "Hey, how are you?", timestamp: "10:00 AM" },
      { id: 2, sender: "You", text: "I'm good! What about you?", timestamp: "10:01 AM" },
    ]);
  };

  // Add a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: messages.length + 1,
      sender: "You",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMsg]);
    setNewMessage(""); // Clear input
  };

  return (
    <>
      <UserLayout />
      {/* Parent Container for Sidebar and Chat Section */}
      <Box
        sx={{
          display: "flex", // Use flexbox for horizontal alignment
          height: "85vh", // Ensure consistent height
        }}
      >
        {/* Sidebar */}
        <Sidebar
          Connections = {connections}
          onSelectConnection={handleSelectConnection}
        />

        {/* Chat Section */}
        {selectedConnection && (
          <Box
            sx={{
              flexGrow: 1, // Take up remaining space
              borderRadius: "25px",
              height: "100%", // Full height of the parent container
              display: "flex",
              flexDirection: "column",
              bgcolor: "#121212",
              color: "#e0e0e0",
              padding: "16px",
              mt:"96px",
              marginLeft: "10px", // Space between sidebar and chat section
            }}
          >
            {/* Header */}
            <ChatHeader
              ConnectionName={selectedConnection.name}
              ConnectionAvatar={selectedConnection.avatar}
            />

            {/* Messages Container */}
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                border: "1px solid #333",
                borderRadius: "12px",
                padding: "16px",
                bgcolor: "#1e1e1e",
              }}
            >
              <MessageList messages={messages} />
            </Box>

            {/* Input Section */}
            <MessageInput
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default ChatPage;