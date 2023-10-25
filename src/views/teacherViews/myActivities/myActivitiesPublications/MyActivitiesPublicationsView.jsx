import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './MyActivitiesPublicationsView.css';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import { MyActivitiesPublicationsComponent } from '../../../components/teacher/myActivities/MyActivitiesPublications/MyActivitiesPublicationsComponent';

// para todas las view es copiar y pegar igual

export const MyActivitiesPublicationsView = () => {
    const { handleLogout } = useAuth();
    const navigate = useNavigate();

    const customHandleLogout = () => {
        handleLogout();
        navigate('/login');
    };

    const sidebarOptions = [
        { title: "MI PERFIL", path: "/perfil-teacher" },
        { title: "MIS CURSOS", path: "/teacher-my-courses" },
    ];

    return (
        <MainLayout sidebarOptions={sidebarOptions} onLogout={customHandleLogout}>
            <main className="activities-publications-container">
                <MyActivitiesPublicationsComponent/>
            </main>
        </MainLayout>
    );
};

