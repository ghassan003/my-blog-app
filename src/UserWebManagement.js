import React, { useState, useEffect } from 'react';
import SideNav from './SideNav'; // Ensure SideNav is imported
import CountdownLoader from './CountdownLoader'; // Ensure CountdownLoader is imported
import WebUserTableCard from './WebUserTableCard'; // Import the WebUserTableCard component
import AddWebUserModal from './AddWebUserModal'; // Import the AddWebUserModal component
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const UserWebManagement = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]); // State for user data

  useEffect(() => {
        const timer = setTimeout(() => {
        setUsers([
            { id: 1, name: 'John Doe', email: 'johndoe@example.com', phone: '123-456-7890', role: 'Admin', status: 'Active' },
            { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', phone: '098-765-4321', role: 'User', status: 'Inactive' },
        ]);
        setLoading(false);
        }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddUser = (newUser) => {
    const newUserData = {
      ...newUser,
      id: users.length + 1
    };
    setUsers([...users, newUserData]); // Add new user to users array
  };

  const handleEdit = (user) => {
    // Edit functionality (not shown for simplicity)
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  if (loading) {
    return <CountdownLoader />;
  }

  return (
    <div className="app-container d-flex">
      <SideNav />
      <div className="main-content flex-grow-1 p-3">
    

        {/* Use the WebUserTableCard component */}
        <WebUserTableCard
          users={users}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default UserWebManagement;
