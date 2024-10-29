import React, { useState, useRef, useEffect } from "react";
import { sendMessage } from "../api/chatbotApi";
import './ChatBot.css'

const ChatBot = () => {
    const [messages, setMessages] = useState([{ text: "¡Hola! Soy UdecBot, tu asistente virtual. ¿Cómo puedo ayudarte hoy?", sender: "bot" }]);
    const [studentId, setStudentId] = useState(null);
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);

    // Función para enviar mensajes
    const handleSendMessage = async (text) => {
        const userMessage = { text, sender: "user" };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        const response = await sendMessage(text, studentId);

        // Verificar si el backend indica que debe resetearse
        if (response.reset) {
            setStudentId(null);  // Resetear el ID del estudiante
            setMessages([]);
            return;  // Detener el flujo aquí si prefieres manejar el mensaje de bienvenida en otro lugar
        }

        // Guarda el studentId si está en la respuesta y no ha sido guardado previamente
        if (!studentId && response.student_id) {
            setStudentId(response.student_id);
        }

        // Si hay un mensaje principal, añadirlo
        if (response.message) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: response.message, sender: "bot" }
            ]);
        }

        // Si hay materias en "subjects", añadirlas como parte de la respuesta
        if (response.subjects && response.subjects.length > 0) {
            const subjectsText = response.subjects.map(
                (subject) => `- ${subject.name} (${subject.status}), Créditos: ${subject.credits}`
            ).join("\n");

            setMessages((prevMessages) => [
                ...prevMessages,
                { text: subjectsText, sender: "bot" }
            ]);
        }

        // Si hay opciones adicionales, añadirlas
        if (response.options) {
            response.options.forEach((option) => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: option, sender: "option" }
                ]);
            });
        }
        
        inputRef.current.focus();
    };

     // Para hacer scroll automáticamente al último mensaje
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Enviar mensaje al presionar Enter o al hacer clic en el botón de enviar
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && e.target.value.trim()) {
            handleSendMessage(e.target.value.trim());
            e.target.value = ""; // Limpia el input después de enviar el mensaje
        }
    };

    return (
        <div className="chatbot">
            <div className="title-container">
                <h1 className="title">UDECBOT</h1>
            </div>
            <div className="chatbot-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} /> 
            </div>
            <div className="input-container">
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Escribe un mensaje..."
                    onKeyPress={handleKeyPress}
                    ref={inputRef} // Asigna la referencia al input
                />
                <button className="send-button" onClick={() => {
                    const input = inputRef.current;
                    if (input.value.trim()) {
                        handleSendMessage(input.value.trim());
                        input.value = "";
                    }
                }}>Enviar</button>
            </div>
        </div>
    );
};

export default ChatBot;
