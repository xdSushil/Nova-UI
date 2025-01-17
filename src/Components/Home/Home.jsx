import { Container } from '@mui/material'
import React from 'react'
import { useMode } from '../../Providers/ModeContext';
import VendorHome from './VendorHome';
function Home() {
  const { mode } = useMode();
  return (
    // <Container sx={{
    //   // backgroundColor:"pink"
    // }}>
    //   { mode } Home 
    // </Container>

    <div>
      {mode === 'Vendor' ? (
        <VendorHome />
      ) : (
        <Container> Client home</Container>
      )}
    </div>

  )
}

export default Home