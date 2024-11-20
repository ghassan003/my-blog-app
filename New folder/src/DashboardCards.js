import React, { useEffect, useState } from 'react';
import SideNav from './SideNav';
import DashboardCards from './DashboardCards'; // Import the new DashboardCards component
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [paidUsers, setPaidUsers] = useState(0);
  const [unpaidUsers, setUnpaidUsers] = useState(0);

  useEffect(() => {
    // Fetch the total number of posts, users, and payment statuses from your database here
    // Example (replace with your actual data-fetching logic):
    setTotalPosts(10); // Replace with actual data fetching
    setTotalUsers(50); // Replace with actual data fetching
    setPaidUsers(30);  // Replace with actual data fetching
    setUnpaidUsers(20); // Replace with actual data fetching
  }, []);

  return (
    <div className="d-flex">
      <SideNav />
      <div className="container mt-5">
        <h2>Welcome to the Dashboard</h2>
        <p>This is the protected area of the application.</p>
        <DashboardCards 
          totalPosts={totalPosts} 
          totalUsers={totalUsers} 
          paidUsers={paidUsers} 
          unpaidUsers={unpaidUsers} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
