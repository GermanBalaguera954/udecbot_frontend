import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/chat/';

export const sendMessage = async (message, studentId = null) => {
    const token = localStorage.getItem('authToken');
    console.log("Token JWT enviado:", token);

    try {
        const response = await axios.post(
            API_BASE_URL,
            {
                message,
                student_id: studentId,
            },
            {
                headers: {
                    
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error en la solicitud del chatbot:", error);
        return { message: "Hubo un problema al conectar con el chatbot. Intenta nuevamente." };
    }
};