import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const JobDetailsModal = ({ job, show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{job?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Company: {job?.company}</p>
        <p>Location: {job?.location}</p>
        <p>Status: {job?.status}</p>
        {/* Add more job details here */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default JobDetailsModal;
