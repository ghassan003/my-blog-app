// import React, { useState, useEffect } from 'react';
// import { Card, Button, Modal } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import EditWebUserModal from './EditWebUserModal'; // Import Edit Modal
// import { db } from './firebase'; // Firebase config
// import { collection, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore'; // Import updateDoc
// import { ToastContainer, toast } from 'react-toastify'; // Import Toast
// import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

// const WebUserTableCard = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null); // For editing
//   const [showEditModal, setShowEditModal] = useState(false); // For edit modal
//   const [showDeleteModal, setShowDeleteModal] = useState(false); // For delete confirmation modal
//   const [userToDelete, setUserToDelete] = useState(null); // Store user for deletion

//   // Fetch users from Firestore
//   useEffect(() => {
//     const usersCollectionRef = collection(db, 'webUsers');
//     const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
//       const fetchedUsers = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setUsers(fetchedUsers);
//     });
//     return () => unsubscribe();
//   }, []);

//   // Show delete confirmation modal
//   const handleDelete = (user) => {
//     setUserToDelete(user);
//     setShowDeleteModal(true); // Show delete confirmation
//   };

//   // Confirm delete user
//   const confirmDelete = async () => {
//     if (userToDelete) {
//       try {
//         const userDocRef = doc(db, 'webUsers', userToDelete.id);
//         await deleteDoc(userDocRef);
//         toast.success('User deleted successfully!'); // Show success toast
//       } catch (error) {
//         console.error('Error deleting user: ', error);
//         toast.error('Failed to delete user'); // Show error toast
//       }
//     }
//     setShowDeleteModal(false); // Close modal after deletion
//   };

//   // Handle edit user
//   const handleEdit = (user) => {
//     setSelectedUser(user);
//     setShowEditModal(true); // Show the edit modal
//   };

//   // Confirm edit user
//   const confirmEdit = async (updatedUser) => {
//     if (selectedUser) {
//       try {
//         const userDocRef = doc(db, 'webUsers', selectedUser.id);
//         await updateDoc(userDocRef, updatedUser); // Update user data
//         toast.success('User updated successfully!'); // Show success toast
//       } catch (error) {
//         console.error('Error updating user: ', error);
//         toast.error('Failed to update user'); // Show error toast
//       }
//     }
//     setShowEditModal(false); // Close modal after editing
//   };

//   return (
//     <div className="container mt-6">
//       <Card className="mb-4">
//         <Card.Header as="h5" className="bg-primary text-white font-weight-bold">
//           <h2 className="text-center mb-4">User Web Management</h2>
//         </Card.Header>
//         <Card.Body>
//           {/* Add New User button with modal */}
//           {/* <div className="d-flex justify-content-between mb-4">
//             <AddWebUserModal />
//           </div> */}

//           {/* Table */}
//           <div className="table-responsive">
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Phone</th>
//                   <th>Role</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user) => (
//                   <tr key={user.id}>
//                     <td>{user.name}</td>
//                     <td>{user.email}</td>
//                     <td>{user.phone}</td>
//                     <td>{user.role}</td>
//                     <td>{user.status}</td>
//                     <td>
//                       <Button
//                         variant="primary"
//                         size="sm"
//                         onClick={() => handleEdit(user)}
//                         className="me-2"
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => handleDelete(user)}
//                       >
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Edit Modal */}
//           {showEditModal && selectedUser && (
//             <EditWebUserModal
//               show={showEditModal}
//               user={selectedUser}
//               onSave={confirmEdit} // Pass confirmEdit as the save handler
//               onClose={() => setShowEditModal(false)}
//             />
//           )}

//           {/* Delete Confirmation Modal */}
//           <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
//             <Modal.Header closeButton>
//               <Modal.Title>Confirm Delete</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               Are you sure you want to delete this user?
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
//                 Cancel
//               </Button>
//               <Button variant="danger" onClick={confirmDelete}>
//                 Delete
//               </Button>
//             </Modal.Footer>
//           </Modal>

//           {/* ToastContainer for notifications */}
//           <ToastContainer />
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default WebUserTableCard;



// import React, { useState, useEffect } from 'react';
// import { Card, Button, Modal } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import EditWebUserModal from './EditWebUserModal';
// import { db } from './firebase';
// import { collection, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './WebUserTableCard.css';

// const WebUserTableCard = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);
//   const [viewMode, setViewMode] = useState('table');

//   useEffect(() => {
//     const usersCollectionRef = collection(db, 'webUsers');
//     const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
//       const fetchedUsers = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setUsers(fetchedUsers);
//     });
    
//     // Set initial view mode based on screen size
//     const handleResize = () => {
//       setViewMode(window.innerWidth < 768 ? 'cards' : 'table');
//     };
    
//     handleResize();
//     window.addEventListener('resize', handleResize);
    
//     return () => {
//       unsubscribe();
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const handleDelete = (user) => {
//     setUserToDelete(user);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     if (userToDelete) {
//       try {
//         const userDocRef = doc(db, 'webUsers', userToDelete.id);
//         await deleteDoc(userDocRef);
//         toast.success('User deleted successfully!');
//       } catch (error) {
//         console.error('Error deleting user: ', error);
//         toast.error('Failed to delete user');
//       }
//     }
//     setShowDeleteModal(false);
//   };

//   const handleEdit = (user) => {
//     setSelectedUser(user);
//     setShowEditModal(true);
//   };

//   const confirmEdit = async (updatedUser) => {
//     if (selectedUser) {
//       try {
//         const userDocRef = doc(db, 'webUsers', selectedUser.id);
//         await updateDoc(userDocRef, updatedUser);
//         toast.success('User updated successfully!');
//       } catch (error) {
//         console.error('Error updating user: ', error);
//         toast.error('Failed to update user');
//       }
//     }
//     setShowEditModal(false);
//   };

//   const renderTableView = () => (
//     <div className="table-responsive">
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th className="d-none d-md-table-cell">Phone</th>
//             <th className="d-none d-lg-table-cell">Role</th>
//             <th className="d-none d-lg-table-cell">Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td className="d-none d-md-table-cell">{user.phone}</td>
//               <td className="d-none d-lg-table-cell">{user.role}</td>
//               <td className="d-none d-lg-table-cell">{user.status}</td>
//               <td>
//                 <div className="d-flex gap-2">
//                   <Button
//                     variant="primary"
//                     size="sm"
//                     onClick={() => handleEdit(user)}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="danger"
//                     size="sm"
//                     onClick={() => handleDelete(user)}
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   const renderCardView = () => (
//     <div className="user-cards-container">
//       {users.map((user) => (
//         <Card key={user.id} className="user-card mb-3">
//           <Card.Body>
//             <div className="d-flex justify-content-between align-items-start mb-2">
//               <div>
//                 <h5 className="mb-1">{user.name}</h5>
//                 <p className="mb-1">{user.email}</p>
//               </div>
//               <span className={`status-badge status-${user.status.toLowerCase()}`}>
//                 {user.status}
//               </span>
//             </div>
//             <div className="user-details">
//               <p className="mb-1"><strong>Phone:</strong> {user.phone}</p>
//               <p className="mb-2"><strong>Role:</strong> {user.role}</p>
//             </div>
//             <div className="d-flex gap-2 justify-content-end">
//               <Button
//                 variant="primary"
//                 size="sm"
//                 onClick={() => handleEdit(user)}
//               >
//                 Edit
//               </Button>
//               <Button
//                 variant="danger"
//                 size="sm"
//                 onClick={() => handleDelete(user)}
//               >
//                 Delete
//               </Button>
//             </div>
//           </Card.Body>
//         </Card>
//       ))}
//     </div>
//   );

//   return (
//     <div className="container-fluid px-3 px-md-4">
//       <Card className="mb-4 border-0 shadow-sm">
//         <Card.Header className="bg-primary text-white py-3">
//           <div className="d-flex justify-content-between align-items-center">
//             {/* <h2 className="h4 mb-0">User Web Management</h2> */}
//             <h2 className="h4 mb-0" style={{ textAlign: 'center' }}>Web User Management</h2>


//             <div className="d-flex gap-2">
//               <Button
//                 variant="outline-light"
//                 size="sm"
//                 className="d-md-none"
//                 onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
//               >
//                 {viewMode === 'table' ? 'Card View' : 'Table View'}
//               </Button>
//             </div>
//           </div>
//         </Card.Header>
//         <Card.Body className="p-0 p-md-3">
//           {viewMode === 'table' ? renderTableView() : renderCardView()}
//         </Card.Body>
//       </Card>

//       {/* Edit Modal */}
//       {showEditModal && selectedUser && (
//         <EditWebUserModal
//           show={showEditModal}
//           user={selectedUser}
//           onSave={confirmEdit}
//           onClose={() => setShowEditModal(false)}
//         />
//       )}

//       {/* Delete Confirmation Modal */}
//       <Modal 
//         show={showDeleteModal} 
//         onHide={() => setShowDeleteModal(false)}
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Delete</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to delete this user?
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={confirmDelete}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </div>
//   );
// };

// export default WebUserTableCard;



import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditWebUserModal from './EditWebUserModal';
import { db } from './firebase';
import { collection, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './WebUserTableCard.css';

const WebUserTableCard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [viewMode, setViewMode] = useState('table');

  useEffect(() => {
    const usersCollectionRef = collection(db, 'webUsers');
    const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
      const fetchedUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(fetchedUsers);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        const userDocRef = doc(db, 'webUsers', userToDelete.id);
        await deleteDoc(userDocRef);
        toast.success('User deleted successfully!');
      } catch (error) {
        console.error('Error deleting user: ', error);
        toast.error('Failed to delete user');
      }
    }
    setShowDeleteModal(false);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const confirmEdit = async (updatedUser) => {
    if (selectedUser) {
      try {
        const userDocRef = doc(db, 'webUsers', selectedUser.id);
        await updateDoc(userDocRef, updatedUser);
        toast.success('User updated successfully!');
      } catch (error) {
        console.error('Error updating user: ', error);
        toast.error('Failed to update user');
      }
    }
    setShowEditModal(false);
  };

  const renderTableView = () => (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th className="d-none d-md-table-cell">Phone</th>
            <th className="d-none d-lg-table-cell">Role</th>
            <th className="d-none d-lg-table-cell">Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="d-none d-md-table-cell">{user.phone}</td>
              <td className="d-none d-lg-table-cell">{user.role}</td>
              <td className="d-none d-lg-table-cell">{user.status}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(user)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderCardView = () => (
    <div className="user-cards-container">
      {users.map((user) => (
        <Card key={user.id} className="user-card mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h5 className="mb-1">{user.name}</h5>
                <p className="mb-1">{user.email}</p>
              </div>
              <span className={`status-badge status-${user.status.toLowerCase()}`}>
                {user.status}
              </span>
            </div>
            <div className="user-details">
              <p className="mb-1"><strong>Phone:</strong> {user.phone}</p>
              <p className="mb-2"><strong>Role:</strong> {user.role}</p>
            </div>
            <div className="d-flex gap-2 justify-content-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleEdit(user)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(user)}
              >
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="container-fluid px-3 px-md-4">
      <Card className="mb-4 border-0 shadow-sm">
        <Card.Header className="bg-primary text-white py-3">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <h2 className="h4 mb-0">User Web Management</h2>
            {/* View toggle button - now visible on all screen sizes */}
            <Button
              variant="light"
              size="sm"
              className="view-toggle-btn"
              onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
            >
              <span className="d-flex align-items-center">
                <i className={`bi bi-${viewMode === 'table' ? 'grid' : 'table'} me-2`}></i>
                Switch to {viewMode === 'table' ? 'Card View' : 'Table View'}
              </span>
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="p-0 p-md-3">
          {viewMode === 'table' ? renderTableView() : renderCardView()}
        </Card.Body>
      </Card>

      {/* Edit Modal */}
      {showEditModal && selectedUser && (
        <EditWebUserModal
          show={showEditModal}
          user={selectedUser}
          onSave={confirmEdit}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal 
        show={showDeleteModal} 
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default WebUserTableCard;