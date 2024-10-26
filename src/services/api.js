import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Función para obtener el mensaje inicial del chatbot
export const getInitialMessage = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/interact/`, {
            user_input: "",
            saludo_inicial: false
        });
        return response.data.message;
    } catch (error) {
        console.error("Error al obtener el mensaje inicial:", error);
        return "Error al obtener el mensaje inicial.";
    }
};

// Función para procesar el saludo del usuario
export const procesarSaludo = async (message) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/interact/`, {
            user_input: message,
            saludo_inicial: true
        });
        return response.data.message;
    } catch (error) {
        console.error("Error al procesar el saludo:", error);
        return "Error al procesar el saludo.";
    }
};

// Función para enviar el código de estudiante y obtener la información del estudiante
export const enviarCodigoEstudiante = async (studentId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/interact/`, {
            user_input: studentId,
            saludo_inicial: true
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener la información del estudiante:", error);
        return { message: "Error al obtener la información del estudiante." };
    }
};

// Función para iniciar el proceso de inscripción (inscribe DN CAI y pide el código de materia específica)
export const iniciarProcesoInscripcion = async (studentId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/interact/`, {
            user_input: "inscribir", // Comando para iniciar inscripción
            student_id: studentId,
            inscribir_estado: false
        });
        return response.data.message;
    } catch (error) {
        console.error("Error al iniciar el proceso de inscripción:", error);
        return "Error al iniciar el proceso de inscripción.";
    }
};

// Función para inscribir una materia específica
export const inscribirMateriaEspecifica = async (studentId, subjectCode) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/interact/`, {
            user_input: subjectCode, // Código de la materia a inscribir
            student_id: studentId,
            inscribir_estado: true  // Confirmar que se está en proceso de inscripción específica
        });
        return response.data.message;
    } catch (error) {
        console.error("Error al inscribir la materia:", error);
        return "Error al inscribir la materia.";
    }
};
