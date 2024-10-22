// src/App.js
import React from 'react';
import { Container } from '@mui/material';
import ChatWindow from './components/ChatWindow';
import '../src/styles/App.css'

function App() {
  return (
    <Container>
      <ChatWindow />
    </Container>
  );
}

export default App;
