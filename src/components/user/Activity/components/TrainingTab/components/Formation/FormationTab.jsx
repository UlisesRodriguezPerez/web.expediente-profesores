import React, { useContext, useState } from 'react';
import './FormationTab.css';
import dataService from '../../../../../../../services/dataService.js'
import ROUTES from '../../../../../../../enums/routes';
import { NotificationContext } from '../../../../../../../contexts/NotificationContext/NotificationContext.jsx';

export const FormationTab = () => {

    const [program, setProgram] = useState('');
    const [university, setUniversity] = useState('');
    const [academicDegree, setAcademicDegree] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const { showNotification } = useContext(NotificationContext);

    const currentUserId = JSON.parse(localStorage.getItem('user')).id;

    const handleAddFormation = async () => {
        
        try{
            if (!program || !university || !academicDegree || !startYear || !endYear) {
              showNotification('error', 'Todos los campos son requeridos.');
              return; 
            }

            
            const response = await dataService.createData(`${ROUTES.FORMATION_TRAININGS}`, {
                name: program,
                university: university,
                academic_degree: academicDegree,
                start_year: startYear,
                end_year: endYear,
                user_id: currentUserId,
            });

            setProgram('');
            setUniversity('');
            setAcademicDegree('');
            setStartYear('');
            setEndYear('');
       
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
                value={program}
                onChange={(e) => setProgram(e.target.value)}
            />
            <input
                className="input-formation"
                placeholder="Universidad"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
            />
            <input
                className="input-formation"
                placeholder="Grado Académico"
                value={academicDegree}
                onChange={(e) => setAcademicDegree(e.target.value)}
            />

            <div className="year-container">
                <select 
                    className="input-year" 
                    defaultValue=""
                    onChange={(e) => setStartYear(e.target.value)}
                >
                    <option value="" disabled>Año de Inicio</option>
                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + 5 - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                <select 
                    className="input-year" 
                    defaultValue=""
                    onChange={(e) => setEndYear(e.target.value)}
                >
                    <option value="" disabled>Año de Fin</option>
                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + 5 - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            <button className="button-formation" onClick={handleAddFormation}>+ AGREGAR</button>
        </div>
    );
}
