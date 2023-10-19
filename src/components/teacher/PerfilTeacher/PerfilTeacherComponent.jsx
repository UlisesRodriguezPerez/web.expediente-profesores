import React, { useState } from 'react';
import DateRangePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './PerfilTeacherComponent.css';
import ROUTES from '../../../enums/routes';
import dataService from '../../../services/dataService';
// dataservices es para obtener la informacion de la base de datos
import { useContext } from 'react';
import { NotificationContext } from '../../../contexts/NotificationContext/NotificationContext';

export const PerfilTeacherComponent = () => {
    // id del usuario que abre la pagina
    const [id, setUserPage] = useState(0);
    // ids del collaborador, los datos que buscamos
    //  const responseData = await dataService.readData(ROUTES.COLLABORATORS, id);
    const [id_user, setUserId] = useState(0);
    const [id_position, setUserPosition] = useState(0);
    const [id_category, setUserCategory] = useState(0);
    const [id_appointment, setUserAppointment] = useState(0);
    const [id_degree, setUserDegree] = useState(0);
    const [id_campus, setUserCampus] = useState(0);
    // aqui van la busqueda de los valores strings
    //  const responseData = await dataService.readData(ROUTES.USERS, id_user);
    const [name_users, setNameUser] = useState('');
    const [last_name_users, setLastnameUser]  = useState('');
    const [second_last_name_users, setSecondlastUser]  = useState('');
    const [phone_users, setPhoneUser]  = useState('');
    const [email_users, setEmailUser]  = useState('');
    //  const responseData = await dataService.readData(ROUTES.TEC_CATEGORIES, id_category);
    const [name_tec_category, setTecCategory] = useState('');
    //  const responseData = await dataService.readData(ROUTES.APPOINTMENT_TYPES, id_appointment);
    const [name_appointment, setNameAppointment] = useState('');
    //  const responseData = await dataService.readData(ROUTES.ACADEMIC_DEGREES, id_degree);
    const [name_academic_degrees, setAcademicDegrees] = useState('');
    //  const responseData = await dataService.readData(ROUTES.CAMPUSES, id_campus);
    const [name_campus, setNameCampus] = useState('');
    //  const responseData = await dataService.readData(ROUTES.POSITIONS, id_position);
    const [name_position, setNamePosition] = useState('');

    // ------------------- fin de la variables ---------------------------

    const { showNotification } = useContext(NotificationContext);

    const handleSubmit = async () => {
        //console.log(name, lastname1, lastname2, phone, email);
    };

    return (
        //la pagina en si
        <div className="perfil-admin-container">
        
        </div>
    );
}