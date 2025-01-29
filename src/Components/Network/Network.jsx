import { Container } from '@mui/material'
import React from 'react'
import { useMode } from '../../Providers/ModeContext';
import UserLayout from "../../Pages/UserLayout/User"
import VendorNetwork from './VendorNetwork';
import ClientNetwork from './ClientNetwork';
function Network() {
  const { mode } = useMode();
  return (
    <>
      <UserLayout />
      {mode==="Vendor"?(
        <VendorNetwork />
      ):(
        <ClientNetwork />
      )}
    </>
  )
}

export default Network