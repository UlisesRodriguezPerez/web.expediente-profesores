import React from 'react';
import { LoginSidebar } from '../../layouts/Sidebar/LoginSidebar';
import './SecondaryLayout.css';

const SecondaryLayout = ({ children, sidebarOptions, onLogout }) => {
    return (
        <div className="secondary-layout">
            <div className="content">
                {children}
            </div>
            <LoginSidebar onLogout={onLogout} options={sidebarOptions} />
        </div>
    );
};

export default SecondaryLayout;