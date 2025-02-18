import React from "react";
import { Box } from "@mui/material";
import ConnectionCard from "../../ConnectionCard/ConnectionCard";

const FindTab = ({ users, connections, user }) => {
  // Filter users who are not connected
  const filteredUsers = users.filter((userData) => {
    if (connections.length === 0) {
        return true; // Include all users when connections is empty
    }else{
        const connection = connections.find(
          (conn) =>
            (conn.senderUserId === user?.id && conn.receiverUserId === userData._id) ||
            (conn.receiverUserId === user?.id && conn.senderUserId === userData._id)
        );
        return !connection; // Show users with no existing connection
    }
  });

  return (
    <Box>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((userData) => (
          <ConnectionCard
            key={userData._id}
            userData={userData}
            connectionStatus="stranger"
          />
        ))
      ) : (
        <Box>No users available</Box>
      )}
    </Box>
  );
};

export default FindTab;