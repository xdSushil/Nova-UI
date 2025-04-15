import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/UserContext";
import { Box } from "@mui/material";
import ChatHeader from "./ChatHeader/ChatHeader";
import MessageList from "./MessageList/MessageList";
import MessageInput from "./MessageInput/MessageInput";
import Sidebar from "./Sidebar/Sidebar";
import UserLayout from "../../Pages/UserLayout/User";

const ChatPage = () => {
  const User = useContext(AuthContext);
  const [connections, setConnections] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedConnection, setSelectedConnection] = useState(null);

  // Fetch all connections for the logged-in user
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/users/connections/${User.user.id}`
        );
        setConnections(response.data);
      } catch (error) {
        console.error("Error fetching connections:", error);
      }
    };

    fetchConnections();
  }, [User?.user?.id]);

  // Fetch messages for the selected connection
  const fetchMessages = async (senderId, receiverId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/chat/messages/${senderId}/${receiverId}`
      );
      setMessages(response.data.messages); // Update the state with fetched messages
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Handle selecting a connection
  const handleSelectConnection = (connection) => {
    setSelectedConnection(connection);
    // Fetch messages for the selected connection
    fetchMessages(User.user.id, connection._id);
  };

  useEffect(() => {
    let interval;

    if (selectedConnection) {
      fetchMessages(User.user.id, selectedConnection._id);
      interval = setInterval(() => {
        fetchMessages(User.user.id, selectedConnection._id);
      }, 5000); 
    }
    return () => clearInterval(interval);
  }, [selectedConnection]);

  // Send a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      // Send the new message to the backend
      const response = await axios.post("http://localhost:4000/api/chat/send", {
        senderId: User.user.id,
        receiverId: selectedConnection._id,
        content: newMessage,
      });

      // Add the sent message to the local state
      const sentMessage = {
        id: response.data.data._id,
        sender: "You",
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      
      setMessages([...messages, sentMessage]);
      setNewMessage(""); 
      fetchMessages(User.user.id, selectedConnection._id);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <UserLayout />
      {/* Parent Container for Sidebar and Chat Section */}
      <Box
        sx={{
          display: "flex",
          height: "85vh",
        }}
      >
        {/* Sidebar */}
        <Sidebar
          Connections={connections}
          onSelectConnection={handleSelectConnection}
        />

        {/* Chat Section */}
        {selectedConnection && (
          <Box
            sx={{
              flexGrow: 1,
              borderRadius: "25px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              bgcolor: "#121212",
              color: "#e0e0e0",
              padding: "16px",
              mt: "96px",
              marginLeft: "10px",
            }}
          >
            {/* Header */}
            <ChatHeader
              ConnectionName={selectedConnection.companyName}
              connectionAvatar={selectedConnection.avatar}
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
              <MessageList messages={messages} currentUserId={User?.user?.id} />
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