import { Container } from '@mui/material'
import React from 'react'
import { useMode } from '../../Providers/ModeContext';
function Settings() {
  const { mode } = useMode();
  return (
    <Container>
      {mode} Settings 
    </Container>
  )
}

export default Settings