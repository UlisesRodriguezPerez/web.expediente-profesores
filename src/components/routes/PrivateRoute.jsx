import { Navigate } from 'react-router-dom';
import React from 'react';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLogged = localStorage.getItem('token');

    if (isLogged) {
        return <Component {...rest} />;
    } else {
        return <Navigate to="/login" />;
    }
};
