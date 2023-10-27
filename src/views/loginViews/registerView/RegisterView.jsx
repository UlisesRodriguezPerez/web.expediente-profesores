import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './RegisterView.css';
import SecondaryLayout from '../../../layouts/MainLayout/SecondaryLayout';
import { Register } from '../../../components/auth/Register';

// para todas las view es copiar y pegar igual

export const RegisterView = () => {
    const { handleLogout } = useAuth();
    const navigate = useNavigate();

    const customHandleLogout = () => {
        handleLogout();
        navigate('/login');
    };

    const sidebarOptions = [
        
    ];

    return (
        <SecondaryLayout sidebarOptions={sidebarOptions} onLogout={customHandleLogout}>
            <main className="register-content">
                <Register/>
            </main>
        </SecondaryLayout>
    );
};