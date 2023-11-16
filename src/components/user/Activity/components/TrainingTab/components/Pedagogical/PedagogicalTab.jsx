import React, { useState, useContext } from 'react';
import { NotificationContext } from '../../../../../../../contexts/NotificationContext/NotificationContext';
import './PedagogicalTab.css';
import dataService from '../../../../../../../services/dataService.js'
import ROUTES from '../../../../../../../enums/routes'; //posiblemente arreglar

export const PedagogicalTab = () => {

  const [course, setCourse] = useState(''); 
  const [institution, setInstitution] = useState('');
  const { showNotification } = useContext(NotificationContext);
  
  const handleAddPedagogical = async () => {
    alert(`Curso: ${course}\nInstitución: ${institution}`);
    try{
      if (!course || !institution) {
        showNotification('error', 'Todos los campos son requeridos.');
        return; // Not continue if any field is empty
      }

      // AUTOMATICO, NO ES NECESARIO
      //const userValue = JSON.parse(localStorage.getItem('user'));
      //console.log(`ID = ${userValue.id}`);
      

      //agregar actividad CAPACITACION PEDAGOGICA
      /*
      await dataService.createData(`${ROUTES.PEDAGOGICAL_TRAININGS}`, { //CONFIRMAR RUTA CORRECTA Y NOMBRES EN ING
        name: course,
        institution_name
      });
      */
      
      showNotification('success', 'Actividad asignada exitosamente');
    }
    catch (error) {
      console.error('Error al guardar actividad pedagogica:', error);
    }
    
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
