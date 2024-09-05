import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const WebUserTableCard = ({ onAddUser }) => {
  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    status: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddUser) {
      onAddUser(newUser);
      setNewUser({
        name: '',
        email: '',
        phone: '',
        role: '',
        status: ''
      });
      handleClose();
    } else {
      console.error('onAddUser is not defined');
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add New User
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={newUser.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={newUser.role}
                onChange={handleChange}
                placeholder="Enter role"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="status"
                value={newUser.status}
                onChange={handleChange}
                placeholder="Enter status"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add User
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WebUserTableCard;
