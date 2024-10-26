//src/services/studentApi.js
import api from './axiosConfig';

export const enrollSubject = async (student_id, subject_code) => {
    try {
        const response = await api.post('/chat/inscribir', { student_id, subject_code });
        return response.data;
    } catch (error) {
        console.error("Error al inscribir la materia:", error);
        throw error;
    }
};

export const cancelSubject = async (student_id, subject_code) => {
    try {
        const response = await api.post('/chat/cancelar', { student_id, subject_code });
        return response.data;
    } catch (error) {
        console.error("Error al cancelar la materia:", error);
        throw error;
    }
};

export const listEnrollments = async (student_id) => {
    try {
        const response = await api.get(`/chat/listar/${student_id}`);
        return response.data;
    } catch (error) {
        console.error("Error al listar materias:", error);
        throw error;
    }
};

export const getUsedCredits = async (student_id) => {
    try {
        const response = await api.get(`/credits/${student_id}`);
        return response.data;
    } catch (error) {
        console.error("Error al consultar créditos:", error);
        throw error;
    }
};
