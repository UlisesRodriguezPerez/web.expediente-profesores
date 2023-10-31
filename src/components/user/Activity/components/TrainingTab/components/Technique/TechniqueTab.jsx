import React from 'react';
import './TechniqueTab.css'; // Importa los nuevos estilos

export const TechniqueTab = () => {
    return (
        <div className="actions-container">
          <input className="input-technique" placeholder="Actividad" />
          <select className="dropdown-technique">
              <option value="" disabled selected>Tipo</option>
              {/* Aquí puedes añadir más opciones según los tipos que desees */}
              <option value="tipo1">Tipo 1</option>
              <option value="tipo2">Tipo 2</option>
          </select>
          <button className="button-technique">+ AGREGAR</button>
        </div>

      );
}

