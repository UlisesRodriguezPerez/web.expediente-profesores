import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './MyActivitiesTrainingTechniquesView.css';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import { MyActivitiesTrainingTechniquesComponent } from '../../../components/teacher/myActivities/myActivitiesTraining/myActivitiesTrainingTechniques/myActivitiesTrainingTechniquesComponent';

// para todas las view es copiar y pegar igual

export const MyActivitiesTrainingTechniquesView = () => {
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
            <main className="activities-training-techniques-container">
                <MyActivitiesTrainingTechniquesComponent/>
            </main>
        </MainLayout>
    );
};

