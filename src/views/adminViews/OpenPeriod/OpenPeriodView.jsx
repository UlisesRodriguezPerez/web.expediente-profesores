import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './OpenPeriodView.css';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import { OpenPeriodComponent } from '../../../components/admin/OpenPeriod/OpenPeriodComponent';

export const OpenPeriod = () => {
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
            <main className="open-period-content">
                <OpenPeriodComponent/>
            </main>
        </MainLayout>
    );
};

