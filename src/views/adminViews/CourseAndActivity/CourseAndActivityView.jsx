// src/views/SemesterWorkloadView.js

import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import { CourseAndActivity } from '../../../components/admin/CourseAndActivity/CourseAndActivity';

export const CourseAndActivityView = () => {
    const { handleLogout } = useAuth();
    const navigate = useNavigate();

    const customHandleLogout = () => {
        handleLogout();
        navigate('/login');
    };

    const sidebarOptions = [
        { title: "MI PERFIL", path: "/profile" },
        { title: "ABRIR PERIODO", path: "/open-period" },
        { title: "CARGA SEMESTRAL", path: "/semester-workload" },
        { title: "CONSULTAS", path: "/consults" },
    ];

    return (
        <MainLayout sidebarOptions={sidebarOptions} onLogout={customHandleLogout}>
            <main className="open-period-content">
                <CourseAndActivity />
            </main>
        </MainLayout>
    );
};

// export default SemesterWorkloadView;
