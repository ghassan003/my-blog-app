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
      qualification: selectedJob.qualification,
      field: selectedJob.field,
      experience: selectedJob.experience,
      requiredNumber: selectedJob.requiredNumber,
      additionalRequirements: selectedJob.additionalRequirements,
      company: selectedJob.company,
      salary: selectedJob.salary,
      jobLocation: selectedJob.jobLocation,
      benefit: selectedJob.benefit,
      employmentType: selectedJob.employmentType,
      contractDuration: selectedJob.contractDuration,
      postDate: selectedJob.postDate,
      deadlineDate: selectedJob.deadlineDate,
      department: selectedJob.department,
      location: selectedJob.location,
      phoneNumber: selectedJob.phoneNumber,
      poBox: selectedJob.poBox,
      email: selectedJob.email,
      city: selectedJob.city,
      howToApply: selectedJob.howToApply,
      includeReference: selectedJob.includeReference,
      source: selectedJob.source,
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
    <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Add/Edit Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSave}>
          {/* Job Title, Qualification, and Field */}
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
              <Form.Group controlId="formQualification">
                <Form.Label>Qualification</Form.Label>
                <Form.Control
                  type="text"
                  name="qualification"
                  value={selectedJob?.qualification || ''}
                  onChange={handleInputChange}
                  placeholder="Enter qualification"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formField">
                <Form.Label>Field</Form.Label>
                <Form.Control
                  type="text"
                  name="field"
                  value={selectedJob?.field || ''}
                  onChange={handleInputChange}
                  placeholder="Enter field"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Experience, Required Number, and Additional Requirements */}
          <Row className="mb-4">
            <Col md={4}>
              <Form.Group controlId="formExperience">
                <Form.Label>Experience</Form.Label>
                <Form.Control
                  type="text"
                  name="experience"
                  value={selectedJob?.experience || ''}
                  onChange={handleInputChange}
                  placeholder="Enter experience"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formRequiredNumber">
                <Form.Label>Required Number</Form.Label>
                <Form.Control
                  type="number"
                  name="requiredNumber"
                  value={selectedJob?.requiredNumber || ''}
                  onChange={handleInputChange}
                  placeholder="Enter required number"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formAdditionalRequirements">
                <Form.Label>Additional Requirements</Form.Label>
                <Form.Control
                  type="text"
                  name="additionalRequirements"
                  value={selectedJob?.additionalRequirements || ''}
                  onChange={handleInputChange}
                  placeholder="Enter additional requirements"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Company, Salary, Job Location */}
          <Row className="mb-4">
            <Col md={4}>
              <Form.Group controlId="formCompany">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  name="company"
                  value={selectedJob?.company || ''}
                  onChange={handleInputChange}
                  placeholder="Enter company name"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formSalary">
                <Form.Label>Salary</Form.Label>
                <Form.Control
                  type="text"
                  name="salary"
                  value={selectedJob?.salary || ''}
                  onChange={handleInputChange}
                  placeholder="Enter salary"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formJobLocation">
                <Form.Label>Job Location</Form.Label>
                <Form.Control
                  type="text"
                  name="jobLocation"
                  value={selectedJob?.jobLocation || ''}
                  onChange={handleInputChange}
                  placeholder="Enter job location"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Benefits, Employment Type, Contract Duration */}
          <Row className="mb-4">
            <Col md={4}>
              <Form.Group controlId="formBenefit">
                <Form.Label>Benefits</Form.Label>
                <Form.Control
                  type="text"
                  name="benefit"
                  value={selectedJob?.benefit || ''}
                  onChange={handleInputChange}
                  placeholder="Enter benefits"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formEmploymentType">
                <Form.Label>Employment Type</Form.Label>
                <Form.Control
                  type="text"
                  name="employmentType"
                  value={selectedJob?.employmentType || ''}
                  onChange={handleInputChange}
                  placeholder="Enter employment type"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formContractDuration">
                <Form.Label>Contract Duration</Form.Label>
                <Form.Control
                  type="text"
                  name="contractDuration"
                  value={selectedJob?.contractDuration || ''}
                  onChange={handleInputChange}
                  placeholder="Enter contract duration"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Post Date, Deadline Date */}
          <Row className="mb-4">
            <Col md={4}>
              <Form.Group controlId="formPostDate">
                <Form.Label>Post Date</Form.Label>
                <Form.Control
                  type="date"
                  name="postDate"
                  value={selectedJob?.postDate || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formDeadlineDate">
                <Form.Label>Deadline Date</Form.Label>
                <Form.Control
                  type="date"
                  name="deadlineDate"
                  value={selectedJob?.deadlineDate || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Company Info: Department, Location, Phone Number */}
          <Row className="mb-4">
            <Col md={4}>
              <Form.Group controlId="formDepartment">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  name="department"
                  value={selectedJob?.department || ''}
                  onChange={handleInputChange}
                  placeholder="Enter department"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={selectedJob?.location || ''}
                  onChange={handleInputChange}
                  placeholder="Enter location"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={selectedJob?.phoneNumber || ''}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Email, PO Box, City */}
          <Row className="mb-4">
            <Col md={4}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={selectedJob?.email || ''}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formPoBox">
                <Form.Label>PO Box</Form.Label>
                <Form.Control
                  type="text"
                  name="poBox"
                  value={selectedJob?.poBox || ''}
                  onChange={handleInputChange}
                  placeholder="Enter PO Box"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={selectedJob?.city || ''}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* How to Apply, Include Reference, Source */}
          <Row className="mb-4">
            <Col md={4}>
              <Form.Group controlId="formHowToApply">
                <Form.Label>How to Apply</Form.Label>
                <Form.Control
                  type="text"
                  name="howToApply"
                  value={selectedJob?.howToApply || ''}
                  onChange={handleInputChange}
                  placeholder="Enter how to apply"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formIncludeReference">
                <Form.Label>Include Reference</Form.Label>
                <Form.Control
                  type="text"
                  name="includeReference"
                  value={selectedJob?.includeReference || ''}
                  onChange={handleInputChange}
                  placeholder="Enter reference details"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formSource">
                <Form.Label>Source</Form.Label>
                <Form.Control
                  type="text"
                  name="source"
                  value={selectedJob?.source || ''}
                  onChange={handleInputChange}
                  placeholder="Enter source"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Job Status */}
          <Row className="mb-4">
            <Col md={4}>
              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  name="status"
                  value={selectedJob?.status || ''}
                  onChange={handleInputChange}
                  placeholder="Enter job status"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Job Icon Upload */}
          <Form.Group controlId="formJobIcon">
            <Form.Label>Upload Job Icon (.png only)</Form.Label>
            <Form.Control type="file" accept=".png" onChange={handleIconUpload} />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit" className="ms-2" disabled={loading}>
              {loading ? 'Saving...' : 'Save Job'}
            </Button>
          </div>

          {showPopup.show && (
            <Alert variant="warning" onClose={handleClosePopup} dismissible className="mt-3">
              {showPopup.message}
            </Alert>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default JobForm;
