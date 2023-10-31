import React from 'react';
import './InternationalizationTab.css';

export const InternationalizationTab = () => {
    return (
        <div className="internationalization-container">
            <input className="input-internationalization" placeholder="Actividad" />
            <input className="input-internationalization" placeholder="Tipo de Actividad" />
            <input className="input-internationalization" placeholder="Universidad donde se desarrolla" />
            <input className="input-internationalization" placeholder="País donde se desarrolla" />
            <button className="button-internationalization">+ AGREGAR</button>
        </div>
    );
}
