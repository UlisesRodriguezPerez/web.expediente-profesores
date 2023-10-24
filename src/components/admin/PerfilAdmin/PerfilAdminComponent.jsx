import React, { useState, useEffect, useCallback  } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import './PerfilAdminComponent.css';
import ROUTES from '../../../enums/routes';
import dataService from '../../../services/dataService';
// dataservices es para obtener la informacion de la base de datos
import { useContext } from 'react';
import { NotificationContext } from '../../../contexts/NotificationContext/NotificationContext';

export const PerfilAdminComponent = () => {
    // id del usuario que abre la pagina
    const [id, setUserPage] = useState(3);
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

    const handleSubmit = useCallback( async () => {
        try {
            // Realiza las solicitudes HTTP para obtener los datos de los colaboradores y usuarios
            const collaboratorsResponse = await dataService.readData(ROUTES.COLLABORATORS, id);
            const collaboratorsData = await collaboratorsResponse.json();

            const usersResponse = await dataService.readData(ROUTES.USERS, id_user);
            const usersData = await usersResponse.json();

            // Actualiza el estado con los datos obtenidos
            setUserId(collaboratorsData.id_user);
            setUserPosition(collaboratorsData.id_position);
            setUserCategory(collaboratorsData.id_category);
            setUserAppointment(collaboratorsData.id_appointment);
            setUserDegree(collaboratorsData.id_degree);
            setUserCampus(collaboratorsData.id_campus);

            setNameUser(usersData.name);
            setLastnameUser(usersData.last_name);
            setSecondlastUser(usersData.second_last_name);
            setPhoneUser(usersData.phone);
            setEmailUser(usersData.email);

            // Ahora, carguemos datos adicionales
            const tecCategoryResponse = await dataService.readData(ROUTES.TEC_CATEGORIES, id_category);
            const tecCategoryData = await tecCategoryResponse.json();
            setTecCategory(tecCategoryData.name);

            const appointmentResponse = await dataService.readData(ROUTES.APPOINTMENT_TYPES, id_appointment);
            const appointmentData = await appointmentResponse.json();
            setNameAppointment(appointmentData.name);

            const academicDegreesResponse = await dataService.readData(ROUTES.ACADEMIC_DEGREES, id_degree);
            const academicDegreesData = await academicDegreesResponse.json();
            setAcademicDegrees(academicDegreesData.name);

            const campusResponse = await dataService.readData(ROUTES.CAMPUSES, id_campus);
            const campusData = await campusResponse.json();
            setNameCampus(campusData.name);

            const positionsResponse = await dataService.readData(ROUTES.POSITIONS, id_position);
            const positionsData = await positionsResponse.json();
            setNamePosition(positionsData.name);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            showNotification('error', 'Error al obtener los datos');
        }
    }, [id, id_user, id_category, id_appointment, id_degree, id_campus, id_position, showNotification] );

    // Llama a handleSubmit al iniciar sesión
    useEffect(() => {
        // obtener el id del usuario que inicio seccion
        setUserPage(localStorage.getItem('userId'));

        handleSubmit();
    }, [handleSubmit] ); 

    return (
        <div className="user-profile">
          <h1>Perfil del Usuario Administrador</h1>
          <div>
            <strong>Nombre:</strong> {name_users} {last_name_users} {second_last_name_users}
          </div>
          <div>
            <strong>Teléfono:</strong> {phone_users}
          </div>
          <div>
            <strong>Correo Electrónico:</strong> {email_users}
          </div>
          <div>
            <strong>Categoría Técnica:</strong> {name_tec_category}
          </div>
          <div>
            <strong>Área de Nombramiento:</strong> {name_appointment}
          </div>
          <div>
            <strong>Grado Académico:</strong> {name_academic_degrees}
          </div>
          <div>
            <strong>Campus:</strong> {name_campus}
          </div>
          <div>
            <strong>Cargo:</strong> {name_position}
          </div>
        </div>
      );
}
