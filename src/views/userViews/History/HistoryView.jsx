
import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import './HistoryView.css'
import { HistoryComponent } from '../../../components/user/History/HistoryComponent';


export const HistoryView = () => {
    const { handleLogout } = useAuth();
    const navigate = useNavigate();

    const customHandleLogout = () => {
        handleLogout();
        navigate('/login');
    };

    const sidebarOptions = [
        { title: "MI PERFIL", path: "/profile" },
        { title: "ACTIVIDADES", path: "/activities" },
    ];

    return (
        <MainLayout sidebarOptions={sidebarOptions} onLogout={customHandleLogout}>
            <main className="open-period-content">
                <HistoryComponent />
            </main>
        </MainLayout>
    );
};

