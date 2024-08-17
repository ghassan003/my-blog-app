// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogPage from './BlogPage'; // Import BlogPage
import UserPage from './UserPage'; // Import UserPage
import UserTable from './UserTable'; // Import UserTable
import AddUserForm from './AddUserForm'; // Import AddUserForm
import EditUser from './EditUser'; // Import EditUser
import PaymentConfirmationPage from './PaymentConfirmationPage'; // Import PaymentConfirmationPage
import LoginPage from './LoginPage'; // Import LoginPage
import Dashboard from './Dashboard'; // Import Dashboard

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Default route for login */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Protected dashboard route */}
        <Route path="/user" element={<UserPage />} /> {/* Route for UserPage */}
        <Route path="/user-table" element={<UserTable />} /> {/* Route for UserTable */}
        <Route path="/add-user" element={<AddUserForm />} /> {/* Route for AddUserForm */}
        <Route path="/edit-user/:id" element={<EditUser />} /> {/* Route for EditUser */}
        <Route path="/payment-confirmation" element={<PaymentConfirmationPage />} /> {/* Route for PaymentConfirmationPage */}
        <Route path="/blog" element={<BlogPage />} /> {/* Route for BlogPage */}
      </Routes>
    </Router>
  );
};

export default App;
