import React, { useState } from 'react';
import headerimage from './../../assets/images/layouts/header-tec.png';
import './LoginSidebar.css';

export const LoginSidebar = () => {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div>
            
            <aside className={`login-sidebar ${isVisible ? 'visible' : ''}`}>
                <div>
                    <h1 className='title-login-sidebar'>Optimice su flujo de trabajo</h1>
                    <p className='words-sidebar'>Su expediente, reportes y actividades.</p>
                    <p className='words-sidebar'>Juntos.</p>
                    <p className='words2-sidebar'>Finalmente, su trabajo en un solo lugar.</p>
                </div>
            </aside>
            
        </div>
    );
};