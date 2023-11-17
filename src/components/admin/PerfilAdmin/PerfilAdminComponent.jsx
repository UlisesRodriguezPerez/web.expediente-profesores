import React, { useState, useEffect, useCallback  } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import './PerfilAdminComponent.css';
import ROUTES from '../../../enums/routes';
import dataService from '../../../services/dataService';
//import headerimage from './src/assets/images/layouts/header-tec.png';
// dataservices es para obtener la informacion de la base de datos
import { useContext } from 'react';
import { NotificationContext } from '../../../contexts/NotificationContext/NotificationContext';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faMobileAlt } from '@fortawesome/free-solid-svg-icons';


export const PerfilAdminComponent = () => {
    // id del usuario que abre la pagina
    const [id, setUserPage] = useState(0);
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

    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
      setShowDetails(!showDetails);
    };
    
    const { showNotification } = useContext(NotificationContext);

    // moverme de pantalla
    const navigate = useNavigate(); 

    const navigateToPasswordReset = () => {
      navigate('/password-reset');  // Redirige a '/password-reset'
    };

    const handleSubmit = useCallback( async () => {
        try {
            // Realiza las solicitudes HTTP para obtener los datos de los colaboradores y usuarios
            console.log(`ID? = ${id}`);
            const collaboratorsResponse = await dataService.readData(`${ROUTES.COLLABORATORS}?exactfilter[id]=${id}&included=user,campus,category,position,degree,appointment`);
            //collaboratorsResponse
            //console.log("Llamado api --- ");
            console.log(collaboratorsResponse.data.data[0]);

            setNameUser(collaboratorsResponse.data.data[0].user.name);
            setLastnameUser(collaboratorsResponse.data.data[0].user.last_name);
            setSecondlastUser(collaboratorsResponse.data.data[0].user.second_last_name);
            setPhoneUser(collaboratorsResponse.data.data[0].user.phone);
            setEmailUser(collaboratorsResponse.data.data[0].user.email);
            
            setNameCampus(collaboratorsResponse.data.data[0].campus.name);
            setTecCategory(collaboratorsResponse.data.data[0].category.name);
            setNamePosition(collaboratorsResponse.data.data[0].position.name);
            setAcademicDegrees(collaboratorsResponse.data.data[0].degree.name);
            setNameAppointment(collaboratorsResponse.data.data[0].appointment.name);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            showNotification('error', 'Error al obtener los datos');
        }
    }, [showNotification] );

    // Llama a handleSubmit al iniciar sesión
    useEffect(() => {
        // obtener el id del usuario que inicio seccion
        const idValue = JSON.parse(localStorage.getItem('user'));
        console.log(`ID = ${idValue.id}`);
        setUserPage(idValue.id);


        handleSubmit();
    }, [handleSubmit, id] ); 

    return (
        <div className="admin-profile">
          <h1 type="user-text-tittle">Perfil del Administrador</h1>

          <div className="user-info">
            <div type="user-icon">
              <span className="button-icon"><FontAwesomeIcon icon={faUserTie} /></span>   
            </div>
            <div type="user-data">
              <div>
                <strong>Nombre:</strong> {name_users} {last_name_users} {second_last_name_users}
              </div>
              <div>
                <strong>Grado Académico:</strong> {name_academic_degrees}
              </div>
            </div>
          </div>

          <div className="user-contact">
            <div>
              <strong><FontAwesomeIcon icon={faMobileAlt} />  Teléfono:</strong> {phone_users}
            </div>
            <div>
              <strong><FontAwesomeIcon icon={faEnvelope}  />  Correo Electrónico:</strong> {email_users}
            </div>
          </div>

          <div>
            <h2 className="title">Detalles</h2>
            <div className={showDetails ? 'details-container show' : 'details-container'}>
              <div>
                <strong>Cargo:</strong> {name_position}
              </div>
              <div>
                <strong>Campus:</strong> {name_campus}
              </div>
              <div>
                <strong>Categoría Técnica:</strong> {name_tec_category}
              </div>
              <div>
                <strong>Área de Nombramiento:</strong> {name_appointment}
              </div>
              <div>
                <button className="reset-button" onClick={navigateToPasswordReset}>Cambiar Contrasena</button>
              </div>
            </div>
            <button className="toggle-button" onClick={toggleDetails}>
              {showDetails ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
            </button> 
          </div>

        </div>
      );
}
