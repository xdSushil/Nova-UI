import { Container } from '@mui/material'
import React from 'react'
import { useMode } from '../../Providers/ModeContext';
function Home() {
  const { mode } = useMode();
  return (
    <Container sx={{
      // backgroundColor:"pink"
    }}>
      { mode } Home 
    </Container>
    
  )
}

export default Home