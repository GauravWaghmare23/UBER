import React from 'react';
import { Navigate } from 'react-router-dom';

const NonProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token');

    // If token exists, redirect to appropriate dashboard
    if (token) {
        const role = localStorage.getItem('role');
        if (role === 'user') {
            return <Navigate to="/home" replace />;
        } else if (role === 'captain') {
            return <Navigate to="/captain-home" replace />;
        } else {
            return <Navigate to="/" replace />;
        }
    }

    // If no token, allow access to public routes
    return <>{children}</>;
};

export default NonProtectedWrapper;