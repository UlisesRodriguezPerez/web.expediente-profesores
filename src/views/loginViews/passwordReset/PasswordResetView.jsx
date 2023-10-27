import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './PasswordResetView.css';
import SecondaryLayout from '../../../layouts/MainLayout/SecondaryLayout';
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
        
    ];

    return (
        <SecondaryLayout sidebarOptions={sidebarOptions} onLogout={customHandleLogout}>
            <main className="password-reset-content">
                <PasswordReset/>
            </main>
        </SecondaryLayout>
    );
};