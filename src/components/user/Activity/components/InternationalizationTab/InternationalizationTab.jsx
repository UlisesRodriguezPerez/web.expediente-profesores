import React, { useContext, useState } from 'react';
import './InternationalizationTab.css';
import dataService from '../../../../../services/dataService.js'
import ROUTES from '../../../../../enums/routes';
import { NotificationContext } from '../../../../../contexts/NotificationContext/NotificationContext.jsx';

export const InternationalizationTab = () => {

    const [actividad, setActividad] = useState('');
    const [tipoActividad, setTipoActividad] = useState('');
    const [universidad, setUniversidad] = useState('');
    const [pais, setPais] = useState('');
    const { showNotification } = useContext(NotificationContext);

    const handleAddInternationalization = () => {
        alert(
        `Actividad: ${actividad}\nTipo de Actividad: ${tipoActividad}\nUniversidad donde se desarrolla: ${universidad}\nPaís donde se desarrolla: ${pais}`
        );

        try{
            if (!actividad || !tipoActividad || !universidad || !pais) {
              showNotification('error', 'Todos los campos son requeridos.');
              return; // Not continue if any field is empty
            }

            //agregar actividad INTERNACIONALIZACION
            /*
            await dataService.createData(`${ROUTES.INTERNATIONALIZATIONS}`, { //CONFIRMAR RUTA CORRECTA Y NOMBRES EN ING
                name: actividad,
                activity_type_id: tipoActividad,
                university_name: universidad,
                pais: pais
            });
            */
       
            showNotification('success', 'Actividad asignada exitosamente');
        }
        catch (error) {
        console.error('Error al guardar actividad pedagogica:', error);
        }

    }

    return (
        <div className="internationalization-container">
            <input 
                className="input-internationalization" 
                placeholder="Actividad"
                value={actividad}
                onChange={(e) => setActividad(e.target.value)} 
            />
            <input 
                className="input-internationalization" 
                placeholder="Tipo de Actividad"
                value={tipoActividad}
                onChange={(e) => setTipoActividad(e.target.value)}  
            />
            <input 
                className="input-internationalization" 
                placeholder="Universidad donde se desarrolla" 
                value={universidad}
                onChange={(e) => setUniversidad(e.target.value)} 
            />
            <input 
                className="input-internationalization" 
                placeholder="País donde se desarrolla" 
                value={pais}
                onChange={(e) => setPais(e.target.value)} 
            />
            <button className="button-internationalization" onClick={handleAddInternationalization}>+ AGREGAR</button>
        </div>
    );
}
