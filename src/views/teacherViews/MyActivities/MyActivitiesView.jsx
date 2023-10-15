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
        { title: "MI PERFIL", path: "/profile" },
        { title: "CARGA SEMESTRAL", path: "/semester-workload" },
        { title: "CURSOS Y ACTIVIDADES", path: "/courses-and-activities" },
        { title: "CONSULTAS", path: "/consults" },
    ];

    return (
        <MainLayout sidebarOptions={sidebarOptions} onLogout={customHandleLogout}>
            <main className="my-activities-teacher-content">
                <MyActivitiesComponent/>
            </main>
        </MainLayout>
    );
};
