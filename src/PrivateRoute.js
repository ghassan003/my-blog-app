// src/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = !!JSON.parse(localStorage.getItem('user')); // Example check

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;
