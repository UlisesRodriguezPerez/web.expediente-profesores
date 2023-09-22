// contexts/AuthContext.jsx
import React from 'react';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(
    {
        currentUser: {},
        handleLogout: () => { console.log('test')},
    }
);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {

    // This state could hold user information, if you're logged in, etc.
    // For now, we just initialize it with an empty object
    const [currentUser, setCurrentUser] = useState({});

    // Function to handle logging out
    const handleLogout = () => {
        // Remove data from localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        // Update the state if needed
        setCurrentUser({});
        
    };

    const value = {
        currentUser,
        handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
