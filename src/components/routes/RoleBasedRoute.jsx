import { Navigate } from 'react-router-dom';
import React from 'react';

export const RoleBasedRoute = ({ component: Component, requiredRoles, ...rest }) => {
    const user = JSON.parse(localStorage.getItem('user')); 
    console.log('user', user);
    const userRoles = user ? user.roles : [];

    const hasRequiredRole = requiredRoles.some(role => 
        userRoles.some(userRole => userRole.name === role)
    );
    console.log('hasRequiredRole', hasRequiredRole);
    console.log('requiredRoles', requiredRoles);
    console.log('userRoles', userRoles);

    if (hasRequiredRole) {
        return <Component {...rest} />;
    } else {
        return <Navigate to="/login" />;
    }
};
