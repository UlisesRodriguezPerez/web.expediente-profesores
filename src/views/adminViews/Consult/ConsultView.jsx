
import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import MainLayout from './../../../layouts/MainLayout/MainLayout';
import './ConsultView.css'
import { Consult } from '../../../components/admin/Consult/Consult';


export const ConsultView = () => {
    const { handleLogout } = useAuth();
    const navigate = useNavigate();

    const customHandleLogout = () => {
        handleLogout();
        navigate('/login');
    };

    const sidebarOptions = [
        { title: "MI PERFIL", path: "/profile" },
        { title: "ABRIR PERIODO", path: "/open-period" },
        { title: "CURSOS Y ACTIVIDADES", path: "/courses-and-activities" },
        { title: "CARGA SEMESTRAL", path: "/semester-workload" },
    ];

    return (
        <MainLayout sidebarOptions={sidebarOptions} onLogout={customHandleLogout}>
            <main className="open-period-content">
                <Consult />
            </main>
        </MainLayout>
    );
};

