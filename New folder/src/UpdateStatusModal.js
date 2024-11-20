import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

const UpdateStatusModal = ({ show, handleClose, payment, updatePaymentStatus }) => {
  const [status, setStatus] = useState(payment.paymentStatus);

  const handleSubmit = () => {
    updatePaymentStatus(payment.id, status);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Payment Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicStatus">
            <Form.Label>Payment Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Pending</option>
              <option>Completed</option>
              <option>Failed</option>
              {/* Add more options if needed */}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateStatusModal;
