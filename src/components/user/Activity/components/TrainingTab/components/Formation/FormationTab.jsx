import React, { useContext, useState } from 'react';
import './FormationTab.css';
import dataService from '../../../../../../../services/dataService.js'
import ROUTES from '../../../../../../../enums/routes';
import { NotificationContext } from '../../../../../../../contexts/NotificationContext/NotificationContext.jsx';

export const FormationTab = () => {

    const [programa, setPrograma] = useState('');
    const [universidad, setUniversidad] = useState('');
    const [gradoAcademico, setGradoAcademico] = useState('');
    const [anioInicio, setAnioInicio] = useState('');
    const [anioFin, setAnioFin] = useState('');
    const { showNotification } = useContext(NotificationContext);

    const handleAddFormation = () => {
        
        alert(`Programa: ${programa}\nUniversidad: ${universidad}\nGrado Académico: ${gradoAcademico}\nAño de Inicio: ${anioInicio}\nAño de Fin: ${anioFin}`);
        try{
            if (!programa || !universidad || !gradoAcademico || !anioInicio || !anioFin) {
              showNotification('error', 'Todos los campos son requeridos.');
              return; // Not continue if any field is empty
            }

            //agregar actividad CAPACITACION FORMACION
            /*
            await dataService.createData(`${ROUTES.FORMATION_TRAININGS}`, { //CONFIRMAR RUTA CORRECTA Y NOMBRES EN ING
                name: programa,
                university_name: universidad,
                academic_degree: gradoAcademico,
                anno_Inicio: anioInicio,
                anno_Fin: anioFin
            });
            */
       
            showNotification('success', 'Actividad asignada exitosamente');
          }
          catch (error) {
            console.error('Error al guardar actividad pedagogica:', error);
          }
    };

    return (
        <div className="formation-container">
            <input
                className="input-formation"
                placeholder="Programa"
                value={programa}
                onChange={(e) => setPrograma(e.target.value)}
            />
            <input
                className="input-formation"
                placeholder="Universidad"
                value={universidad}
                onChange={(e) => setUniversidad(e.target.value)}
            />
            <input
                className="input-formation"
                placeholder="Grado Académico"
                value={gradoAcademico}
                onChange={(e) => setGradoAcademico(e.target.value)}
            />

            <div className="year-container">
                <select 
                    className="input-year" 
                    defaultValue=""
                    onChange={(e) => setAnioInicio(e.target.value)}
                >
                    <option value="" disabled>Año de Inicio</option>
                    {/* Añade años desde 5 años en el futuro hasta 20 años en el pasado */}
                    {Array.from({ length: 25 }, (_, i) => new Date().getFullYear() + 5 - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                <select 
                    className="input-year" 
                    defaultValue=""
                    onChange={(e) => setAnioFin(e.target.value)}
                >
                    <option value="" disabled>Año de Fin</option>
                    {/* Añade años desde 5 años en el futuro hasta 20 años en el pasado */}
                    {Array.from({ length: 25 }, (_, i) => new Date().getFullYear() + 5 - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            <button className="button-formation" onClick={handleAddFormation}>+ AGREGAR</button>
        </div>
    );
}
