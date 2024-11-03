import React, { useState, useRef, useEffect } from "react";
import { sendMessage } from "../api/chatbotApi";
import { useNavigate } from 'react-router-dom';
import './styles/ChatBot.css';

const ChatBot = ({ onLogout }) => {
    const [messages, setMessages] = useState([{ text: "¡Hola!\n\nSoy UdecBot, tu asistente virtual.\n\n¿Cómo puedo ayudarte hoy?", sender: "bot" }]);
    const [studentId, setStudentId] = useState(null);
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    // Función para enviar mensajes
    const handleSendMessage = async (text) => {
        const userMessage = { text, sender: "user" };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        const response = await sendMessage(text, studentId);

        if (response.reset) {
            setStudentId(null);  // Resetear el ID del estudiante
            setMessages([]);  // Reiniciar mensajes
            return;
        }

        if (!studentId && response.student_id) {
            setStudentId(response.student_id);
        }

        if (response.message) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: response.message, sender: "bot" }
            ]);
        }

        if (response.link) {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    text: "Consulta los códigos de materias aquí",
                    url: response.link,
                    sender: "link"
                }
            ]);
        }

        // Manejar mensaje de salida
        if (response.exit) {
            setMessages((prevMessages) => [
                ...prevMessages,
            ]);
            setTimeout(() => {
                onLogout(); // Llama a la función de logout para cambiar el estado de autenticación
                navigate('/'); // Redirige al login después de 2 segundos
            }, 2000);
            return;
        }

        if (response.subjects && response.subjects.length > 0) {
            const subjectsText = response.subjects.map(
                (subject) => `- ${subject.name} (${subject.status}), Créditos: ${subject.credits}`
            ).join("\n");

            setMessages((prevMessages) => [
                ...prevMessages,
                { text: subjectsText, sender: "bot" }
            ]);
        }

        if (response.total_credits !== undefined && response.credits_remaining !== undefined) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: `Créditos usados: ${response.total_credits}`, sender: "bot" },
                { text: `Créditos restantes: ${response.credits_remaining}`, sender: "bot" }
            ]);
        }

        if (response.options) {
            response.options.forEach((option) => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: option, sender: "option" }
                ]);
            });
        }
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

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
                    <div
                        key={index}
                        className={`message ${msg.sender === "option" ? "message-option" : msg.sender}`}
                    >
                        {msg.sender === "link" ? (
                            <a href={msg.url} target="_blank" rel="noopener noreferrer">
                                {msg.text}
                            </a>
                        ) : (
                            msg.text
                        )}
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
                    ref={inputRef}
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
