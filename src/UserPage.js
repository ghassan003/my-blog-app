import React from 'react';
import SideNav from './SideNav';
import UserTable from './UserTable'; // Import UserTable
import './UserPage.css'; // Ensure you have a CSS file for styling

const UserPage = () => {
  return (
    <div className="app-container">
      <SideNav />
      <div className="main-content">
        <div className="container mt-5">
          <h2 className="text-center">User Management</h2>
          <UserTable /> {/* Render the UserTable component */}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
