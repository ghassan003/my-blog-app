import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import EditWebUserModal from './EditWebUserModal'; // Import Edit Modal
import { db } from './firebase'; // Firebase config
import { collection, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore'; // Import updateDoc
import { ToastContainer, toast } from 'react-toastify'; // Import Toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const WebUserTableCard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // For editing
  const [showEditModal, setShowEditModal] = useState(false); // For edit modal
  const [showDeleteModal, setShowDeleteModal] = useState(false); // For delete confirmation modal
  const [userToDelete, setUserToDelete] = useState(null); // Store user for deletion

  // Fetch users from Firestore
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

  // Show delete confirmation modal
  const handleDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true); // Show delete confirmation
  };

  // Confirm delete user
  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        const userDocRef = doc(db, 'webUsers', userToDelete.id);
        await deleteDoc(userDocRef);
        toast.success('User deleted successfully!'); // Show success toast
      } catch (error) {
        console.error('Error deleting user: ', error);
        toast.error('Failed to delete user'); // Show error toast
      }
    }
    setShowDeleteModal(false); // Close modal after deletion
  };

  // Handle edit user
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true); // Show the edit modal
  };

  // Confirm edit user
  const confirmEdit = async (updatedUser) => {
    if (selectedUser) {
      try {
        const userDocRef = doc(db, 'webUsers', selectedUser.id);
        await updateDoc(userDocRef, updatedUser); // Update user data
        toast.success('User updated successfully!'); // Show success toast
      } catch (error) {
        console.error('Error updating user: ', error);
        toast.error('Failed to update user'); // Show error toast
      }
    }
    setShowEditModal(false); // Close modal after editing
  };

  return (
    <div className="container mt-6">
      <Card className="mb-4">
        <Card.Header as="h5" className="bg-primary text-white font-weight-bold">
          <h2 className="text-center mb-4">User Web Management</h2>
        </Card.Header>
        <Card.Body>
          {/* Add New User button with modal */}
          {/* <div className="d-flex justify-content-between mb-4">
            <AddWebUserModal />
          </div> */}

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>{user.status}</td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEdit(user)}
                        className="me-2"
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit Modal */}
          {showEditModal && selectedUser && (
            <EditWebUserModal
              show={showEditModal}
              user={selectedUser}
              onSave={confirmEdit} // Pass confirmEdit as the save handler
              onClose={() => setShowEditModal(false)}
            />
          )}

          {/* Delete Confirmation Modal */}
          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
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

          {/* ToastContainer for notifications */}
          <ToastContainer />
        </Card.Body>
      </Card>
    </div>
  );
};

export default WebUserTableCard;
