import React from 'react'
import { useMode } from '../../Providers/ModeContext';
import VendorHome from './VendorHome';
import ClientHome from './ClientHome';
import UserLayout from '../../Pages/UserLayout/User';
function Home() {
  const { mode } = useMode();
  return (
    // <Container sx={{
    //   // backgroundColor:"pink"
    // }}>
    //   { mode } Home 
    // </Container>

    <div>
      <UserLayout />
      {mode === 'Vendor' ? (
        <VendorHome />
      ) : (
        <ClientHome />
      )}
    </div>

  )
}

export default Home