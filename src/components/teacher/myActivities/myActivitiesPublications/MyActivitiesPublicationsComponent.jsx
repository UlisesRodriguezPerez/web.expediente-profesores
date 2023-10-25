import React, { useState } from 'react';
import DateRangePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './MyActivitiesPublicationsComponent.css';
import ROUTES from '../../../enums/routes';
import dataService from '../../../services/dataService';
// dataservices es para obtener la informacion de la base de datos
import { useContext } from 'react';
import { NotificationContext } from '../../../contexts/NotificationContext/NotificationContext';

export const MyActivitiesPublicationsComponent = () => {
    const [name, setName] = useState('');
    const [lastname1, setLastname1]  = useState('');
    const [lastname2, setLastname2]  = useState('');
    const [phone, setPhone]  = useState('');
    const [email, setEmail]  = useState('');

    const { showNotification } = useContext(NotificationContext);

    const handleSubmit = async () => {
        console.log(name, lastname1, lastname2, phone, email);
    };

    return (
        //la pagina en si
        <div className="activities-publications-container">
        
        </div>
    );
}