// components/ChatWindows.js

import React, { useState, useEffect, useRef } from 'react';
import {
  ChatContainer,
  MessagesArea,
  Message,
  InputContainer,
  ChatInput,
  SendButton,
  TitleContainer,
  Title
} from '../styles/ChatStyles';
import { startChat, procesarNLP, enrollSubject } from '../services/api'; // Asegúrate de importar correctamente la API

const ChatWindow = () => {
  const [messages, setMessages] = useState([]); // Estado para almacenar los mensajes del chat
  const [inputValue, setInputValue] = useState(''); // Estado para el input del usuario
  const [enrolling, setEnrolling] = useState(false); // Estado para saber si estamos en modo inscripción
  const [subjectCode, setSubjectCode] = useState(''); // Código de la materia a inscribir
  const studentId = 123; // Asignar un ID de estudiante válido
  const endOfMessagesRef = useRef(null); // Crear una referencia al último mensaje

  // useEffect para iniciar el chat cuando el componente se monte
  useEffect(() => {
    const iniciarChat = async () => {
      try {
        // Llamamos a la API para iniciar el chat y obtener el mensaje de bienvenida
        const response = await startChat(studentId);

        // Actualizamos el estado de los mensajes con el mensaje de bienvenida y las opciones
        const newMessages = [
          { text: response.message, isUser: false }, // Mensaje de bienvenida
          ...response.options.map(option => ({ text: option, isUser: false })) // Añadir cada opción como un mensaje
        ];

        setMessages(newMessages); // Actualizamos el estado solo una vez
      } catch (error) {
        console.error('Error iniciando el chat:', error);
      }
    };

    // Llamamos a iniciarChat solo si no hay mensajes
    if (messages.length === 0) {
      iniciarChat();
    }
  }, [studentId, messages.length]); // Asegurarse de que se ejecute solo una vez

  // Efecto para desplazar hacia abajo cuando cambien los mensajes
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); // Se ejecuta cada vez que cambien los mensajes

  // Función para manejar el envío de mensajes
  const handleSend = async () => {
    if (inputValue.trim()) {
      // Añadir mensaje del usuario al chat
      setMessages((prevMessages) => [...prevMessages, { text: inputValue, isUser: true }]);

      try {
        // Procesar el mensaje del usuario a través del NLP en el backend
        const response = await procesarNLP(inputValue, studentId);

        // Si el usuario selecciona "1" o el chatbot sugiere inscribir materia
        if (response.message.toLowerCase().includes("inscribir materia") || inputValue === '1') {
          setEnrolling(true); // Cambiar a modo inscripción
        } else {
          // Si no está inscribiendo, añadir la respuesta del chatbot al chat
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: response.message, isUser: false }
          ]);
        }
      } catch (error) {
        console.error('Error procesando el mensaje:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Error procesando tu solicitud', isUser: false }
        ]);
      }

      setInputValue(''); // Limpiar el input del chat
    }
  };


  // Función para manejar la inscripción de una materia
  const handleEnroll = async () => {
    if (subjectCode.trim()) {
      try {
        // Llamar a la API para inscribir la materia
        const response = await enrollSubject(studentId, subjectCode);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.message, isUser: false }
        ]);
        setEnrolling(false); // Salir del modo de inscripción
        setSubjectCode(''); // Limpiar el campo de código de materia
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Error al inscribir la materia', isUser: false }
        ]);
      }
    }
  };

  return (
    <ChatContainer elevation={3}>
      <TitleContainer>
        <Title variant="h4">UdecBot</Title>
      </TitleContainer>

      <MessagesArea>
        {messages.map((msg, index) => (
          <Message key={index} isUser={msg.isUser}>
            {msg.text}
          </Message>
        ))}
        {/* Añadimos un div vacío que servirá como referencia para el scroll */}
        <div ref={endOfMessagesRef} />
      </MessagesArea>

      {enrolling ? (
        // Mostrar campo de inscripción cuando el usuario quiera inscribir una materia
        <InputContainer>
          <ChatInput
            variant="outlined"
            placeholder="Ingrese el código de la materia"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
          />
          <SendButton variant="contained" onClick={handleEnroll}>
            Inscribir
          </SendButton>
        </InputContainer>
      ) : (
        // Si no está inscribiendo, mostrar el campo de chat normal
        <InputContainer>
          <ChatInput
            variant="outlined"
            placeholder="Escribe tu mensaje..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <SendButton variant="contained" onClick={handleSend}>
            Enviar
          </SendButton>
        </InputContainer>
      )}
    </ChatContainer>
  );
};

export default ChatWindow;
