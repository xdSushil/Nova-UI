import { Container } from '@mui/material'
import React from 'react'
import { useMode } from '../../Providers/ModeContext';
function Analytics() {
  const { mode } = useMode();
  return (
    <Container>
      { mode } Analytics
    </Container>
  )
}

export default Analytics