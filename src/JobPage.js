import React, { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import SideNav from "./SideNav"; // Make sure the path is correct
import { db } from "./firebase"; // Adjust the import according to your firebase configuration

const JobPage = () => {
  const [selectedJob, setSelectedJob] = useState({});
  const [jobIconUrl, setJobIconUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState({ show: false, message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     // Handle file upload here, for example using Firebase Storage
//     // Set the jobIconUrl after uploading the file
//     // setJobIconUrl(uploadedFileUrl);
//   };

  const handleSave = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const jobData = {
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
      // status:selectedJob.status,
      jobIcon: jobIconUrl,
    };

    try {
      await addDoc(collection(db, "jobs"), jobData);
      setSelectedJob({});
      setJobIconUrl("");
      setShowPopup({ show: true, message: "Job added successfully!" });
      setTimeout(() => setShowPopup({ show: false, message: "" }), 3000);
    } catch (error) {
      console.error("Error saving job data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <SideNav />
      <div className="main-content">
        <Card>
          <Card.Header className="bg-primary text-white text-center">
            <h3 className="text-center">
              Add New Job
              {/* {selectedJob ? "Edit Job" : "Add Job"} */}
            </h3>
          </Card.Header>
          <Card.Body>
            <div className="job-page-container">
              <Form onSubmit={handleSave}>
                {/* Job Title, Qualification, and Field */}
                <Row className="mb-4">
                  <Col md={4}>
                    <Form.Group controlId="formJobTitle">
                      <Form.Label>Job Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={selectedJob?.title || ""}
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
                        value={selectedJob?.qualification || ""}
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
                        value={selectedJob?.field || ""}
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
                        value={selectedJob?.experience || ""}
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
                        value={selectedJob?.requiredNumber || ""}
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
                        value={selectedJob?.additionalRequirements || ""}
                        onChange={handleInputChange}
                        placeholder="Enter additional requirements"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Company, Salary, and Job Location */}
                <Row className="mb-4">
                  <Col md={4}>
                    <Form.Group controlId="formCompany">
                      <Form.Label>Company</Form.Label>
                      <Form.Control
                        type="text"
                        name="company"
                        value={selectedJob?.company || ""}
                        onChange={handleInputChange}
                        placeholder="Enter company name"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formJobLocation">
                      <Form.Label>Job Location</Form.Label>
                      <Form.Control
                        type="text"
                        name="jobLocation"
                        value={selectedJob?.jobLocation || ""}
                        onChange={handleInputChange}
                        placeholder="Enter job location"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  {/* Radio buttons for salary type */}
                  <Col md={4}>
                    <Form.Group controlId="formSalary">
                      <Form.Label>Salary</Form.Label>
                      <Form.Control
                        type="text"
                        name="salary"
                        value={selectedJob?.salary || ""}
                        onChange={handleInputChange}
                        placeholder="Enter salary"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    {/* Dropdown for Salary Type */}
                    <Form.Group controlId="formSalaryType" className="mt-2">
                      <Form.Label>Salary Type</Form.Label>
                      <Form.Select
                        name="salaryType"
                        value={selectedJob?.salaryType || ""}
                        onChange={handleInputChange}
                      >
                        <option value="Negotiable">Negotiable</option>
                        <option value="hourly">Attractive</option>
                        <option value="monthly">Per company Scale</option>
                        <option value="yearly">Fixed</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Benefit, Employment Type, and Contract Duration */}
                <Row className="mb-4">
                  <Col md={4}>
                    <Form.Group controlId="formBenefit">
                      <Form.Label>Benefit</Form.Label>
                      <Form.Control
                        type="text"
                        name="benefit"
                        value={selectedJob?.benefit || ""}
                        onChange={handleInputChange}
                        placeholder="Enter benefit"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formEmploymentType">
                      <Form.Label>Employment Type</Form.Label>
                      <Form.Select
                        name="employmentType"
                        value={selectedJob?.employmentType || ""}
                        onChange={handleInputChange}
                      >
                        <option value="part-time">Permanent</option>
                        <option value="contract">Contract</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formContractDuration">
                      <Form.Label>Contract Duration</Form.Label>
                      <Form.Control
                        type="text"
                        name="contractDuration"
                        value={selectedJob?.contractDuration || ""}
                        onChange={handleInputChange}
                        placeholder="Enter contract duration"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Post Date, Deadline Date, and Department */}
                <Row className="mb-4">
                  <Col md={4}>
                    <Form.Group controlId="formPostDate">
                      <Form.Label>Post Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="postDate"
                        value={selectedJob?.postDate || ""}
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
                        value={selectedJob?.deadlineDate || ""}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formDepartment">
                      <Form.Label>Department</Form.Label>
                      <Form.Control
                        type="text"
                        name="department"
                        value={selectedJob?.department || ""}
                        onChange={handleInputChange}
                        placeholder="Enter department"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Location, Phone Number, and P.O. Box */}
                <Row className="mb-4">
                  <Col md={4}>
                    <Form.Group controlId="formLocation">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        name="location"
                        value={selectedJob?.location || ""}
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
                        value={selectedJob?.phoneNumber || ""}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formPoBox">
                      <Form.Label>P.O. Box</Form.Label>
                      <Form.Control
                        type="text"
                        name="poBox"
                        value={selectedJob?.poBox || ""}
                        onChange={handleInputChange}
                        placeholder="Enter P.O. Box"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Email, City, How to Apply */}
                <Row className="mb-4">
                  <Col md={4}>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={selectedJob?.email || ""}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={selectedJob?.city || ""}
                        onChange={handleInputChange}
                        placeholder="Enter city"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formHowToApply">
                      <Form.Label>How to Apply</Form.Label>
                      <Form.Select
                        name="howToApply"
                        value={selectedJob?.howToApply || ""}
                        onChange={handleInputChange}
                      >
                        <option value="in-person">In-Person</option>
                        <option value="email"> Through Email</option>
                        <option value="online-portal">Through Mail</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Include Reference and Source */}
                <Row className="mb-4">
                  <Col md={4}>
                    <Form.Group controlId="formIncludeReference">
                      <Form.Check
                        type="checkbox"
                        label="Include Reference"
                        name="includeReference"
                        checked={selectedJob?.includeReference || false}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formSource">
                      <Form.Label>Source</Form.Label>
                      <Form.Select
                        name="source"
                        value={selectedJob?.source || ""}
                        onChange={handleInputChange}
                      >
                        <option value="job-board">Reporter</option>
                        <option value="referral">Addis Zemen</option>
                        <option value="company-website">Yegara jobs</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  {/* <Col md={4}>
                    <Form.Group controlId="formJobIcon">
                      <Form.Label>Job Icon</Form.Label>
                      <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                  </Col> */}
                   <Col md={4}>
                    <Form.Group controlId="formSource">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        name="Status"
                        value={selectedJob?.Status || ""}
                        onChange={handleInputChange}
                      >
                        <option value="active">Active</option>
                        <option value="expire">Expire</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? "Saving..." : "Save Job"}
                </Button>
              </Form>
              {showPopup.show && (
                <div className="popup-message">{showPopup.message}</div>
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default JobPage;
