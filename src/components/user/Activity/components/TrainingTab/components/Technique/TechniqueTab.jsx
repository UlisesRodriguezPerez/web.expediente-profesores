import React, { useState } from 'react';
import './TechniqueTab.css'; // Importa los nuevos estilos

export const TechniqueTab = () => {

  const [activity, setActivity] = useState(''); 
  const [activityType, setActivityType] = useState('');

  const handleAddTechnique = () => {
    
    alert(`Actividad: ${activity}\nTipo: ${activityType}`);
  };

  return (
    <div className="actions-container">
      <input 
        className="input-technique" 
        placeholder="Actividad"
        value={activity}
        onChange={(e) => setActivity(e.target.value)} 
      />
      <select 
        className="dropdown-technique"
        value={activityType}
        onChange={(e) => setActivityType(e.target.value)}
      >
          <option value="" disabled selected>Tipo</option>
          {/* Aquí puedes añadir más opciones según los tipos que desees */}
          <option value="tipo1">Tipo 1</option>
          <option value="tipo2">Tipo 2</option>
      </select>
      <button className="button-technique" onClick={handleAddTechnique}>+ AGREGAR</button>
    </div>
  );
}
