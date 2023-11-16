import React, { useState } from 'react';
import DateRangePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './OpenPeriodComponent.css';
import ROUTES from '../../../enums/routes';
import dataService from '../../../services/dataService';
import { useContext } from 'react';
import { NotificationContext } from '../../../contexts/NotificationContext/NotificationContext';

export const OpenPeriodComponent = () => {
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [observations, setObservations] = useState('');

    const { showNotification } = useContext(NotificationContext);

    const handleSubmit = async () => {
        console.log(name, startDate, endDate, observations);

        try {
            const periodData = {
                name,
                start_date: startDate,
                end_date: endDate,
                observations,
            };

            const responseData = await dataService.createData(ROUTES.PERIODS, periodData);
            console.log('Data created successfully:', responseData);

            // reser fields
            setName('');
            setStartDate(null);
            setEndDate(null);
            setObservations('');
            
            showNotification('success', 'Periodo creado exitosamente');
        } catch (error) {
            console.error('Error creating data:', error);
            showNotification('error', 'Error al crear el periodo');
        }
    };

    return (
        <div className="open-period-container">
            <h2 type="admin-text-opc">Abrir nuevo Periodo</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre"
            />
            <div className="date-picker-container">
                <DateRangePicker
                    startDate={startDate} // first date in the range
                    endDate={endDate} // second date in the range
                    selectsRange={true}
                    monthsShown={2}
                    startDatePlaceholderText="Start Date"
                    placeholderText='Fechas'
                    endDatePlaceholderText="Fechas"
                    onChange={(dates) => {
                        const [start, end] = dates;
                        setStartDate(start);
                        setEndDate(end);
                    }}
                />

            </div>
            <textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Observaciones"
            />
            <button onClick={handleSubmit} className="submit-button">
                + ABRIR
            </button>
        </div>
    );
}
