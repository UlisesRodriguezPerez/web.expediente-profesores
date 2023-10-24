// src/views/SemesterWorkloadView.js

import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import MainLayout from './../../../layouts/MainLayout/MainLayout';
import './SemesterWorkloadView.css'
import { SemesterWorkload } from '../../../components/admin/SemesterWorkload/SemesterWorkload';

export const SemesterWorkloadView = () => {
    const { handleLogout } = useAuth();
    const navigate = useNavigate();

    const customHandleLogout = () => {
        handleLogout();
        navigate('/login');
    };

    const sidebarOptions = [
        { title: "MI PERFIL", path: "/perfil-admin" },
        { title: "ABRIR PERIODO", path: "/open-period" },
        { title: "CURSOS Y ACTIVIDADES", path: "/courses-and-activities" },
        { title: "CONSULTAS", path: "/consults" },
    ];

    return (
        <MainLayout sidebarOptions={sidebarOptions} onLogout={customHandleLogout}>
            <main className="open-period-content">
                <SemesterWorkload />
            </main>
        </MainLayout>
    );
};

// export default SemesterWorkloadView;
