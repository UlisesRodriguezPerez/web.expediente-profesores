import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import headerimage from './../../assets/images/layouts/header-tec.png';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

export const Sidebar = ({ onLogout, options = [] }) => {

    const [isVisible, setIsVisible] = useState(true);

    const navigate = useNavigate();

    const handleOptionClick = (path) => {
        navigate(path);  // Navigate to the provided path
    };

    const goToHome = () => {
        const user = JSON.parse(localStorage.getItem('user')) || {};
        const roles = user.roles || [];
        const isAdmin = roles.some(role => role.name === 'admin');

        if (isAdmin) {
            navigate('/admin-dashboard');
        } else {
            navigate('/user-dashboard');
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 920) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        // Ejecutar una vez al montar para establecer el estado inicial
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div>
            {isVisible ? (
                <aside className={`sidebar ${isVisible ? 'visible' : ''}`}>
                    <div className="sidebar-top" onClick={goToHome}>
                        <img src={headerimage} alt="Logo" className="sidebar-logo" />
                    </div>
                    <div className="sidebar-options">
                        {options.map((option, index) => (
                            <button key={index} className="option" onClick={() => handleOptionClick(option.path)}>
                                {option.title}
                            </button>
                        ))}
                    </div>
                    <div className="sidebar-bottom">
                        <button className="action-button logout-action" onClick={onLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} aria-hidden="true" />
                            Salir
                        </button>
                    </div>
                </aside>
            ) : null}
            <button className={`toggle-sidebar-btn ${isVisible ? 'beside-logout' : ''}`} onClick={() => setIsVisible(!isVisible)}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </button>
        </div>
    );
};
