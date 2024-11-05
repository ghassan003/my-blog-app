// import React, { useState, useEffect } from 'react';
// import SideNav from './SideNav'; // Ensure SideNav is imported
// import CountdownLoader from './CountdownLoader'; // Ensure CountdownLoader is imported
// import WebUserTableCard from './WebUserTableCard'; // Import the WebUserTableCard component
// import AddWebUserModal from './AddWebUserModal'; // Import the AddWebUserModal component
// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

// const UserWebManagement = () => {
//   const [loading, setLoading] = useState(true);
//   const [users, setUsers] = useState([]); // State for user data
//   const [showAddUserModal, setShowAddUserModal] = useState(false); // State for showing AddWebUserModal

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setUsers([
//         { id: 1, name: 'John Doe', email: 'johndoe@example.com', phone: '123-456-7890', role: 'Admin', status: 'Active' },
//         { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', phone: '098-765-4321', role: 'User', status: 'Inactive' },
//       ]);
//       setLoading(false);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   const handleAddUser = (newUser) => {
//     const newUserData = {
//       ...newUser,
//       id: users.length + 1
//     };
//     setUsers([...users, newUserData]); // Add new user to users array
//     setShowAddUserModal(false); // Close the modal after adding the user
//   };

//   const handleEdit = (user) => {
//     // Edit functionality (not shown for simplicity)
//   };

//   const handleDelete = (userId) => {
//     setUsers(users.filter(user => user.id !== userId));
//   };

//   const handleCloseAddUserModal = () => setShowAddUserModal(false);

//   if (loading) {
//     return <CountdownLoader />;
//   }

//   return (
//     <div className="app-container d-flex">
//       <SideNav />
      

//       <div>
//       <AddWebUserModal show={showAddUserModal} onClose={handleCloseAddUserModal} onAddUser={handleAddUser} /> 
//       </div>
//       <div className="main-content flex-grow-1 p-3">
   

//         {/* Button to trigger AddWebUserModal */}
//         {/* <button className="btn btn-primary mb-4" onClick={handleShowAddUserModal}>
//           Add New User
//         </button> */}

//         {/* Use the WebUserTableCard component */}
//         <WebUserTableCard
        
//           users={users}
//           handleEdit={handleEdit}
//           handleDelete={handleDelete}
//           handleAddUser={handleAddUser}
//         />

//         {/* AddWebUserModal component */}
      
//       </div>
         
//     </div>
//   );
// };

// export default UserWebManagement;



/////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import SideNav from './SideNav'; 
import {Container} from 'react-bootstrap';
import CountdownLoader from './CountdownLoader'; 
import WebUserTableCard from './WebUserTableCard'; 
import AddWebUserModal from './AddWebUserModal'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './UserWebManagement.css'; // Add a CSS file for additional styling

const UserWebManagement = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

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
    setUsers([...users, newUserData]);
    setShowAddUserModal(false);
  };

  const handleEdit = (user) => {
    // Edit functionality
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleCloseAddUserModal = () => setShowAddUserModal(false);

  if (loading) {
    return <CountdownLoader />;
  }

  return (





    <div className="d-flex">
    {/* Side Navigation */}
    <div className="sidebar-wrapper">
      <SideNav />
    </div>
    
    {/* Main Content */}
    <div className="main-content flex-grow-1">
      <Container className="mt-6">

      <WebUserTableCard
            users={users}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />

          <AddWebUserModal 
            show={showAddUserModal} 
            onClose={handleCloseAddUserModal} 
            onAddUser={handleAddUser} 
          />


      </Container>
    </div>
  </div>









 
  );
};

export default UserWebManagement;
