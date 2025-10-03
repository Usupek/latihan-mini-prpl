import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');

  // Check if user is authenticated
  if (!token || !userData) {
    return <Navigate to="/login" replace />;
  }

  // If specific role is required, check user role
  if (requiredRole) {
    try {
      const user = JSON.parse(userData);
      if (user.role !== requiredRole) {
        // Show access denied message and redirect
        alert(`Access denied. Only ${requiredRole} can access this page.`);
        return <Navigate to="/login" replace />;
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;