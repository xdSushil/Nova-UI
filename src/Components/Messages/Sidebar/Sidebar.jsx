import React, { useEffect, useState } from "react";
import { Box, List, ListItem, ListItemAvatar, Avatar, Typography } from "@mui/material";
import UserById from "../../../Services/UserById/UserById";

const Sidebar = ({ Connections, onSelectConnection }) => {
  const [connections, setConnections] = useState([])
  useEffect(()=>{
    setConnections(UserById(Connections.senderUserId))
  },[Connections])
  return (
    <Box
      sx={{
        width: "220px",
        height: "85vh",
        mt: "95px",
        ml:"160px",
        bgcolor: "#1e1e1e",
        color: "#e0e0e0",
        borderRadius: "25px",
        padding: "16px",
        overflowY: "auto",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Connections
      </Typography>
      <List>
        {Connections && Connections.map((Connection) => (
          <ListItem
            key={Connection._id}
            button
            onClick={() => onSelectConnection(Connection)}
            sx={{
            cursor:"pointer",
              bgcolor: "#2a2a2a",
              borderRadius: "12px",
              mb: 1,
              "&:hover": {
                bgcolor: "#333",
              }, 
            }}
          >
            <ListItemAvatar>
              <Avatar src={Connection.avatar} alt={Connection.companyName} />
            </ListItemAvatar>
            <Typography variant="subtitle1" sx={{ ml: 2 }}>
              {Connection.companyName}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;