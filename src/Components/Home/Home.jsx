import React from 'react'
import { useMode } from '../../Providers/ModeContext';
import VendorHome from './VendorHome';
import ClientHome from './ClientHome';
import User from '../../Pages/UserLayout/User';
function Home() {
  const { mode } = useMode();
  return (
    // <Container sx={{
    //   // backgroundColor:"pink"
    // }}>
    //   { mode } Home 
    // </Container>

    <div>
      <User />
      {mode === 'Vendor' ? (
        <VendorHome />
      ) : (
        <ClientHome />
      )}
    </div>

  )
}

export default Home