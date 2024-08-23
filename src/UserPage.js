import React, { useState, useEffect } from 'react';
import SideNav from './SideNav';
import UserTable from './UserTable'; // Import UserTable
import CountdownLoader from './CountdownLoader'; // Import CountdownLoader
import { Card } from 'react-bootstrap'; // Import Card component from React-Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
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
    <div className="app-container d-flex">
      <SideNav />
      <div className="main-content flex-grow-1 p-3">
        <div className="container mt-6">
         
          <Card className="mb-4">
            <Card.Header as="h5" className="bg-primary text-white font-weight-bold">
            <h2 className="text-center mb-4">User Management</h2>            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <UserTable /> {/* Render the UserTable component */}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
