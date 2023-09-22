import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import headerimage from './../../assets/images/layouts/header-tec.png';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

export const Sidebar = ({ onLogout, options = [] }) => {

    const navigate = useNavigate();

    const handleOptionClick = (path) => {
        navigate(path);  // Navigate to the provided path
    };

    const goToHome = () => {
        navigate('/admin-dashboard');  // Navigate to Home view
    };


    return (
        <aside className="sidebar">
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
    );
};
