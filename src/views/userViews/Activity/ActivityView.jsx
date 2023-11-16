
import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import './ActivityView.css'
import { ActivityComponent } from '../../../components/user/Activity/ActivityComponent';


export const ActivityView = () => {
    const { handleLogout } = useAuth();
    const navigate = useNavigate();

    const customHandleLogout = () => {
        handleLogout();
        navigate('/login');
    };

    const sidebarOptions = [
        { title: "MI PERFIL", path: "/profile" },
        { title: "MIS CURSOS", path: "/courses" },
        { title: "MI HISTORIAL", path: "/history"},
    ];

    return (
        <MainLayout sidebarOptions={sidebarOptions} onLogout={customHandleLogout}>
            <main className="open-period-content">
               <ActivityComponent/>
            </main>
        </MainLayout>
    );
};

