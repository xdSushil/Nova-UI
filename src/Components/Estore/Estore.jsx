import { Container } from '@mui/material'
import React from 'react'
import { useMode } from '../../Providers/ModeContext';
function Estore() {
  const { mode } = useMode()
  return (
    <Container>
      {mode} Estore 
    </Container>
  )
}

export default Estore