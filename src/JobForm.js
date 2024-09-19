import React, { useState } from 'react';
import { Modal, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

import './jobmanager.css'; // Import the CSS file


const JobForm = ({ selectedJob, setSelectedJob, setJobs, showModal, setShowModal }) => {
  const [jobIconUrl, setJobIconUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState({ show: false, message: '' });

  const handleSave = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!jobIconUrl) {
      setShowPopup({ show: true, message: 'Job Icon URL is not set.' });
      return;
    }

    setLoading(true);
    const data = {
      title: selectedJob.title,
      companyName: selectedJob.companyName,
      location: selectedJob.location,
      jobIcon: jobIconUrl,
      status: selectedJob.status,
    };

    try {
      await addDoc(collection(db, 'jobs'), data);
      const querySnapshot = await getDocs(collection(db, 'jobs'));
      setJobs(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setShowModal(false);
      setSelectedJob(null);
      setJobIconUrl('');
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleIconUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/png') {
      try {
        const storageRef = ref(storage, `jobIcons/${file.name}`);
        const uploadResult = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(uploadResult.ref);
        setJobIconUrl(url);
        setShowPopup({ show: false, message: '' });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      setShowPopup({ show: true, message: 'Please upload a .png file.' });
      e.target.value = null;
    }
  };

  const handleClosePopup = () => setShowPopup({ show: false, message: '' });

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      dialogClassName="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add/Edit Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSave}>
          {/* Job Title and Company Name Section */}
          <Row className="mb-4">
            <Col md={4}>
              <Form.Group controlId="formJobTitle">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={selectedJob?.title || ''}
                  onChange={handleInputChange}
                  placeholder="Enter job title"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formCompanyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  value={selectedJob?.companyName || ''}
                  onChange={handleInputChange}
                  placeholder="Enter company name"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formLocation">
                <Form.Label>Job Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={selectedJob?.location || ''}
                  onChange={handleInputChange}
                  placeholder="Enter job location"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Job Icon and Status Section */}
          <Row className="mb-4">
            <Col md={4}>
              <Form.Group controlId="formJobIcon">
                <Form.Label>Job Icon</Form.Label>
                <Form.Control type="file" onChange={handleIconUpload} />
                {jobIconUrl && (
                  <img
                    src={jobIconUrl}
                    alt="Job Icon Preview"
                    style={{ width: '200px', height: '200px', marginTop: '10px' }}
                  />
                )}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={selectedJob?.status || ''}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Disabled">Disabled</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {showPopup.show && (
            <Alert variant="danger" onClose={handleClosePopup} dismissible>
              {showPopup.message}
            </Alert>
          )}

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default JobForm;
