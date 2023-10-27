import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './PasswordResetView.css';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import { PasswordReset } from '../../../components/auth/PasswordReset';

// para todas las view es copiar y pegar igual

export const PasswordResetView = () => {
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
            <main className="password-reset-content">
                <PasswordReset/>
            </main>
        </MainLayout>
    );
};