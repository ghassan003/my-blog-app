import React from 'react';
import { Card, Button } from 'react-bootstrap'; // Import necessary components
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import AddWebUserModal from './AddWebUserModal'; // Import the AddWebUserModal component

const WebUserTableCard = ({ users, handleEdit, handleDelete, handleAddUser }) => {
  return (
    <div className="container mt-6">
      <Card className="mb-4">
        <Card.Header as="h5" className="bg-primary text-white font-weight-bold">
          <h2 className="text-center mb-4">User Web Management</h2>
        </Card.Header>
        <Card.Body>
          {/* Add New User button with modal */}
          <div className="d-flex justify-content-between mb-4">
            <AddWebUserModal onAddUser={handleAddUser} />
          </div>

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
                    <td>{user.role}</td> {/* Display user role */}
                    <td>{user.status}</td> {/* Display user status */}
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
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default WebUserTableCard;
