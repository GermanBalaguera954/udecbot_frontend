import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChatBot from './components/ChatBot';
import Login from './components/auth/Logins';
import Signup from './components/auth/Signup';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/chat" replace /> : <Login onLogin={handleLogin} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={isAuthenticated ? <ChatBot onLogout={handleLogout} /> : <Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;