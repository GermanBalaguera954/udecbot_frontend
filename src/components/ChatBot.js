import React, { useState, useRef, useEffect, useCallback } from "react";
import { sendMessage } from "../api/chatbotApi";
import { useNavigate } from 'react-router-dom';
import './styles/ChatBot.css';

const ChatBot = ({ onLogout }) => {
    const [messages, setMessages] = useState([
        { text: "¡Hola!\n\nSoy UdecBot, tu asistente virtual.\n\n¿Cómo puedo ayudarte hoy?", sender: "bot" }
    ]);
    const [studentId, setStudentId] = useState(null);
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    // Función para enviar mensajes con control de errores
    const handleSendMessage = useCallback(async (text) => {
        const userMessage = { text, sender: "user" };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            const response = await sendMessage(text, studentId);

            if (!response) return;

            if (response.reset) {
                setStudentId(null);
                setMessages([]); 
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

            if (response.exit) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                ]);
                setTimeout(() => {
                    onLogout();
                    navigate('/');
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
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: "Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente.", sender: "bot" }
            ]);
        }
    }, [studentId, onLogout, navigate]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && e.target.value.trim()) {
            handleSendMessage(e.target.value.trim());
            e.target.value = "";
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