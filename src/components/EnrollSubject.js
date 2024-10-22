import React, { useState } from 'react';
import { enrollSubject } from '../services/api';

const EnrollSubject = ({ studentId }) => {
  const [subjectCode, setSubjectCode] = useState(''); // Código de la materia que va a inscribir
  const [message, setMessage] = useState(''); // Mensaje de resultado

  // Función para manejar la inscripción de una materia
  const handleEnroll = async () => {
    if (subjectCode.trim()) {
      try {
        // Llamar a la API para inscribir la materia
        const response = await enrollSubject(studentId, subjectCode);
        // Mostrar el mensaje del backend sobre el resultado de la inscripción
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.message, isUser: false }
        ]);
        setEnrolling(false); // Salir del modo de inscripción
        setSubjectCode(''); // Limpiar el campo de código de materia
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Error al inscribir la materia', isUser: false }
        ]);
      }
    }
  };


  return (
    <div>
      <h2>Inscribir Materia</h2>
      <input
        type="text"
        placeholder="Ingrese el código de la materia"
        value={subjectCode}
        onChange={(e) => setSubjectCode(e.target.value)}
      />
      <button onClick={handleEnroll}>Inscribir</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EnrollSubject;
