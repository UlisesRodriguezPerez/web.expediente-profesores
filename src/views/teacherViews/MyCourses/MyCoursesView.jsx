import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './MyCoursesView.css';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import { MyCoursesComponent } from '../../../components/teacher/myCourses/MyCoursesComponent';

// para todas las view es copiar y pegar igual

export const MyCoursesView = () => {
    const { handleLogout } = useAuth();
    const navigate = useNavigate();

    const customHandleLogout = () => {
        handleLogout();
        navigate('/login');
    };

    const sidebarOptions = [
        { title: "MI PERFIL", path: "/perfil-teacher" },
        { title: "MIS ACTIVIDADES", path: "/teacher-my-activities" },
    ];

    return (
        <MainLayout sidebarOptions={sidebarOptions} onLogout={customHandleLogout}>
            <main className="my-courses-content">
                <MyCoursesComponent/>
            </main>
        </MainLayout>
    );
};

