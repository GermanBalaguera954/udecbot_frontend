import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Función para iniciar el chat
export const startChat = async (studentId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chat/start/${studentId}`);
    return response.data;
  } catch (error) {
    console.error('Error iniciando el chat:', error);
    throw error;
  }
};

// Función para procesar el mensaje del usuario con NLP
export const procesarNLP = async (userInput, studentId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat/nlp`, {
      user_input: userInput,  // Debe coincidir con lo que espera el backend
      student_id: studentId,  // Asegúrate de que es un entero y es válido
    });
    return response.data;
  } catch (error) {
    console.error('Error procesando el mensaje:', error);
    throw error;
  }
};

// Función para inscribir una materia
export const enrollSubject = async (studentId, subjectCode) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat/inscribir`, {
      student_id: studentId,
      subject_code: subjectCode,
    });
    return response.data;
  } catch (error) {
    console.error('Error al inscribir la materia:', error);
    throw error;
  }
};
