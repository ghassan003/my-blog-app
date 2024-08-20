import React, { useState } from 'react';
import { Button, Form, Modal, Row, Col, Collapse, Card } from 'react-bootstrap';
import { db, storage } from './firebase'; // Adjust the path as needed
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddNewBank = () => {
  const [bankName, setBankName] = useState('');
  const [accountTitle, setAccountTitle] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankIcon, setBankIcon] = useState(null);
  const [status, setStatus] = useState('Active');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true); // State to toggle visibility

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBankIcon(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let bankIconUrl = '';
    if (bankIcon) {
      // Upload the bank icon to Firebase Storage
      const storageRef = ref(storage, `bank_icons/${bankIcon.name}`);
      try {
        await uploadBytes(storageRef, bankIcon);
        bankIconUrl = await getDownloadURL(storageRef);
      } catch (error) {
        setModalMessage('Error uploading file. Please try again.');
        setShowModal(true);
        setIsSubmitting(false);
        return;
      }
    }

    // Add bank data to Firestore
    try {
      await addDoc(collection(db, 'banks'), {
        bankName,
        accountTitle,
        accountNumber,
        bankIcon: bankIconUrl,
        status,
      });
      setModalMessage('Bank added successfully!');
      setShowModal(true);
      setBankName('');
      setAccountTitle('');
      setAccountNumber('');
      setBankIcon(null);
      setStatus('Active');
    } catch (error) {
      setModalMessage('Error adding bank. Please try again.');
      setShowModal(true);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="add-new-bank-container">
      <Button 
        variant="secondary" 
        onClick={() => setIsFormVisible(!isFormVisible)} 
        className="mb-3"
      >
        {isFormVisible ? 'Hide Form' : 'Show Form'}
      </Button>

      <Collapse in={isFormVisible}>
        <Card>
          <Card.Header className="bg-primary text-white">Add New Bank</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={3}>
                  <Form.Group controlId="bankName">
                    <Form.Label>Bank Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter bank name" 
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)} 
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="accountTitle">
                    <Form.Label>Account Title</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter account title" 
                      value={accountTitle}
                      onChange={(e) => setAccountTitle(e.target.value)} 
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="accountNumber">
                    <Form.Label>Account Number</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter account number" 
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)} 
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="bankIcon">
                    <Form.Label>Bank Icon</Form.Label>
                    <Form.Control 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={3}>
                  <Form.Group controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Control 
                      as="select" 
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Disabled">Disabled</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Button 
                variant="primary" 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add Bank'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Collapse>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMessage.includes('Error') ? 'Error' : 'Success'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddNewBank;
