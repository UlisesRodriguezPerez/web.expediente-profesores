import React, { useContext, useState } from 'react';
import { ConfirmationBox } from './../../../common/components/ConfirmationBox/ConfirmationBox';
import { NotificationContext } from '../../../contexts/NotificationContext/NotificationContext';
import './ActivityTab.css';

export const ActivityTab = ({ onCancel, data, textBoxValue }) => {
    const [description, setDescription] = useState('');
    const [weeklyHours, setWeeklyHours] = useState('');

    const { showNotification } = useContext(NotificationContext);

    const handleConfirm = async () => {
        try {
            if (!data.selectedTeacher || !data.selectedPeriod || !description || !weeklyHours) {

                showNotification('error', 'Todos los campos son requeridos.');
                return; // Not continue if any field is empty
            }
            // await dataService.createData('courendpoint', {
            //     teacher: data.selectedTeacher.value,
            //     period: data.selectedPeriod.value,
            //     description: description,
            //     weeklyHours: weeklyHours
            // });
            console.log('teacher', data.selectedTeacher.value);
            console.log('period', data.selectedPeriod.value);
            console.log('description', description);
            console.log('weeklyHours', weeklyHours);
            console.log('success');

            /*
            //agregar actividad GENERAL
            await dataService.createData(`${ROUTES.GENERAL_ACTIVITIES}`, { //CONFIRMAR RUTA CORRECTA Y NOMBRES EN ING
                name: description,
                hours: weeklyHours
            });

            //ASOCIAR CON EL PROFE Y EL PERIODO

            */


            showNotification('success', 'Actividad asignada exitosamente (pendiente guardar en DB)');
        } catch (error) {
            console.error('error');
            showNotification('error', 'Error al asignar la actividad');
        }
    }

    return (
        <div className="activity-tab-container">
            <div className="input-container">
                <label htmlFor="description">Descripción:</label>
                <input
                    type="text"
                    id="description"
                    className="description-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="input-container">
                <label htmlFor="weeklyHours">Horas Semanales:</label>
                <input
                    type="number"
                    id="weeklyHours"
                    className="weekly-hours-input"
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(e.target.value)}
                    min="0"
                />
            </div>

            <ConfirmationBox
                text={textBoxValue}
                onConfirm={handleConfirm}
                onCancel={onCancel}
            />
        </div>
    );
}

