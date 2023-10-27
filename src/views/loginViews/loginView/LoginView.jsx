import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './LoginView.css';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
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
        { title: "Optimice su flujo de trabajo" },
    ];

    return (
        <MainLayout sidebarOptions={sidebarOptions} onLogout={customHandleLogout}>
            <main className="login-content">
                <Login/>
            </main>
        </MainLayout>
    );
};