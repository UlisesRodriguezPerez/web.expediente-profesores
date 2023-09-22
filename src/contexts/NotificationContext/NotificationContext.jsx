import React, { createContext, useState, useCallback } from 'react';
import './NotificationContext.css';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const showNotification = useCallback((type, message) => {
        setNotification({ type, message });
        setTimeout(() => {
            setNotification(null);
        }, 5000); // Desaparece después de 5 segundos
    }, []);

    return (
        <NotificationContext.Provider value={{ notification, showNotification }}>
            {children}
            {notification && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
        </NotificationContext.Provider>
    );
};
