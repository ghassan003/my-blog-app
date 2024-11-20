import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { db } from './firebase';
import { doc, updateDoc } from 'firebase/firestore'; // Firestore update method
import { toast } from 'react-toastify'; // Import toast for notifications

const EditWebUserModal = ({ show, user, onClose }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [role, setRole] = useState(user.role);
  const [status, setStatus] = useState(user.status);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update user in Firestore
    const userDocRef = doc(db, 'webUsers', user.id);
    try {
      await updateDoc(userDocRef, {
        name,
        email,
        phone,
        role,
        status,
      });
      toast.success('User updated successfully!'); // Show success toast
      onClose(); // Close the modal after updating
    } catch (error) {
      console.error('Error updating user: ', error);
      toast.error('Failed to update user'); // Show error toast
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone"
              required
            />
          </Form.Group>

          <Form.Group controlId="formRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Admin</option>
              <option>User</option>
              <option>Blog Writer</option>
              <option>Payment Checker</option>
              

            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Active</option>
              <option>Inactive</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditWebUserModal;
