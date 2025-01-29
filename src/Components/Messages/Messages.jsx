
import React from 'react'
import { useMode } from '../../Providers/ModeContext';
import User from '../../Pages/UserLayout/User';
import { Container } from '@mui/material';
function Messages() {
  const { mode } = useMode();
  return (
    <>
      <User />
      <Container>

      {mode} Chats
      </Container>
    </>
  )
}

export default Messages