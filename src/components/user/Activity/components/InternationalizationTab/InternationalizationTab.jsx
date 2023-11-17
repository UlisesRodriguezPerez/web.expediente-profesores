import React, { useContext, useEffect, useState } from 'react';
import './InternationalizationTab.css';
import dataService from '../../../../../services/dataService.js'
import ROUTES from '../../../../../enums/routes';
import { NotificationContext } from '../../../../../contexts/NotificationContext/NotificationContext.jsx';

export const InternationalizationTab = () => {

    const [name, setName] = useState('');
    const [activityType, setActivityType] = useState('');
    const [activityOptions, setActivityOptions] = useState([]);
    const [university_name, setUniversity] = useState('');
    const [country, setCountry] = useState('');
    const { showNotification } = useContext(NotificationContext);

    const currentUserId = JSON.parse(localStorage.getItem('user')).id;

    const getTypeOptions = async () => {
        try {
          const response = await dataService.readData(`${ROUTES.ACTIVITY_TYPES}`); //RUTA NO EXISTE, DEBE CREARSE
          console.log('Activityy types', response.data.data)
          const activityOptions = response.data.data.map(activity => ({ value: activity.id, label: activity.name }));
          
          setActivityOptions(activityOptions);
          
    
        } catch (error) {
          console.error('Error fetching activity types:', error);
          showNotification('error', 'Error al cargar los tipos de actividad');
        }
    }
    
    const handleAddInternationalization = async() => {
        try{
            if (!name || !activityType || !university_name || !country) {
              showNotification('error', 'Todos los campos son requeridos.');
              return;
            }

            const response = await dataService.createData(`${ROUTES.INTERNATIONALIZATIONS}`, {
                name: name,
                activity_type_id: activityType,
                university_name: university_name,
                country: country,
                user_id: currentUserId,
            });

            console.log('ready to save', response);
            setName('');
            setActivityType('');
            setUniversity('');
            setCountry('');
            
       
            showNotification('success', 'Actividad asignada exitosamente');
        }
        catch (error) {
        console.error('Error al guardar actividad internacionalizacion:', error);
        }

    }

    useEffect(() => {
        getTypeOptions();
      }
      , []);

    return (
        <div className="internationalization-container">
            <input 
                className="input-internationalization" 
                placeholder="Actividad"
                value={name}
                onChange={(e) => setName(e.target.value)} 
            />
            <select 
                className="dropdown-internationalization"
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
            <input 
                className="input-internationalization" 
                placeholder="Universidad donde se desarrolla" 
                value={university_name}
                onChange={(e) => setUniversity(e.target.value)} 
            />
            <input 
                className="input-internationalization" 
                placeholder="País donde se desarrolla" 
                value={country}
                onChange={(e) => setCountry(e.target.value)} 
            />
            <button className="button-internationalization" onClick={handleAddInternationalization}>+ AGREGAR</button>
        </div>
    );
}
