import React from 'react';
import { Sidebar } from '../../layouts/Sidebar/Sidebar';
import './MainLayout.css';

const MainLayout = ({ children, sidebarOptions, onLogout }) => {
    return (
        <div className="main-layout">
            <div className="content">
                {children}
            </div>
            <Sidebar onLogout={onLogout} options={sidebarOptions} />
        </div>
    );
};

export default MainLayout;
