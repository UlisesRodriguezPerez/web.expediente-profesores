import React, { useState } from 'react';
import DateRangePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './MyActivitiesComponent.css';
import ROUTES from '../../../enums/routes';
import dataService from '../../../services/dataService';
// dataservices es para obtener la informacion de la base de datos
import { useContext } from 'react';
import { NotificationContext } from '../../../contexts/NotificationContext/NotificationContext';

export const MyActivitiesComponent = () => {
    const [name, setName] = useState('');
    // para que la variable cambie
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [observations, setObservations] = useState('');

    const { showNotification } = useContext(NotificationContext);

    const getdata = async () => {
        const id = 1;
        const responseData = await dataService.readData(ROUTES.COLLABORATORS/id);
    }

    const handleSubmit = async () => {
        console.log(name, startDate, endDate, observations);

        try { // en este try obtiene toda la informacion necesaria
            const periodData = {
                name,
                start_date: startDate,
                end_date: endDate,
                observations,
            };

            const responseData = await dataService.createData(ROUTES.PERIODS, periodData);
            //Routes -> ahi estan las tablas de la base de datos
            // la data del usuario  localStorage.setItem
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
        //la pagina en si
        <div className="my-activities-teacher-container">
           
        </div>
    );
}
