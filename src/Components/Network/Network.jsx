import { Container } from '@mui/material'
import React from 'react'
import { useMode } from '../../Providers/ModeContext';
function Network() {
  const { mode } = useMode();
  return (
    <Container>
      {mode} Networks
    </Container>
  )
}

export default Network