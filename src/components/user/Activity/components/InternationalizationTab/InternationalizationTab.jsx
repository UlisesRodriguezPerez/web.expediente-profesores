import React, { useState } from 'react';
import './InternationalizationTab.css';

export const InternationalizationTab = () => {

    const [actividad, setActividad] = useState('');
    const [tipoActividad, setTipoActividad] = useState('');
    const [universidad, setUniversidad] = useState('');
    const [pais, setPais] = useState('');

    const handleAddInternationalization = () => {
        alert(
        `Actividad: ${actividad}\nTipo de Actividad: ${tipoActividad}\nUniversidad donde se desarrolla: ${universidad}\nPaís donde se desarrolla: ${pais}`
        );
    }

    return (
        <div className="internationalization-container">
            <input 
                className="input-internationalization" 
                placeholder="Actividad"
                value={actividad}
                onChange={(e) => setActividad(e.target.value)} 
            />
            <input 
                className="input-internationalization" 
                placeholder="Tipo de Actividad"
                value={tipoActividad}
                onChange={(e) => setTipoActividad(e.target.value)}  
            />
            <input 
                className="input-internationalization" 
                placeholder="Universidad donde se desarrolla" 
                value={universidad}
                onChange={(e) => setUniversidad(e.target.value)} 
            />
            <input 
                className="input-internationalization" 
                placeholder="País donde se desarrolla" 
                value={pais}
                onChange={(e) => setPais(e.target.value)} 
            />
            <button className="button-internationalization" onClick={handleAddInternationalization}>+ AGREGAR</button>
        </div>
    );
}
