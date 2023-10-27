import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './RegisterView.css';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
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
        { title: "Optimice su flujo de trabajo" },
    ];

    return (
        <MainLayout sidebarOptions={sidebarOptions} onLogout={customHandleLogout}>
            <main className="register-content">
                <Register/>
            </main>
        </MainLayout>
    );
};