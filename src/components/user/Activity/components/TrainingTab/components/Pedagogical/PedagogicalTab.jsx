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

      const userValue = JSON.parse(localStorage.getItem('user'));
      console.log(`ID = ${userValue.id}`);
      //Obtener periodo

      //agregar actividad
      /*
      await dataService.createData(`${ROUTES.ACTIVITIES}`, {
        period_id:5,
        creator_id: userValue.id,
        involved_id: userValue.id,
        name: course 
      });

      const responseActivityId = await dataService.readData(`${ROUTES.ACTIVITIES}?filter[creator_id]=${responseUserId},[name]=${course}&included=id`);

      //agregar 
      await dataService.createData(`${ROUTES.PEDAGOGICAL_TRAININGS}`, {
        activity_id:responseActivityId.data.data[0].activity_id,
        institution_name: institution
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
