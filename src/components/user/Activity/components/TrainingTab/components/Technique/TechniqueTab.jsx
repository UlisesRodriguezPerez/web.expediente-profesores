import React, { useState } from 'react';
import './TechniqueTab.css'; // Importa los nuevos estilos
import dataService from '../../../../../../../services/dataService.js'
import ROUTES from '../../../../../../../enums/routes'; //posiblemente arreglar

export const TechniqueTab = () => {

  const [activity, setActivity] = useState(''); 
  const [activityType, setActivityType] = useState('');

  const handleAddTechnique = async () => {
    
    alert(`Actividad: ${activity}\nTipo: ${activityType}`);
    try{
      if (!activity || !activityType) {
        showNotification('error', 'Todos los campos son requeridos.');
        return; // Not continue if any field is empty
      }

      const userValue = JSON.parse(localStorage.getItem('user'));
      console.log(`ID = ${userValue.id}`);
      //OBTENER PERIODO

      //agregar actividad
      /*
      await dataService.createData(`${ROUTES.ACTIVITIES}`, {
        period_id:5,
        creator_id: userValue.id,
        involved_id: userValue.id,
        name: course 
      });
      
      //ARREGLAR FILTRO
      const responseActivityId = await dataService.readData(`${ROUTES.ACTIVITIES}?filter[creator_id]=${userValue.id},[name]=${course}&included=id`);
      console.log(responseActivityId);
      
      //agregar capacitacion tecnica
      await dataService.createData(`${ROUTES.TECHNICAL_TRAININGS}`, {
        activity_id:responseActivityId.data.data[0].activity_id,
        training_type_id: activityType,
        institution_name: "",
        semester_hours: "0"
      });
      */
      showNotification('success', 'Actividad asignada exitosamente');
    }
    catch (error) {
      console.error('Error al guardar actividad pedagogica:', error);
    }
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
