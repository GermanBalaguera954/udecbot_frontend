// src/components/auth/Signup.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../api/authApi';
import PasswordInput from '../common/PasswordInput';
import SocialMediaIcons from '../common/SocialMediaIcons';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 15px 80px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.9);
  width: 100%;
  max-width: 400px;
  text-align: center;
  margin: 50px auto;
`;

const Title = styled.h1`
  margin-bottom: 24px;
  font-size: 26px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 15px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
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
  padding: 12px;
  margin: 15px 0;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const LinkText = styled.p`
  margin-top: 20px;
  color: #007bff;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

const Signup = () => {
  const [name, setName] = useState('');
  const [program, setProgram] = useState('');
  const [currentSemester, setCurrentSemester] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
        await signup(
            name,
            program,
            currentSemester,
            email,
            password
        );
        alert('Registro exitoso. Por favor, inicia sesión.');
        navigate('/');
    } catch (error) {
        console.error("Error en el registro:", error);
        alert('Registro fallido: ' + (error.response?.data?.error || error.message));
    }
};


  const handleSemesterChange = (e) => {
    const value = e.target.value;

    // Verificar si el valor es un número entre 1 y 10
    if (/^[1-9]$|^10$/.test(value) || value === '') {
      setCurrentSemester(value);
    }
  };

  return (
    <FormWrapper>
      <Title>Regístrate</Title>
      <form onSubmit={handleSignup}>
        <Input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Select
          value={program}
          onChange={(e) => setProgram(e.target.value)}
        >
          <option value="">Selecciona tu programa</option>
          <option value="Ingenieria de Sistemas y Computacion">Ingeniería de Sistemas y Computación</option>
        </Select>

        <Input
          type="text"
          placeholder="Semestre actual (1-10)"
          value={currentSemester}
          onChange={handleSemesterChange}
          inputMode="numeric"
          pattern="[1-9]|10"
          maxLength="2"
        />

        <Input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <PasswordInput
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Confirma tu contraseña"
        />
        <Button type="submit">Registrar</Button>
      </form>
      <LinkText onClick={() => navigate('/')}>¿Ya tienes una cuenta? Inicia sesión</LinkText>
      <SocialMediaIcons />
    </FormWrapper>
  );
};

export default Signup;
