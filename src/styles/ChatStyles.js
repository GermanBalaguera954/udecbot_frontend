import styled from 'styled-components';
import { Paper, Button, TextField, Typography } from '@mui/material';
import messageBackground from '../assets/images/escudo.png';

// Contenedor principal del chat con padding en todos los lados para evitar que se pegue
export const ChatContainer = styled(Paper)`
  width: 100%;
  max-width: 600px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 40px auto;
  padding: 20px;
  padding-left: 15px; 
  padding-right: 15px;
  background-color: #00482B !important;
  border-radius: 20px !important;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  @media (max-width: 768px) {
    height: 90vh;
    padding: 15px;
    padding-left: 15px;
    padding-right: 15px;
  }

  @media (max-width: 480px) {
    height: 90vh;
    padding: 10px;
    padding-left: 15px;
    padding-right: 15px;
  }

  @media (max-width: 320px) {
    height: 60vh;
    padding: 8px;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

// Contenedor del título UdecBot
export const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

// Título del chatbot con tipografía de Material UI
export const Title = styled(Typography)`
  font-size: 24px !important;
  font-weight: bold !important;
  color: #FEBE12;
  
  @media (max-width: 768px) {
    font-size: 20px !important;
  }

  @media (max-width: 480px) {
    font-size: 18px !important;
  }
`;

// Área de mensajes del chat con fondo personalizado
export const MessagesArea = styled.div`
  display: flex;
  flex-direction: column;
  position: relative; /* Para permitir superposición */
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 15px;
  background-color: rgba(249, 249, 249, 0.8);
  background-image: url(${messageBackground});
  background-size: contain; /* Ajustar la imagen dentro del área sin distorsionarla */
  background-position: center; /* Centrar la imagen */
  background-repeat: no-repeat; /* No repetir la imagen */
  border-radius: 8px;
  box-shadow: inset 0px 1px 5px rgba(0, 0, 0, 0.1);
  scrollbar-width: thin;
    filter: brightness(0.8); /* Ajusta la luminosidad de la imagen */

  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

// Estilo para los mensajes del usuario y del sistema con colores suaves
export const Message = styled.div.attrs((props) => ({
  dangerouslySetInnerHTML: { __html: props.text },  // Renderiza HTML usando `props.text`
}))`
  margin-bottom: 10px;
  padding: 10px;
  background-color: ${(props) => (props.isUser ? 'rgba(121, 192, 0, 0.3)' : 'rgba(0, 72, 43, 0.9)')};
  color: ${(props) => (props.isUser ? '#000' : '#fff')};
  align-self: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  border-radius: ${(props) => (props.isUser ? '15px 15px 0 15px' : '15px 15px 15px 0')};
  max-width: 75%;
  word-wrap: break-word;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);

  @media (max-width: 480px) {
    max-width: 90%;
    font-size: 14px;
    padding: 8px;
  }
`;

// Contenedor del input de texto y el botón con bordes definidos
export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 2px solid #e0e0e0;
  background-color: #fafafa;
  border-radius: 12px;

  @media (max-width: 768px) {
    padding-top: 8px;
  }

  @media (max-width: 480px) {
    padding-top: 5px;
  }
`;

// Campo de entrada de texto con enfoque en la claridad y accesibilidad
export const ChatInput = styled(TextField)`
  flex-grow: 1;
  margin-right: 10px !important;

  & .MuiInputBase-root {
    padding: 1px;
    border-radius: 12px;
  }

  @media (max-width: 768px) {
    & .MuiInputBase-root {
      padding: 10px;
    }
  }

  @media (max-width: 480px) {
    & .MuiInputBase-root {
      padding: 8px;
      font-size: 14px;
    }
  }
`;

// Botón de enviar mensaje con un color llamativo y borde redondeado
export const SendButton = styled(Button)`
  background-color: #007B3E !important;
  color: white !important;
  padding: 10px 20px !important;
  font-weight: bold !important;
  border-radius: 50px !important;

  &:hover {
    background-color: #218838 !important;
  }

  @media (max-width: 768px) {
    padding: 8px 16px !important;
  }

  @media (max-width: 480px) {
    padding: 5px 12px !important;
    font-size: 12px !important;
  }
`;
