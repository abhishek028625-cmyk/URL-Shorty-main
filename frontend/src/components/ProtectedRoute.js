import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('token');
    
    // Agar token hai to page dikhao, nahi to login par bhej do
    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;