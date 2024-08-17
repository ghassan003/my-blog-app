import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideNav.css'; // Ensure CSS is imported

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
            to="/user" 
            className={`list-group-item list-group-item-action ${location.pathname === '/user' ? 'active' : ''}`}
          >
            User
          </Link>
          <Link 
            to="/" 
            className={`list-group-item list-group-item-action ${location.pathname === '/' ? 'active' : ''}`}
          >
            View All Posts
          </Link>
          <Link 
            to="/payment-confirmation" 
            className={`list-group-item list-group-item-action ${location.pathname === '/payment-confirmation' ? 'active' : ''}`}
          >
            View Payment Confirmation
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideNav;
