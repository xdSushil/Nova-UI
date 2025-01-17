import { Container } from '@mui/material'
import React from 'react'
import { useMode } from '../../Providers/ModeContext';
function Messages() {
  const { mode } = useMode();
  return (
    <Container>
      {mode} Chats
    </Container>
  )
}

export default Messages