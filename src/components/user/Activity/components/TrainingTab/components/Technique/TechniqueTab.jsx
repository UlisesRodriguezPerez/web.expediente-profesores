import React, { useContext, useEffect, useState } from 'react';
import './TechniqueTab.css'; // Importa los nuevos estilos
import dataService from '../../../../../../../services/dataService.js'
import ROUTES from '../../../../../../../enums/routes'; //posiblemente arreglar
import { NotificationContext } from '../../../../../../../contexts/NotificationContext/NotificationContext.jsx';
export const TechniqueTab = () => {

  const [activity, setActivity] = useState(''); 
  const [activityType, setActivityType] = useState('');
  const { showNotification } = useContext(NotificationContext);
  const [activityOptions, setActivityOptions] = useState([]);

  const currentUserId = JSON.parse(localStorage.getItem('user')).id;

  const getTypeOptions = async () => {
    try {
      const response = await dataService.readData(`${ROUTES.TRAINING_TYPES}`);
      console.log('training types', response.data.data)
      const activityOptions = response.data.data.map(activity => ({ value: activity.id, label: activity.name }));
      
      setActivityOptions(activityOptions);
      

    } catch (error) {
      console.error('Error fetching activity types:', error);
      showNotification('error', 'Error al cargar los tipos de actividad');
    }
  }

  const handleAddTechnique = async () => {
    try{
      if (!activity || !activityType) {
        showNotification('error', 'Todos los campos son requeridos.');
        return; 
      }
      await dataService.createData(`${ROUTES.TECHNICAL_TRAININGS}`, {
        training_type_id: activityType,
        name: activity,
        user_id: currentUserId,
      });

      setActivity('');
      setActivityType('');
     
     
      showNotification('success', 'Actividad asignada exitosamente');
    }
    catch (error) {
      console.error('Error al guardar actividad técnica:', error);
    }
  };

  useEffect(() => {
    getTypeOptions();
  }
  , []);

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
        <option value="" disabled selected hidden>Tipo de actividad</option>
        {activityOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}

      </select>
      <button className="button-technique" onClick={handleAddTechnique}>+ AGREGAR</button>
    </div>
  );
}
