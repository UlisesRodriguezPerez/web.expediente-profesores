import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './MyActivitiesInternationalizationView.css';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import { MyActivitiesInternationalizationComponent } from '../../../components/teacher/myActivities/myActivitiesInternationalization/MyActivitiesInternationalizationComponent';

// para todas las view es copiar y pegar igual

export const MyActivitiesInternationalizationView = () => {
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
            <main className="activities-internationalization-container">
                <MyActivitiesInternationalizationComponent/>
            </main>
        </MainLayout>
    );
};

