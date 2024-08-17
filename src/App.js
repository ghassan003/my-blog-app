// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogPage from './BlogPage';
import UserPage from './UserPage';
import UserTable from './UserTable';
import AddUserForm from './AddUserForm';
import EditUser from './EditUser';
import PaymentConfirmationPage from './PaymentConfirmationPage';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/user" element={<PrivateRoute element={<UserPage />} />} />
        <Route path="/user-table" element={<PrivateRoute element={<UserTable />} />} />
        <Route path="/add-user" element={<PrivateRoute element={<AddUserForm />} />} />
        <Route path="/edit-user/:id" element={<PrivateRoute element={<EditUser />} />} />
        <Route path="/payment-confirmation" element={<PrivateRoute element={<PaymentConfirmationPage />} />} />
        <Route path="/blog" element={<PrivateRoute element={<BlogPage />} />} />
              </Routes>
    </Router>
  );
};

export default App;
