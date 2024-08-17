// src/UserPage.js
import React, { useState, useEffect } from 'react';
import SideNav from './SideNav';
import UserTable from './UserTable'; // Import UserTable
import CountdownLoader from './CountdownLoader'; // Import CountdownLoader
import './UserPage.css'; // Ensure you have a CSS file for styling

const UserPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetch with a timeout
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after data fetch is complete
    }, 3000); // Adjust the timeout duration to match your data fetching time

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <CountdownLoader />;
  }

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
