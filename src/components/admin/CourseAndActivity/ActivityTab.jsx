import React, { useContext, useState, useEffect } from 'react';
import { ConfirmationBox } from './../../../common/components/ConfirmationBox/ConfirmationBox';
import { NotificationContext } from '../../../contexts/NotificationContext/NotificationContext';
import dataService from '../../../services/dataService';
import ROUTES from '../../../enums/routes';
import './ActivityTab.css';

export const ActivityTab = ({ onCancel, data, textBoxValue }) => {
    const [description, setDescription] = useState('');
    const [weeklyHours, setWeeklyHours] = useState('');

    //const defaultTextBoxValue = `Agregar la actividad ${description ? description : '[ ]'} al profesor ${teacher ? data.teacher.label : '[ ]'}`
    const { showNotification } = useContext(NotificationContext);
    //const [textBoxValue, setTextBoxValue] = useState(defaultTextBoxValue);

    const handleConfirm = async () => {
        try {
            if (!data.teacher || !data.period || !description || !weeklyHours) {

                showNotification('error', 'Todos los campos son requeridos.');
                return;
            }

            console.log('data', data);

            const response = await dataService.createData(`${ROUTES.GENERAL_ACTIVITIES}`, { //CREAR RUTA
                teacher: data.teacher.value,
                period: data.period.value,
                name: description,
                hours: weeklyHours,
            });

            console.log('response', response);


            showNotification('success', 'Actividad asignada exitosamente');
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

