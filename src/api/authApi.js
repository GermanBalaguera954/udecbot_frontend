// src/api/authApi.js
import axios from 'axios';

const AUTH_API_BASE_URL = 'http://127.0.0.1:8000/auth';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${AUTH_API_BASE_URL}/login`, {
            email: email,
            password: password,
        });
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

// src/api/authApi.js
export const signup = async (name, program, currentSemester, email, password) => {
    try {
        const response = await axios.post(`${AUTH_API_BASE_URL}/register`, {
            name,
            program,
            current_semester: parseInt(currentSemester),
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error("Error en el registro:", error);
        throw error;
    }
};

