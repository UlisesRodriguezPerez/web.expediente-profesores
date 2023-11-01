import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './PerfilAdminView.css';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import { PerfilAdminComponent } from '../../../components/admin/PerfilAdmin/PerfilAdminComponent';

// para todas las view es copiar y pegar igual

export const PerfilAdminView = () => {
    const { handleLogout } = useAuth();
    const navigate = useNavigate();

    const customHandleLogout = () => {
        handleLogout();
        navigate('/login');
    };

    const sidebarOptions = [
        { title: "MI PERFIL", path: "/perfil-admin" },
        { title: "CARGA SEMESTRAL", path: "/semester-workload" },
        { title: "CURSOS Y ACTIVIDADES", path: "/courses-and-activities" },
        { title: "CONSULTAS", path: "/consults" },
    ];

    return (
        <MainLayout sidebarOptions={sidebarOptions} onLogout={customHandleLogout}>
            <main className="perfil-admin-content">
                <PerfilAdminComponent/>
            </main>
        </MainLayout>
    );
};

