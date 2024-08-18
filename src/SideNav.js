// src/SideNav.js
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './SideNav.css'; // Ensure CSS is imported

import 'bootstrap-icons/font/bootstrap-icons.css';


const SideNav = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear any authentication tokens or user data here
    // For example, localStorage.removeItem('authToken');
    
    // Redirect to the login page
    navigate('/');
  };

  return (
    <>
      <button 
        className="btn btn-toggle d-md-none" 
        onClick={toggleSidebar}
      >
        {isOpen ? 'Close' : 'Open'}
      </button>
      <div 
        className={`bg-light border-end ${isOpen ? 'show' : ''}`} 
        id="sidebar-wrapper"
      >
        <div className="sidebar-heading">My Blog</div>
        <div className="list-group list-group-flush">
          <Link 
            to="/dashboard" 
            className={`list-group-item list-group-item-action ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            <i className="bi bi-house me-2"></i>
            Dashboard
          </Link>
          <Link 
            to="/user" 
            className={`list-group-item list-group-item-action ${location.pathname === '/user' ? 'active' : ''}`}
          >
            <i className="bi bi-person me-2"></i>
            User
          </Link>
          <Link 
            to="/blog"  // Updated to match route for BlogPage
            className={`list-group-item list-group-item-action ${location.pathname === '/blog' ? 'active' : ''}`}
          >
            <i className="bi bi-file-earmark-text me-2"></i>
            View All Posts
          </Link>
          <Link 
            to="/payment-confirmation" 
            className={`list-group-item list-group-item-action ${location.pathname === '/payment-confirmation' ? 'active' : ''}`}
          >
            <i className="bi bi-credit-card me-2"></i>
            View Payment Confirmation
          </Link>
          {/* Logout Button */}
          <button 
            className="list-group-item list-group-item-action"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SideNav;
