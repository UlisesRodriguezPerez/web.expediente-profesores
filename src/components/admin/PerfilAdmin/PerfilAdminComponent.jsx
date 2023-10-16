import React, { useState } from 'react';
import DateRangePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './PerfilAdminComponent.css';
import ROUTES from '../../../enums/routes';
import dataService from '../../../services/dataService';
// dataservices es para obtener la informacion de la base de datos
import { useContext } from 'react';
import { NotificationContext } from '../../../contexts/NotificationContext/NotificationContext';

export const PerfilAdminComponent = () => {
    const [name, setName] = useState('');
    const [lastname1, setLastname1]  = useState('');
    const [lastname2, setLastname2]  = useState('');
    const [phone, setPhone]  = useState('');
    const [email, setEmail]  = useState('');

    const { showNotification } = useContext(NotificationContext);

    //const getdata = async () => {
        //const id = 1;
        //const responseData = await dataService.readData(ROUTES.COLLABORATORS/id);
    //}

    const fetchAdminDataFromServer = async () => {
        try {
            const id_prueba = 1;
            // Realiza una solicitud para obtener los datos del administrador desde tu backend.
            const responseData = await dataService.readData(ROUTES.USERS, id_prueba); // Ajusta la ruta según tu API
            setName(responseData.name);
            setLastname1(responseData.lastname1);
            setLastname2(responseData.lastname2);
            setPhone(responseData.phone);
            setEmail(responseData.email);
        } catch (error) {
            console.error('Error fetching admin data:', error);
            showNotification('error', 'Error al obtener la información del administrador');
        }
    };

    const handleSubmit = async () => {
        // Realizas una nueva solicitud al servidor para obtener la información actualizada del administrador.
        fetchAdminDataFromServer();
    };

    return (
        //la pagina en si
        <div className="perfil-admin-container">
           <h2>Perfil del Administrador</h2>
            <div className="profile-details">
                <div className="profile-field">
                    <label>Nombre</label>
                    <input
                        type="text"
                        value={name}
                        readOnly
                    />
                </div>
                <div className="profile-field">
                    <label>Primer Apellido</label>
                    <input
                        type="text"
                        value={lastname1}
                        readOnly
                    />
                </div>
                <div className="profile-field">
                    <label>Segundo Apellido</label>
                    <input
                        type="text"
                        value={lastname2}
                        readOnly
                    />
                </div>
                <div className="profile-field">
                    <label>Teléfono</label>
                    <input
                        type="text"
                        value={phone}
                        readOnly
                    />
                </div>
                <div className="profile-field">
                    <label>Correo Electrónico</label>
                    <input
                        type="text"
                        value={email}
                        readOnly
                    />
                </div>
            </div>
            <button className="update-button" onClick={handleSubmit}>
                Actualizar Información
            </button>
        </div>
    );
}
