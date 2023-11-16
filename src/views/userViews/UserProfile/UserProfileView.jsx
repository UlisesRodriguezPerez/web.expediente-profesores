import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './UserProfileView.css';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import { UserProfileComponent } from '../../../components/user/Profile/UserProfileComponent';

// para todas las view es copiar y pegar igual

export const UserProfileView = () => {
    const { handleLogout } = useAuth();
    const navigate = useNavigate();

    const customHandleLogout = () => {
        handleLogout();
        navigate('/login');
    };

    const sidebarOptions = [
        { title: "ACTIVIDADES", path: "/activities" },
        { title: "MIS CURSOS", path: "/courses" },
        { title: "Mi HISTORIAL", path: "/history"},
    ];

    return (
        <MainLayout sidebarOptions={sidebarOptions} onLogout={customHandleLogout}>
            <main className="login-content">
                <UserProfileComponent/>
            </main>
        </MainLayout>
    );
};