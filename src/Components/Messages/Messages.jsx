import React, { useState } from 'react';
import { useMode } from '../../Providers/ModeContext';
import User from '../../Pages/UserLayout/User';
import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Tooltip,
  Button,
  Badge,
} from '@mui/material';
import ChatCard from './ChatCard'; // Import the ChatCard component

function Messages() {
  const { mode } = useMode();

  // Define a color map for each company
  const companyColors = {
    TechCorp: '#7289da', // Discord-like blue
    GreenEnergy: '#43b581', // Green
    RedSteel: '#f04747', // Red
    You: '#faa61a', // Orange (for the current user)
    Peer1: '#7289da', // Blue for Peer1
    Peer2: '#43b581', // Green for Peer2
    VendorA: '#f04747', // Red for VendorA
    VendorB: '#faa61a', // Orange for VendorB
    Loop: '#ff6b6b', // Coral color for Loop
    GroupChat: '#9b59b6', // Purple color for Group Chat
    BroadcastSupplies: '#f1c40f', // Yellow for Supplies
    BroadcastProduct: '#3498db', // Blue for Product
  };

  // Initial chat messages for each section
  const initialChats = {
    B2B: {
      TechCorp: [
        { sender: 'TechCorp', text: 'Hello! How can we assist you?', timestamp: '2023-10-01T10:00:00Z' },
        { sender: 'You', text: 'We need a quote for bulk orders.', timestamp: '2023-10-01T10:05:00Z' },
      ],
      GreenEnergy: [
        { sender: 'GreenEnergy', text: 'We are ready to collaborate!', timestamp: '2023-10-02T12:00:00Z' },
      ],
    },
    Peers: {
      Peer1: [
        { sender: 'Peer1', text: 'Hey, let’s discuss the project timeline.', timestamp: '2023-10-03T09:00:00Z' },
      ],
      Peer2: [
        { sender: 'Peer2', text: 'Sure, I’ll share the updated schedule.', timestamp: '2023-10-03T09:10:00Z' },
      ],
    },
    ThirdParty: {
      VendorA: [
        { sender: 'VendorA', text: 'Your order will be shipped tomorrow.', timestamp: '2023-10-04T15:00:00Z' },
      ],
      VendorB: [
        { sender: 'VendorB', text: 'Please confirm the payment details.', timestamp: '2023-10-04T15:05:00Z' },
      ],
    },
    Loop: {}, // Empty for now
    GroupChat: {
      // Dummy group chats
      'Team Discussion': [
        { sender: 'You', text: 'Let’s finalize the project milestones by EOD.', timestamp: '2023-10-05T10:00:00Z' },
        { sender: 'Peer1', text: 'Agreed. I’ll send the updated timeline shortly.', timestamp: '2023-10-05T10:05:00Z' },
        { sender: 'Peer2', text: 'I’ve shared the resource allocation plan in the drive.', timestamp: '2023-10-05T10:10:00Z' },
      ],
      'Marketing Strategy': [
        { sender: 'You', text: 'We need to focus on social media campaigns this quarter.', timestamp: '2023-10-06T11:00:00Z' },
        { sender: 'GreenEnergy', text: 'I suggest targeting LinkedIn for B2B leads.', timestamp: '2023-10-06T11:05:00Z' },
        { sender: 'TechCorp', text: 'Agreed. Also, let’s explore Instagram for brand awareness.', timestamp: '2023-10-06T11:10:00Z' },
      ],
    },
  };

  // Initial requests for each section
  const initialRequests = {
    B2B: {
      NewCorp: [{ sender: 'NewCorp', text: 'Request for collaboration proposal', timestamp: '2023-10-01T09:00:00Z' }],
      EnergyCo: [{ sender: 'EnergyCo', text: 'Request for partnership agreement', timestamp: '2023-10-02T08:00:00Z' }],
    },
    Peers: {
      Peer3: [{ sender: 'Peer3', text: 'Request for project timeline update', timestamp: '2023-10-03T07:00:00Z' }],
      Peer4: [{ sender: 'Peer4', text: 'Request for resource allocation', timestamp: '2023-10-04T06:00:00Z' }],
    },
    ThirdParty: {
      VendorC: [{ sender: 'VendorC', text: 'Request for payment confirmation', timestamp: '2023-10-05T05:00:00Z' }],
      VendorD: [{ sender: 'VendorD', text: 'Request for delivery address', timestamp: '2023-10-06T04:00:00Z' }],
    },
    Loop: {}, // Empty for now
    GroupChat: {}, // Empty for now
  };

  // Organize users into sections (separate for chats and requests)
  const initialSectionUsers = {
    B2B: {
      chats: ['TechCorp', 'GreenEnergy'], // Users in the B2B section for chats
      requests: ['NewCorp', 'EnergyCo'], // Users in the B2B section for requests
    },
    Peers: {
      chats: ['Peer1', 'Peer2'], // Users in the Peers section for chats
      requests: ['Peer3', 'Peer4'], // Users in the Peers section for requests
    },
    ThirdParty: {
      chats: ['VendorA', 'VendorB'], // Users in the Third-Party section for chats
      requests: ['VendorC', 'VendorD'], // Users in the Third-Party section for requests
    },
    Loop: {
      chats: [], // Empty for now
      requests: [], // Empty for now
    },
    GroupChat: {
      chats: ['Team Discussion', 'Marketing Strategy'], // Dummy group chats
      requests: [], // Empty for now
    },
  };

  // State to track the active section in the vertical bar
  const [activeSection, setActiveSection] = useState('B2B'); // Default active section

  // State to track whether to show chats or requests
  const [viewMode, setViewMode] = useState('chats'); // 'chats' or 'requests'

  // State to track the selected user for individual chat
  const [selectedUser, setSelectedUser] = useState(null);

  // State to track unread messages count for each user
  const [unreadCounts, setUnreadCounts] = useState({});

  // Separate state for each section
  const [sectionStates, setSectionStates] = useState({
    B2B: {
      chats: initialChats.B2B,
      requests: initialRequests.B2B,
      sectionUsers: initialSectionUsers.B2B,
    },
    Peers: {
      chats: initialChats.Peers,
      requests: initialRequests.Peers,
      sectionUsers: initialSectionUsers.Peers,
    },
    ThirdParty: {
      chats: initialChats.ThirdParty,
      requests: initialRequests.ThirdParty,
      sectionUsers: initialSectionUsers.ThirdParty,
    },
    Loop: {
      chats: initialChats.Loop,
      requests: initialRequests.Loop,
      sectionUsers: initialSectionUsers.Loop,
    },
    GroupChat: {
      chats: initialChats.GroupChat,
      requests: initialRequests.GroupChat,
      sectionUsers: initialSectionUsers.GroupChat,
    },
  });

  // Function to handle sending a new message
  const handleSendMessage = (newMessage) => {
    if (!selectedUser) return; // Ensure a user is selected

    // Create a new message object with a timestamp
    const newMsg = { sender: 'You', text: newMessage, timestamp: new Date().toISOString() };

    // Update the chats for the selected user in the active section
    setSectionStates((prevSectionStates) => {
      const updatedChats = {
        ...prevSectionStates[activeSection].chats,
        [selectedUser]: [
          ...(prevSectionStates[activeSection].chats[selectedUser] || []),
          newMsg,
        ],
      };

      return {
        ...prevSectionStates,
        [activeSection]: {
          ...prevSectionStates[activeSection],
          chats: updatedChats,
        },
      };
    });
  };

  // Function to simulate receiving a new message
  const simulateNewMessage = (user, sender, text) => {
    const newMsg = { sender, text, timestamp: new Date().toISOString() };

    setSectionStates((prevSectionStates) => {
      const updatedChats = {
        ...prevSectionStates[activeSection].chats,
        [user]: [
          ...(prevSectionStates[activeSection].chats[user] || []),
          newMsg,
        ],
      };

      return {
        ...prevSectionStates,
        [activeSection]: {
          ...prevSectionStates[activeSection],
          chats: updatedChats,
        },
      };
    });

    // Increment unread count if the user is not selected
    if (selectedUser !== user) {
      setUnreadCounts((prevCounts) => ({
        ...prevCounts,
        [user]: (prevCounts[user] || 0) + 1,
      }));
    }
  };

  // Function to accept a request
  const handleAcceptRequest = (user) => {
    setSectionStates((prevSectionStates) => {
      const updatedSectionUsers = {
        ...prevSectionStates[activeSection].sectionUsers,
        requests: prevSectionStates[activeSection].sectionUsers.requests.filter(
          (u) => u !== user
        ),
        chats: [...prevSectionStates[activeSection].sectionUsers.chats, user],
      };

      const updatedRequests = { ...prevSectionStates[activeSection].requests };
      delete updatedRequests[user];

      return {
        ...prevSectionStates,
        [activeSection]: {
          ...prevSectionStates[activeSection],
          sectionUsers: updatedSectionUsers,
          requests: updatedRequests,
          chats: {
            ...prevSectionStates[activeSection].chats,
            [user]: [],
          },
        },
      };
    });
  };

  // Function to reject a request
  const handleRejectRequest = (user) => {
    setSectionStates((prevSectionStates) => {
      const updatedSectionUsers = {
        ...prevSectionStates[activeSection].sectionUsers,
        requests: prevSectionStates[activeSection].sectionUsers.requests.filter(
          (u) => u !== user
        ),
      };

      const updatedRequests = { ...prevSectionStates[activeSection].requests };
      delete updatedRequests[user];

      return {
        ...prevSectionStates,
        [activeSection]: {
          ...prevSectionStates[activeSection],
          sectionUsers: updatedSectionUsers,
          requests: updatedRequests,
        },
      };
    });
  };

  // Function to mark messages as read when a chat is selected
  const markAsRead = (user) => {
    setUnreadCounts((prevCounts) => ({
      ...prevCounts,
      [user]: 0, // Reset unread count for the selected user
    }));
  };

  // Update chats and requests when switching sections
  const switchSection = (section) => {
    setActiveSection(section);
    setSelectedUser(null); // Reset selected user when switching sections
    setViewMode('chats'); // Reset view mode to "Chats"
  };

  // Destructure the active section's state for easier access
  const { chats, requests, sectionUsers } = sectionStates[activeSection];

  return (
    <>
      <User />
      <Container
        sx={{
          display: 'flex',
          height: 'calc(90vh)', // Increase the height to fill more of the viewport
          paddingTop: '150px', // Lower everything by increasing padding at the top
        }}
      >
        {/* Parent Container for All Vertical Bars */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column', // Stack all vertical bars vertically
            alignItems: 'center',
            marginRight: '10px', // Space between the vertical bars and the sidebar
          }}
        >
          {/* First Vertical Bar: Loop and Group Chat */}
          <Box
            sx={{
              width: '60px', // Fixed width for the small vertical bar
              backgroundColor: '#2f3136', // Background color matching the sidebar
              padding: '10px 5px', // Padding inside the bar
              borderRadius: '15px', // Curved edges for the bar
              marginBottom: '20px', // Space between the two vertical bars
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional: Add a subtle shadow
            }}
          >
            {/* Loop */}
            <Tooltip title="Loop" placement="right">
              <Box
                onClick={() => switchSection('Loop')}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginBottom: '10px', // Space between sections
                  padding: '5px', // Reduced padding for compactness
                  borderRadius: '50%', // Circle shape for the icon
                  border: '2px solid', // Thicker outline for the section
                  borderColor: activeSection === 'Loop' ? '#ff6b6b' : '#40444b', // Highlight if active
                  backgroundColor: activeSection === 'Loop' ? '#40444b' : 'transparent', // Shaded background if active
                  cursor: 'pointer',
                  transition: 'background-color 0.3s, border-color 0.3s', // Smooth hover effect
                  '&:hover': {
                    borderColor: '#ff6b6b', // Slightly darker color on hover
                    backgroundColor: '#40444b', // Shaded background on hover
                  },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: '#ffffff', // White text for better visibility
                    fontSize: '10px',
                    fontWeight: 'bold',
                    padding: '8px 12px', // More padding for a square shape
                    borderRadius: '50%', // Circle shape for the icon
                    backgroundColor: '#ff6b6b', // Coral color for the Loop icon
                  }}
                >
                  L
                </Typography>
              </Box>
            </Tooltip>

            {/* Group Chat */}
            <Tooltip title="Group Chat" placement="right">
              <Box
                onClick={() => switchSection('GroupChat')}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '5px', // Reduced padding for compactness
                  borderRadius: '50%', // Circle shape for the icon
                  border: '2px solid', // Thicker outline for the section
                  borderColor: activeSection === 'GroupChat' ? '#9b59b6' : '#40444b', // Highlight if active
                  backgroundColor: activeSection === 'GroupChat' ? '#40444b' : 'transparent', // Shaded background if active
                  cursor: 'pointer',
                  transition: 'background-color 0.3s, border-color 0.3s', // Smooth hover effect
                  '&:hover': {
                    borderColor: '#9b59b6', // Slightly darker color on hover
                    backgroundColor: '#40444b', // Shaded background on hover
                  },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: '#ffffff', // White text for better visibility
                    fontSize: '10px',
                    fontWeight: 'bold',
                    padding: '8px 12px', // More padding for a square shape
                    borderRadius: '50%', // Circle shape for the icon
                    backgroundColor: '#9b59b6', // Purple color for the Group Chat icon
                  }}
                >
                  G
                </Typography>
              </Box>
            </Tooltip>
          </Box>

          {/* Second Vertical Bar: B2B, Peers, Third-Party */}
          <Box
            sx={{
              width: '60px', // Fixed width for the small vertical bar
              backgroundColor: '#2f3136', // Background color matching the sidebar
              padding: '10px 5px', // Padding inside the bar
              borderRadius: '15px', // Curved edges for the bar
              marginBottom: '20px', // Space between the two vertical bars
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional: Add a subtle shadow
            }}
          >
            {/* Business to Business */}
            <Tooltip title="Business to Business" placement="right">
              <Box
                onClick={() => switchSection('B2B')}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginBottom: '10px', // Space between sections
                  padding: '5px', // Reduced padding for compactness
                  borderRadius: '50%', // Circle shape for the icon
                  border: '2px solid', // Thicker outline for the section
                  borderColor: activeSection === 'B2B' ? '#7289da' : '#40444b', // Highlight if active
                  backgroundColor: activeSection === 'B2B' ? '#40444b' : 'transparent', // Shaded background if active
                  cursor: 'pointer',
                  transition: 'background-color 0.3s, border-color 0.3s', // Smooth hover effect
                  '&:hover': {
                    borderColor: '#7289da', // Slightly darker color on hover
                    backgroundColor: '#40444b', // Shaded background on hover
                  },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: '#ffffff', // White text for better visibility
                    fontSize: '10px',
                    fontWeight: 'bold',
                    padding: '8px 12px', // More padding for a square shape
                    borderRadius: '50%', // Circle shape for the icon
                    backgroundColor: '#7289da', // Colored background for the icon
                  }}
                >
                  B
                </Typography>
              </Box>
            </Tooltip>

            {/* Peers */}
            <Tooltip title="Peers" placement="right">
              <Box
                onClick={() => switchSection('Peers')}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginBottom: '10px', // Space between sections
                  padding: '5px', // Reduced padding for compactness
                  borderRadius: '50%', // Circle shape for the icon
                  border: '2px solid', // Thicker outline for the section
                  borderColor: activeSection === 'Peers' ? '#43b581' : '#40444b', // Highlight if active
                  backgroundColor: activeSection === 'Peers' ? '#40444b' : 'transparent', // Shaded background if active
                  cursor: 'pointer',
                  transition: 'background-color 0.3s, border-color 0.3s', // Smooth hover effect
                  '&:hover': {
                    borderColor: '#43b581', // Slightly darker color on hover
                    backgroundColor: '#40444b', // Shaded background on hover
                  },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: '#ffffff',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    padding: '8px 12px', // More padding for a square shape
                    borderRadius: '50%', // Circle shape for the icon
                    backgroundColor: '#43b581', // Colored background for the icon
                  }}
                >
                  P
                </Typography>
              </Box>
            </Tooltip>

            {/* Third-Party Services */}
            <Tooltip title="Third-Party Services" placement="right">
              <Box
                onClick={() => switchSection('ThirdParty')}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '5px', // Reduced padding for compactness
                  borderRadius: '50%', // Circle shape for the icon
                  border: '2px solid', // Thicker outline for the section
                  borderColor: activeSection === 'ThirdParty' ? '#f04747' : '#40444b', // Highlight if active
                  backgroundColor: activeSection === 'ThirdParty' ? '#40444b' : 'transparent', // Shaded background if active
                  cursor: 'pointer',
                  transition: 'background-color 0.3s, border-color 0.3s', // Smooth hover effect
                  '&:hover': {
                    borderColor: '#f04747', // Slightly darker color on hover
                    backgroundColor: '#40444b', // Shaded background on hover
                  },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: '#ffffff',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    padding: '8px 12px', // More padding for a square shape
                    borderRadius: '50%', // Circle shape for the icon
                    backgroundColor: '#f04747', // Colored background for the icon
                  }}
                >
                  T
                </Typography>
              </Box>
            </Tooltip>
          </Box>

          {/* Third Vertical Bar: Broadcast Supplies and Product */}
          <Box
            sx={{
              width: '60px', // Fixed width for the small vertical bar
              backgroundColor: '#2f3136', // Background color matching the sidebar
              padding: '10px 5px', // Padding inside the bar
              borderRadius: '15px', // Curved edges for the bar
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional: Add a subtle shadow
            }}
          >
            {/* Broadcast Requests for Supplies */}
            <Tooltip title="Broadcast Requests for Supplies" placement="right">
              <Box
                onClick={() => alert('Broadcasting Requests for Supplies')} // Placeholder action
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginBottom: '10px', // Space between sections
                  padding: '5px', // Reduced padding for compactness
                  borderRadius: '50%', // Circle shape for the icon
                  border: '2px solid', // Thicker outline for the section
                  borderColor: activeSection === 'BroadcastSupplies' ? '#f1c40f' : '#40444b', // Highlight if active
                  backgroundColor: activeSection === 'BroadcastSupplies' ? '#40444b' : 'transparent', // Shaded background if active
                  cursor: 'pointer',
                  transition: 'background-color 0.3s, border-color 0.3s', // Smooth hover effect
                  '&:hover': {
                    borderColor: '#f1c40f', // Slightly darker color on hover
                    backgroundColor: '#40444b', // Shaded background on hover
                  },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: '#ffffff',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    padding: '8px 12px', // More padding for a square shape
                    borderRadius: '50%', // Circle shape for the icon
                    backgroundColor: '#f1c40f', // Yellow color for Supplies
                  }}
                >
                  S
                </Typography>
              </Box>
            </Tooltip>

            {/* Broadcast Your Product */}
            <Tooltip title="Broadcast Your Product" placement="right">
              <Box
                onClick={() => alert('Broadcasting Your Product')} // Placeholder action
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '5px', // Reduced padding for compactness
                  borderRadius: '50%', // Circle shape for the icon
                  border: '2px solid', // Thicker outline for the section
                  borderColor: activeSection === 'BroadcastProduct' ? '#3498db' : '#40444b', // Highlight if active
                  backgroundColor: activeSection === 'BroadcastProduct' ? '#40444b' : 'transparent', // Shaded background if active
                  cursor: 'pointer',
                  transition: 'background-color 0.3s, border-color 0.3s', // Smooth hover effect
                  '&:hover': {
                    borderColor: '#3498db', // Slightly darker color on hover
                    backgroundColor: '#40444b', // Shaded background on hover
                  },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: '#ffffff',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    padding: '8px 12px', // More padding for a square shape
                    borderRadius: '50%', // Circle shape for the icon
                    backgroundColor: '#3498db', // Blue color for Product
                  }}
                >
                  P
                </Typography>
              </Box>
            </Tooltip>
          </Box>
        </Box>

        {/* Sidebar */}
        <Box
          sx={{
            width: '260px', // Widened the sidebar to 260px for better visibility of usernames and buttons
            backgroundColor: '#2f3136',
            padding: '20px',
            borderRight: '1px solid #40444b',
            height: '100%', // Ensure the sidebar takes full height of the container
            borderRadius: '15px', // Add curved edges to the sidebar
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional: Add a subtle shadow
            flexShrink: 0, // Prevent the sidebar from shrinking
          }}
        >
          {/* Dynamic Sidebar Title */}
          <Typography variant="h6" sx={{ color: 'white', marginBottom: '10px' }}>
            {activeSection}
          </Typography>

          {/* Toggle Between Chats and Requests */}
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
              backgroundColor: '#2f3136', // Darker grey shade for the toggle
              borderRadius: '20px', // Curved edges for the toggle
              overflow: 'hidden',
              width: '150px', // Increased width to fit the words
              height: '40px', // Increased height for better visibility
            }}
          >
            {/* Sliding Indicator */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: viewMode === 'chats' ? 0 : '50%',
                width: '50%',
                height: '100%',
                backgroundColor: '#40444b', // Darker sliding indicator
                transition: 'left 0.3s ease-in-out', // Smooth sliding animation
                borderRadius: '20px',
              }}
            />
            {/* Chats Tab */}
            <Box
              onClick={() => setViewMode('chats')}
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: viewMode === 'chats' ? '#ffffff' : '#8e9297',
                cursor: 'pointer',
                zIndex: 1,
                fontSize: '14px', // Adjust font size for better readability
              }}
            >
              Chats
            </Box>
            {/* Requests Tab */}
            <Box
              onClick={() => setViewMode('requests')}
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: viewMode === 'requests' ? '#ffffff' : '#8e9297',
                cursor: 'pointer',
                zIndex: '1',
                fontSize: '14px', // Adjust font size for better readability
              }}
            >
              Requests
            </Box>
          </Box>

          <List sx={{ flex: 1, overflowY: 'auto' }}>
            {/* Dynamically display companies based on active section */}
            {sectionUsers[viewMode]?.map((user) => {
              const lastMessage = chats[user]?.length
                ? chats[user][chats[user].length - 1]
                : null;
              const unreadCount = unreadCounts[user] || 0;

              return (
                <ListItem
                  key={user}
                  button
                  onClick={() => {
                    setSelectedUser(user);
                    markAsRead(user); // Mark messages as read when selected
                  }}
                  sx={{
                    backgroundColor: selectedUser === user ? '#40444b' : '#36393f', // Highlight if selected
                    borderRadius: '10px', // Curved edges for the company item
                    marginBottom: '10px', // Space between company items
                    padding: '10px', // Padding inside the company item
                    transition: 'background-color 0.3s', // Smooth hover effect
                    '&:hover': {
                      backgroundColor: '#40444b', // Slightly darker color on hover
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      marginRight: '10px',
                      bgcolor: companyColors[user], // Use fallback background color
                      borderRadius: '50%', // Perfect circle shape for the icon
                    }}
                  >
                    {user.charAt(0)} {/* Display the first letter of the user's name */}
                  </Avatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography
                          sx={{
                            color: companyColors[user] || '#8e9297',
                            fontWeight: 'bold',
                          }}
                        >
                          {user}
                        </Typography>
                        {lastMessage && (
                          <Typography
                            sx={{
                              fontSize: '10px',
                              color: '#8e9297',
                            }}
                          >
                            {new Date(lastMessage.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </Typography>
                        )}
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography
                          sx={{
                            color: '#ffffff',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '150px',
                          }}
                        >
                          {lastMessage?.text || 'No messages yet'}
                        </Typography>
                        {unreadCount > 0 && (
                          <Badge
                            badgeContent={unreadCount}
                            color="error"
                            sx={{
                              '& .MuiBadge-badge': {
                                right: '-10px',
                                top: '0px',
                              },
                            }}
                          />
                        )}
                      </Box>
                    }
                  />
                  {viewMode === 'requests' && (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '60px' }}>
                      {/* Reject Request Button */}
                      <Button
                        variant="contained"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent selecting the user when clicking the button
                          handleRejectRequest(user);
                        }}
                        sx={{
                          minWidth: '24px',
                          minHeight: '24px',
                          padding: '2px',
                          backgroundColor: '#f04747', // Red background
                          color: '#fff',
                          borderRadius: '50%', // Perfect circle shape
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px', // Smaller font size for the icon
                          '&:hover': {
                            backgroundColor: '#d93b3b', // Darker red on hover
                          },
                        }}
                      >
                        -
                      </Button>
                      {/* Accept Request Button */}
                      <Button
                        variant="contained"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent selecting the user when clicking the button
                          handleAcceptRequest(user);
                        }}
                        sx={{
                          minWidth: '24px',
                          minHeight: '24px',
                          padding: '2px',
                          backgroundColor: '#43b581', // Green background
                          color: '#fff',
                          borderRadius: '50%', // Perfect circle shape
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px', // Smaller font size for the icon
                          '&:hover': {
                            backgroundColor: '#3aa876', // Darker green on hover
                          },
                        }}
                      >
                        +
                      </Button>
                    </Box>
                  )}
                </ListItem>
              );
            })}
          </List>
        </Box>

        {/* Main Chat Area */}
        <Box
          sx={{
            flex: 1, // Allow the chat area to grow horizontally
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '30px', // Shifted the chat box further to the right
            borderRadius: '15px', // Add curved edges to the main chat area
            backgroundColor: '#36393f', // Background color for the chat area
            padding: '20px', // Add padding inside the chat area
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional: Add a subtle shadow
          }}
        >
          <h2 style={{ color: 'white' }}>{mode} {viewMode === 'chats' ? 'Chats' : 'Requests'}</h2>

          {/* Main Content Area */}
          <Box
            sx={{
              flex: 1, // Allow the content area to grow vertically
              overflowY: 'auto',
              marginTop: '40px', // Space between title and chat list
              marginBottom: '20px',
            }}
          >
            {/* Display messages or requests for the selected user */}
            {selectedUser &&
              (viewMode === 'chats'
                ? chats[selectedUser]?.map((msg, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <Avatar
                        sx={{
                          width: 30,
                          height: 30,
                          marginRight: '10px',
                          bgcolor: companyColors[msg.sender], // Use fallback background color
                          borderRadius: '50%', // Perfect circle shape for the icon
                        }}
                      >
                        {msg.sender.charAt(0)} {/* Display the first letter of the sender's name */}
                      </Avatar>
                      <Box>
                        <Typography sx={{ color: companyColors[msg.sender] || '#8e9297' }}>
                          <strong>{msg.sender}:</strong>
                        </Typography>
                        <Typography sx={{ color: '#ffffff' }}>{msg.text}</Typography> {/* White message text */}
                        <Typography sx={{ fontSize: '10px', color: '#8e9297' }}>
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                : requests[selectedUser]?.map((req, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <Avatar
                        sx={{
                          width: 30,
                          height: 30,
                          marginRight: '10px',
                          bgcolor: companyColors[req.sender], // Use fallback background color
                          borderRadius: '50%', // Perfect circle shape for the icon
                        }}
                      >
                        {req.sender.charAt(0)} {/* Display the first letter of the sender's name */}
                      </Avatar>
                      <Box>
                        <Typography sx={{ color: companyColors[req.sender] || '#8e9297' }}>
                          <strong>{req.sender}:</strong>
                        </Typography>
                        <Typography sx={{ color: '#ffffff' }}>{req.text}</Typography> {/* White request text */}
                        <Typography sx={{ fontSize: '10px', color: '#8e9297' }}>
                          {new Date(req.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </Typography>
                      </Box>
                    </Box>
                  )))}
          </Box>

          {/* Chat Card Positioned at the Bottom */}
          <Box
            sx={{
              position: 'sticky',
              bottom: 0,
              backgroundColor: '#36393f',
              padding: '10px',
              borderTop: '1px solid #40444b',
              borderRadius: '15px', // Add curved edges to the chat card
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional: Add a subtle shadow
            }}
          >
            {selectedUser && viewMode === 'chats' && (
              <ChatCard
                messages={chats[selectedUser]} // Pass the selected user's messages
                onSendMessage={handleSendMessage} // Handle sending messages
              />
            )}
          </Box>
        </Box>
      </Container>

      {/* Button to Simulate New Messages */}
      <Box
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => simulateNewMessage('TechCorp', 'TechCorp', 'This is a new message!')}
        >
          Simulate New Message
        </Button>
        <Box
          sx={{
            flex: 1, // Take up 1 part of the available space
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#36393f',
            padding: '10px',
            borderLeft: '1px solid #40444b', // Separator between chat area and options card
          }}
        >
          <Typography variant="h6" sx={{ color: '#ffffff', marginBottom: '10px' }}>
            Options
          </Typography>
          <Button
            variant="contained"
            sx={{
              marginBottom: '10px',
              backgroundColor: '#7289da',
              '&:hover': { backgroundColor: '#5b6ee1' },
            }}
          >
            RFQ
          </Button>
          <Button
            variant="contained"
            sx={{
              marginBottom: '10px',
              backgroundColor: '#43b581',
              '&:hover': { backgroundColor: '#3aa876' },
            }}
          >
            RFP
          </Button>
          <Button
            variant="contained"
            sx={{
              marginBottom: '10px',
              backgroundColor: '#f04747',
              '&:hover': { backgroundColor: '#d93b3b' },
            }}
          >
            PO
          </Button>
          <Button
            variant="contained"
            sx={{
              marginBottom: '10px',
              backgroundColor: '#faa61a',
              '&:hover': { backgroundColor: '#e0950f' },
            }}
          >
            Quotation
          </Button>
          <Button
            variant="contained"
            sx={{
              marginBottom: '10px',
              backgroundColor: '#9b59b6',
              '&:hover': { backgroundColor: '#8e44ad' },
            }}
          >
            Invoices
          </Button>
          <Button
            variant="contained"
            sx={{
              marginBottom: '10px',
              backgroundColor: '#f1c40f',
              '&:hover': { backgroundColor: '#e6b80f' },
            }}
          >
            Other Documents
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Messages;