import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import './CoursesView.css'
import { CoursesComponent } from '../../../components/user/Courses/CoursesComponent';


export const CoursesView = () => {
    const { handleLogout } = useAuth();
    const navigate = useNavigate();

    const customHandleLogout = () => {
        handleLogout();
        navigate('/login');
    };

    const sidebarOptions = [
        { title: "MI PERFIL", path: "/profile" },
        { title: "ACTIVIDADES", path: "/activities" },
        { title: "MI HISTORIAL", path: "/history"},
    ];

    return (
        <MainLayout sidebarOptions={sidebarOptions} onLogout={customHandleLogout}>
            <main className="courses-content">
                <CoursesComponent />
            </main>
        </MainLayout>
    );
};