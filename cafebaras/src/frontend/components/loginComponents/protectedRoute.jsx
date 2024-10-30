import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userId = localStorage.getItem('userId');

    return (isAuthenticated && userId) ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
