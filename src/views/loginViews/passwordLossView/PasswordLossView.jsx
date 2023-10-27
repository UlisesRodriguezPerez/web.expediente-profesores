import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './PasswordLossView.css';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import { PasswordLoss } from '../../../components/auth/PasswordLoss';

// para todas las view es copiar y pegar igual

export const PasswordLossView = () => {
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
            <main className="password-loss-content">
                <PasswordLoss/>
            </main>
        </MainLayout>
    );
};