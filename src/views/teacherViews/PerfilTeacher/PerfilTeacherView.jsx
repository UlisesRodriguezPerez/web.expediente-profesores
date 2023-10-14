import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './PerfilTeacherView.css';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import { PerfilTeacherComponent } from '../../../components/teacher/PerfilTeacher/PerfilTeacherComponent';

// para todas las view es copiar y pegar igual

export const PerfilAdminView = () => {
    const { handleLogout } = useAuth();
    const navigate = useNavigate();

    const customHandleLogout = () => {
        handleLogout();
        navigate('/login');
    };

    const sidebarOptions = [
        { title: "MI PERFIL", path: "/profile" },
        { title: "CURSOS Y ACTIVIDADES", path: "/courses-and-activities" },
    ];

    return (
        <MainLayout sidebarOptions={sidebarOptions} onLogout={customHandleLogout}>
            <main className="perfil-teacher-content">
                <PerfilTeacherComponent/>
            </main>
        </MainLayout>
    );
};