import React, { useState } from 'react';
import './PedagogicalTab.css';

export const PedagogicalTab = () => {

  const [course, setCourse] = useState(''); 
  const [institution, setInstitution] = useState('');
  
  const handleAddPedagogical = () => {
   
    alert(`Curso: ${course}\nInstitución: ${institution}`);
  };

  return (
    <div className="div-pedagogical">
      <input 
        className="input-pedagogical" 
        placeholder="Curso"
        value={course}
        onChange={(e) => setCourse(e.target.value)}  
      />
      <input 
        className="input-pedagogical" 
        placeholder="Institución" 
        value={institution}
        onChange={(e) => setInstitution(e.target.value)} 
      />
      <button className="button-pedagogical" onClick={handleAddPedagogical}>+ AGREGAR</button>
    </div>
  );
        
};
