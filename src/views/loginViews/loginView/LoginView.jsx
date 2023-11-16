import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './LoginView.css';
import SecondaryLayout from '../../../layouts/MainLayout/SecondaryLayout';
import { Login } from '../../../components/auth/Login';

// para todas las view es copiar y pegar igual

export const LoginView = () => {
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
            <main className="login-content">
                <Login/>
            </main>
        </SecondaryLayout>
    );
};