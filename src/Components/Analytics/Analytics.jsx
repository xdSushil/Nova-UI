import { Container } from '@mui/material'
import React from 'react'
import { useMode } from '../../Providers/ModeContext';
import UserLayout from '../../Pages/UserLayout/User';
function Analytics() {
  const { mode } = useMode();
  return (
    <>
    <UserLayout />
    <Container>
      { mode } Analytics
    </Container>
    </>
  )
}

export default Analytics