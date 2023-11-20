import React from 'react';
import './AdminDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import abrirPeriodo from './../../../assets/images/admin-dashboard/abrirPeriodo.png';
import cargaSemestral from './../../../assets/images/admin-dashboard/cargaSemestral.png';
import cursosActividades from './../../../assets/images/admin-dashboard/cursosActividades.png';
import consultas from './../../../assets/images/admin-dashboard/consultas.png';
import calendarImage from './../../../assets/images/admin-dashboard/calendar.png';
import headerIcon from './../../../assets/images/admin-dashboard/header-icon.png';
import CardComponent from './components/CardComponent';

export const AdminDashboard = () => {
    const { handleLogout } = useAuth(); // Destructure handleLogout from the useAuth hook
    const navigate = useNavigate();

    const handleProfileClick = () => {
        // Redirect to profile page
        navigate('/perfil-admin');
    };

    const customHandleLogout = () => {
        handleLogout();
        navigate('/login');
    };

    const cardsData = [
        { image: abrirPeriodo, title: 'ABRIR PERIODO', backgroundColor: 'deep-blue', path: '/open-period' },
        { image: cursosActividades, title: 'CURSOS Y ACTIVIDADES', backgroundColor: 'teal', path: '/courses-and-activities' },
        { image: cargaSemestral, title: 'CARGA SEMESTRAL', backgroundColor: 'bright-red', path: '/semester-workload' },
        { image: consultas, title: 'CONSULTAS', backgroundColor: 'royal-blue', path: '/consults' },
    ];

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <img src={headerIcon} alt="Logo" className="logo" />
                <div className="user-actions">
                    <button className="action-button profile-action" onClick={handleProfileClick}>
                        <FontAwesomeIcon icon={faUser} className="profile-icon" aria-hidden="true" />
                        Perfil
                    </button>
                    <button className="action-button logout-action" onClick={customHandleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" aria-hidden="true" />
                        Salir
                    </button>
                </div>
            </header>

            <main className="dashboard-main">
                {cardsData.map((card, index) => (
                    <CardComponent
                        key={index}
                        backgroundColor={card.backgroundColor}
                        imageSrc={card.image}
                        altText={card.title}
                        title={card.title}
                        onClick={() => navigate(card.path)}
                    />
                ))}
            </main>
        </div>
    );
}
