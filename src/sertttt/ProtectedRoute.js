// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  // Replace with your actual authentication logic
  const isAuthenticated = localStorage.getItem('authToken') !== null;

  return isAuthenticated ? Component : <Navigate to="/" />;
};

export default ProtectedRoute;
