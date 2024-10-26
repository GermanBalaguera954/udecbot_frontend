import React, { useEffect, useState, useRef } from 'react';
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
import {
  getInitialMessage,
  procesarSaludo,
  enviarCodigoEstudiante,
  iniciarProcesoInscripcion,
  inscribirMateriaEspecifica
} from '../services/api';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [studentId, setStudentId] = useState(null);
  const [isEnrolling, setIsEnrolling] = useState(false); // Estado para proceso de inscripción
  const endOfMessagesRef = useRef(null);
  const inputRef = useRef(null);

  // Obtener el mensaje inicial del chatbot al montar el componente
  useEffect(() => {
    const fetchInitialMessage = async () => {
      const initialMessage = await getInitialMessage();
      setMessages([{ text: initialMessage, isUser: false }]);
    };
    fetchInitialMessage();
  }, []);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Manejar el envío de mensajes
  const handleSend = async () => {
    if (inputValue.trim()) {
      // Agregar mensaje del usuario al chat
      setMessages((prevMessages) => [...prevMessages, { text: inputValue, isUser: true }]);

      try {
        let responseMessage;

        // Procesar saludo inicial
        if (messages.length === 1) {
          responseMessage = await procesarSaludo(inputValue);
        } 
        // Verificar si es el ID del estudiante
        else if (!isNaN(inputValue)) {
          const response = await enviarCodigoEstudiante(inputValue);
          setStudentId(inputValue); // Guardar el ID del estudiante
          responseMessage = response.message;

          if (response.details) {
            const materias = response.details.materias_actuales
              .map((materia) => `<li>${materia.name} (${materia.status})</li>`)
              .join("");

            setMessages((prevMessages) => [
              ...prevMessages,
              { text: `Semestre actual: ${response.details.semestre_actual}`, isUser: false },
              { text: `Materias actuales:<ul>${materias}</ul>`, isUser: false, html: true },
              { text: `Créditos usados actualmente: ${response.details.creditos_actuales}`, isUser: false }
            ]);
          }
        } 
        // Manejar el comando "inscribir"
        else if (inputValue.toLowerCase() === "inscribir") {
          if (studentId) {
            responseMessage = await iniciarProcesoInscripcion(studentId);
            setIsEnrolling(true); // Cambiar a modo inscripción para esperar código de materia
          } else {
            responseMessage = "Por favor, ingresa primero tu ID de estudiante.";
          }
        } 
        // Inscribir materia específica si está en modo inscripción
        else if (isEnrolling) {
          const response = await inscribirMateriaEspecifica(studentId, inputValue);
          responseMessage = response;
          setIsEnrolling(false); // Finaliza el proceso de inscripción
        } 
        // Si no se identifica la acción
        else {
          responseMessage = "No se pudo identificar la acción solicitada.";
        }

        // Agregar la respuesta del chatbot al chat
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: responseMessage, isUser: false }
        ]);
      } catch (error) {
        console.error("Error al procesar el mensaje:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Error al procesar tu solicitud", isUser: false }
        ]);
      }

      setInputValue(''); // Limpiar el input del chat
      inputRef.current.focus(); // Posicionar el cursor nuevamente en el campo de entrada
    }
  };

  // Manejar "Enter" para enviar el mensaje
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <ChatContainer elevation={3}>
      <TitleContainer>
        <Title variant="h4">UDECBOT</Title>
      </TitleContainer>

      <MessagesArea>
        {messages.map((msg, index) => (
          <Message key={index} isUser={msg.isUser} text={msg.text} />
        ))}
        <div ref={endOfMessagesRef} />
      </MessagesArea>

      <InputContainer>
        <ChatInput
          variant="outlined"
          placeholder="Escribe tu mensaje..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          inputRef={inputRef}
        />
        <SendButton variant="contained" onClick={handleSend}>
          Enviar
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatWindow;
