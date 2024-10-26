// Este componente maneja la cancelación de materias.

import React, { useState } from 'react';
import { cancelSubject } from '../services/api'; // Importa la función del servicio API

const CancelSubject = () => {
  const [subjectCode, setSubjectCode] = useState('');
  const [message, setMessage] = useState('');

  // Maneja el envío de la solicitud de cancelación
  const handleCancel = async () => {
    try {
      const response = await cancelSubject(subjectCode);
      setMessage(response.message);
    } catch (error) {
      setMessage('Error canceling subject: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Cancel Subject</h2>
      <input
        type="text"
        placeholder="Enter Subject Code"
        value={subjectCode}
        onChange={(e) => setSubjectCode(e.target.value)}
      />
      <button onClick={handleCancel}>Cancel</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CancelSubject;
