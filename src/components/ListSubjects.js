import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListarMaterias({ studentId }) {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/chat/listar/${studentId}`);
                setSubjects(response.data.subjects);
            } catch (error) {
                alert(error.response.data.detail);
            }
        };
        fetchSubjects();
    }, [studentId]);

    return (
        <div>
            <h2>Materias Inscritas</h2>
            <ul>
                {subjects.map((subject) => (
                    <li key={subject.code}>
                        {subject.name} ({subject.code}) - {subject.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListarMaterias;
