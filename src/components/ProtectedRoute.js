import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        // If no user is logged in, redirect to the login page
        return <Navigate to="/login" />;
    }

    // If a user is logged in, render the component that was passed in (e.g., AdminPage)
    return children;
};

export default ProtectedRoute;
