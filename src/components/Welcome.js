import React from 'react';

function Welcome({ onSelectOption }) {
    return (
        <div>
            <h1>Bienvenido al Chatbot</h1>
            <p>¿Qué deseas hacer?</p>
            <button onClick={() => onSelectOption(2)}>Inscribir materia</button>
            <button onClick={() => onSelectOption(3)}>Cancelar materia</button>
            <button onClick={() => onSelectOption(4)}>Listar materias inscritas</button>
            <button onClick={() => onSelectOption(1)}>Salir</button>
        </div>
    );
}

export default Welcome;
