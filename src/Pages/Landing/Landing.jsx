import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Button, Card, CardContent, Container, AppBar, Toolbar, useScrollTrigger, Fab, Zoom, CssBaseline } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

// Navbar Component
const Navbar = () => {
  const [user, setUser] = useState(null); // Mock user state (replace with actual authentication logic)
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: '#2a2a2a' }}> {/* Lighter background */}
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <img src="/logo.png" alt="NOVA Logo" style={{ height: '40px' }} />
        </Typography>
        {user ? (
          <Typography variant="body1">{user.name}</Typography>
        ) : (
          <>
            <Button color="inherit" sx={{ mr: 2 }} onClick={() => navigate('/register')}>
              Register
            </Button>
            <Button color="inherit" variant="outlined" onClick={() => navigate('/login')}>
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #1e1e1e, #121212)',
        color: 'white',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Welcome to NOVA
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          The Ultimate Social Platform for Businesses
        </Typography>
        <Button variant="contained" size="large" sx={{ mr: 2 }}>
          Get Started
        </Button>
        <Button variant="outlined" size="large">
          Learn More
        </Button>
      </motion.div>
    </Box>
  );
};

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      title: 'Network Page',
      description: 'Expand your business network and connect with the right clients or vendors.',
    },
    {
      title: 'Chat Option',
      description: 'Communicate seamlessly with your connections through our integrated chat system.',
    },
    {
      title: 'E-Store',
      description: 'Showcase your products and services in a dedicated e-store.',
    },
    {
      title: 'Dynamic Toggle Switch',
      description: 'Switch between vendor and client modes to find exactly what you need.',
    },
  ];

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 6 }}>
        Features
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 4,
        }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                p: 3,
                background: '#2a2a2a',
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.3s',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1">{feature.description}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Container>
  );
};

// Scroll-to-top button
const ScrollTop = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        color="primary"
        size="small"
        onClick={handleClick}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <KeyboardArrowUp />
      </Fab>
    </Zoom>
  );
};

// Footer
const Footer = () => {
  return (
    <Box
      sx={{
        py: 4,
        background: '#1e1e1e',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Typography variant="body1">© 2025 NOVA. All rights reserved.</Typography>
    </Box>
  );
};

// Main Landing Page
const LandingPage = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
      <ScrollTop />
    </ThemeProvider>
  );
};

export default LandingPage;