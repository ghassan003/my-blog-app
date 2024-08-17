import React from 'react';
import SideNav from './SideNav';

const Dashboard = () => {
  return (
    <div className="d-flex">
      <SideNav />
      <div className="container mt-5">
        <h2>Welcome to the Dashboard</h2>
        <p>This is the protected area of the application.</p>
      </div>
    </div>
  );
};

export default Dashboard;
