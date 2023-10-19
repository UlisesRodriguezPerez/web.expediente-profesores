import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './MyActivitiesView.css';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import { MyActivitiesComponent } from '../../../components/teacher/myActivities/MyActivitiesComponent';

// para todas las view es copiar y pegar igual

export const MyActivitiesView = () => {
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
            <main className="my-activities-teacher-content">
                <MyActivitiesComponent/>
            </main>
        </MainLayout>
    );
};
