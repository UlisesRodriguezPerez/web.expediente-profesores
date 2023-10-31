import React from 'react';
import './FormationTab.css';

export const FormationTab = () => {
    return (
        <div className="formation-container">
            <input className="input-formation" placeholder="Programa" />
            <input className="input-formation" placeholder="Universidad" />
            <input className="input-formation" placeholder="Grado Académico" />

            <div className="year-container">
                <select className="input-year" defaultValue="">
                    <option value="" disabled>Año de Inicio</option>
                    {/* Añade años desde 5 años en el futuro hasta 20 años en el pasado */}
                    {Array.from({ length: 25 }, (_, i) => new Date().getFullYear() + 5 - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                <select className="input-year" defaultValue="">
                    <option value="" disabled>Año de Fin</option>
                    {/* Añade años desde 5 años en el futuro hasta 20 años en el pasado */}
                    {Array.from({ length: 25 }, (_, i) => new Date().getFullYear() + 5 - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            <button className="button-formation">+ AGREGAR</button>
        </div>
    );
}
