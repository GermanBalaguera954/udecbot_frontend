// components/EnrollSubject.js

import React, { useState } from 'react';
import { iniciarProcesoInscripcion, inscribirMateriaEspecifica } from '../services/api';

const EnrollSubject = ({ studentId }) => {
    const [message, setMessage] = useState("");
    const [subjectCode, setSubjectCode] = useState("");
    const [isEnrolling, setIsEnrolling] = useState(false);

    // Función para iniciar el proceso de inscripción (inscribir DN CAI y pedir código de materia)
    const handleStartEnrollment = async () => {
        const response = await iniciarProcesoInscripcion(studentId);
        setMessage(response);
        setIsEnrolling(true); // Cambia a true para habilitar el ingreso de código de materia
    };

    // Función para inscribir una materia específica con el código ingresado
    const handleEnrollSubject = async () => {
        if (subjectCode.trim()) {
            const response = await inscribirMateriaEspecifica(studentId, subjectCode);
            setMessage(response);
            setIsEnrolling(false); // Reinicia el proceso de inscripción
            setSubjectCode(""); // Limpia el campo de código de materia
        } else {
            setMessage("Por favor ingresa un código de materia válido.");
        }
    };

    return (
        <div>
            <h2>Proceso de Inscripción</h2>
            <button onClick={handleStartEnrollment}>Iniciar Inscripción</button>
            {message && <p>{message}</p>}

            {/* Mostrar campo para código de materia solo si está en proceso de inscripción */}
            {isEnrolling && (
                <div>
                    <input
                        type="text"
                        value={subjectCode}
                        onChange={(e) => setSubjectCode(e.target.value)}
                        placeholder="Código de materia"
                    />
                    <button onClick={handleEnrollSubject}>Inscribir Materia</button>
                </div>
            )}
        </div>
    );
};

export default EnrollSubject;

