// Ajusta los estilos de FormWrapper y otros componentes en Login.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/authApi';
import PasswordInput from '../common/PasswordInput';
import SocialMediaIcons from '../common/SocialMediaIcons';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 30px 80px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.9);
  width: 100%;
  max-width: 250px;
  text-align: center;
  margin: 50px auto;
`;

const Title = styled.h1`
  font-size: 26px;
  color: #333;
  margin-bottom: 30px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  text-align: left;
  box-sizing: border-box;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 0;
  margin-top: 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const LinkText = styled.p`
  margin-top: 20px;
  font-size: 16px;
  color: #007bff;
  cursor: pointer;
  text-align: center;
  transition: color 0.3s;

  &:hover {
    color: #0056b3;
    text-decoration: underline;
  }
`;

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);

      // Verificar si el token existe y guardarlo en localStorage
      if (data && data.access_token) {
        localStorage.setItem('authToken', data.access_token);
        onLogin(data.access_token);
      } else {
        alert("Token de autenticación no recibido. Verifica el servidor.");
      }
    } catch (error) {
      alert("Error al iniciar sesión: " + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <FormWrapper>
      <Title>Iniciar Sesión</Title>
      <form onSubmit={handleLogin} style={{ width: '100%' }}>
        <Input
          type="text"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <Button type="submit">Iniciar Sesión</Button>
      </form>
      <LinkText onClick={() => navigate('/signup')}>¿No tienes una cuenta? Inscribirse</LinkText>
      <SocialMediaIcons />
    </FormWrapper>
  );
};

export default Login;
