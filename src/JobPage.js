import React, { useState } from "react";
import { Card, Dropdown, Form, Button, Row, Col } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import SideNav from "./SideNav"; // Make sure the path is correct
import { db } from "./firebase"; // Adjust the import according to your firebase configuration

const JobPage = () => {
  const [selectedJob, setSelectedJob] = useState({});
  const [jobIconUrl, setJobIconUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState({ show: false, message: "" });
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedQualifications, setSelectedQualifications] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);  
  const fields = [
    "Accounting And Finance",
    "Animal Science",
    "Agriculture",
    "Agriculture And Rural Development",
    "Agricultural Engineering",
    "Agricultural Economics",
    "Applied Economics And Management",
    "Architecture",
    "Astronomy",
    "Atmospheric Science",
    "Automotive",
    "Banking And Insurance",
    "Biological Engineering",
    "Biology/ Biotechnology",
    "Biometry And Statistics",
    "Biomedical Engineering",
    "Building Construction",
    "Business Administration",
    "Chemical Engineering",
    "Chemistry",
    "Civil Engineering",
    "Clinical Pharmacy",
    "Community Development",
    "Computer Engineering",
    "Computer Science",
    "Cooperative Union",
    "Development And Environmental Management",
    "Drafting",
    "Driver",
    "Economics",
    "Educational Planning And Management",
    "Educational And Behavioral Sciences",
    "Electrical And Computer Engineering",
    "Electrician / Electronics",
    "Electromechanical Engineering",
    "English Language And Literature",
    "Environmental Health",
    "Environmental Protection",
    "Environmental Science/ Engineering",
    "French",
    "G.I.S. Expert",
    "Geography",
    "Governance And Development Study",
    "History",
    "Hotel Administration",
    "Hotel Food Beverage Service (Waitress)",
    "Hotel-Cooking/ Food Preparation",
    "Human Resource",
    "Hydraulic /Water resource Engineering",
    "Industrial Chemistry",
    "Industrial Engineering",
    "Information Science",
    "Information Technology",
    "Italian",
    "Journalism And Communication",
    "KG Teacher",
    "Laboratory Technician",
    "Landscape Architecture",
    "Language Amharic",
    "Legal/Law",
    "Library Science",
    "Linguistic And Literature",
    "Machine/ General Mechanic",
    "Management",
    "Marketing",
    "Marketing Information System",
    "Marketing Management",
    "Marketing/Marketing Research",
    "Material Science And Engineering",
    "Mathematics",
    "Mechanical Engineering",
    "Military Science",
    "Mining Engineering",
    "Medical Doctor",
    "Midwifery",
    "Music",
    "Office Management",
    "Natural Resource Management",
    "Nursing",
    "Nutritional Science",
    "Philosophy",
    "Physics",
    "Plant Science",
    "Political Science And International Relations",
    "Psychology",
    "Public Administration",
    "Public Health",
    "Public Relations",
    "Religious Studies",
    "Sanitary Secretarial Science",
    "Secretary/ Office Assist",
    "Security Guard",
    "Social Science",
    "Social Work",
    "Sociology / Anthropology",
    "Software Engineering",
    "Soil Science",
    "Spanish",
    "Special Needs In Education",
    "Supply Management",
    "Transport Management",
    "Urban Planning",
    "Informatics",
    "Sport/ Physical Education",
    "Statistics",
    "Surveying",
    "Urban and regional studies",
  ];
  // const experiences = [
  //   "0 years",
  //   "1-2 years",
  //   "3-4 years",
  //   "5-7 years",
  //   "7-10 years",
  //   "Above 10 years",
  // ];
  const jobLocation = [
    "Addis Ababa",
    "Afar",
    "Amhara",
    "Benishangul Gumuz",
    "Dire Dawa",
    "Gambella",
    "Harari",
    "Oromia",
    "Sidama",
    "SNNP",
    "Somali",
    "Tigray",
    "Other", //Other Must be at Last Because of Add or Edit Screen
  ];

  // const jobLocation = [
  //   "New York",
  //   "Los Angeles",
  //   "Chicago",
  //   "Houston",
  //   "Phoenix",
  //   // Add more locations as needed
  // ];
  const qualifications = [
    "PHD",
    "MSC",
    "MA",
    "BSC",
    "BA",
    "LLB",
    "DIPLOMA",
    "10+1",
    "10+2",
    "10+3",
    "LEVEL4",
  ];

  /////////////////////////Field Check Box////////////////////
  const handleFieldCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // Add the selected field if checked
      setSelectedFields((prev) => [...prev, value]);
    } else {
      // Remove the field if unchecked
      setSelectedFields((prev) => prev.filter((field) => field !== value));
    }
  };

  /////////////////////////Qualification Check Box////////////////////
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // Add selected qualification
      setSelectedQualifications((prev) => [...prev, value]);
    } else {
      // Remove unselected qualification
      setSelectedQualifications((prev) => prev.filter((q) => q !== value));
    }
  };

  /////////////////////////jobLocations Check Box////////////////////

  const handleJobLocationsCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setSelectedJob((prev) => {
      const updatedJobLocation = checked
        ? [...(prev.jobLocation || []), value] // Add the location if checked
        : prev.jobLocation.filter((loc) => loc !== value); // Remove the location if unchecked

      return {
        ...prev,
        jobLocation: updatedJobLocation,
      };
    });
  };

  /////////////////////////experiences Check Box////////////////////

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
      qualification: selectedQualifications.join(", ") || [], // Join the qualifications array
      field: selectedFields.join(", ") || [], // Join the fields array
      experience: selectedJob.experience,
      requiredNumber: selectedJob.requiredNumber,
      additionalRequirements: selectedJob.additionalRequirements,
      company: selectedJob.company,
      salary: selectedJob.salary,
      // jobLocation: selectedJob.jobLocation,
      jobLocation: selectedJob.jobLocation
        ? selectedJob.jobLocation.join(", ")
        : "",
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
      status: selectedJob.status,
      jobIcon: jobIconUrl,
    };


    try {
      await addDoc(collection(db, "jobs"), jobData);
      setSelectedJob({});
      setJobIconUrl("");
      setShowPopup({ show: true, message: "Job added successfully!" });
      setTimeout(() => setShowPopup({ show: false, message: "" }), 3000);
    } catch (error) {
      console.log("Data", jobData);

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
                {/* Job Title, Experience, Required Number*/}
                <Row
                  className="mb-4"
                  style={{
                    backgroundColor: "#7fccde",
                    overflow: "auto",
                    padding: "20px",
                    borderRadius: "6px",
                  }}
                >
                  <Col
                    md={12}
                    className="mb-3"
                    style={{
                      borderBottom: "2px solid #004d66",
                      paddingBottom: "10px",
                    }}
                  >
                    <h2 style={{ textAlign: "center", margin: 0 }}>Job Info</h2>
                  </Col>

                  <Col md={5}>
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

                  <Col md={3}>
                    <Form.Group controlId="formExperience">
                      <Form.Label>Experience</Form.Label>
                      <Form.Control
                        as="select"
                        name="experience"
                        value={selectedJob?.experience || ""}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Experience</option>
                        <option value="0 years">0 years</option>
                        <option value="1-2 years">1-2 years</option>
                        <option value="3-4 years">3-4 years</option>
                        <option value="5-7 years">5-7 years</option>
                        <option value="7-10 years">7-10 years</option>
                        <option value="Above 10 years">Above 10 years</option>
                      </Form.Control>
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

                  <Col md={6}>
                    <Form.Group controlId="formQualification">
                      <Form.Label>Qualification</Form.Label>
                      <Dropdown
                        show={showDropdown}
                        onToggle={(isOpen) => setShowDropdown(isOpen)}
                      >
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                          {selectedQualifications.length > 0
                            ? selectedQualifications.join(", ")
                            : "Select Qualification"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {qualifications.map((qualification, index) => (
                            <Form.Check
                              key={index}
                              type="checkbox"
                              label={qualification}
                              value={qualification}
                              checked={selectedQualifications.includes(
                                qualification
                              )}
                              onChange={handleCheckboxChange}
                              onClick={(e) => e.stopPropagation()}
                            />
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Form.Group>
                  </Col>
                  <Col md={12} lg={12} xl={12}>
                    {" "}
                    {/* Adjusted column sizes */}
                    {/* Added overflow handling */}
                    <Form.Group controlId="formField">
                      <Form.Label>Field</Form.Label>

                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          {selectedFields.length > 0
                            ? selectedFields.join(", ")
                            : "Select Fields"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {fields.map((field, index) => (
                            <Form.Check
                              key={index}
                              type="checkbox"
                              label={field}
                              value={field}
                              checked={selectedFields.includes(field)}
                              onChange={handleFieldCheckboxChange}
                              onClick={(e) => e.stopPropagation()}
                            />
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Form.Group>
                  </Col>
                </Row>
                {/* Field */}
                {/* 
                <Row className="mb-11">
                  <Col md={12}>
                    <Form.Group controlId="formField">
                      <Form.Label>Field</Form.Label>

                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          {selectedFields.length > 0
                            ? selectedFields.join(", ")
                            : "Select Fields"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {fields.map((field, index) => (
                            <Form.Check
                              key={index}
                              type="checkbox"
                              label={field}
                              value={field}
                              checked={selectedFields.includes(field)}
                              onChange={handleFieldCheckboxChange}
                              onClick={(e) => e.stopPropagation()} // Prevent closing the dropdown on checkbox click
                            />
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Form.Group>
                  </Col>
                </Row> */}

                {/* Company, Salary, and Job Location */}
                <Row
                  className="mb-4"
                  style={{
                    backgroundColor: "#7fccde",
                    padding: "20px",
                    borderRadius: "6px",
                  }}
                >
                  <Col
                    md={12}
                    className="mb-3"
                    style={{
                      borderBottom: "2px solid #004d66",
                      paddingBottom: "10px",
                    }}
                  >
                    <h2 style={{ textAlign: "center", margin: 0 }}>
                      Company Info
                    </h2>
                  </Col>
                  <Col md={5}>
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
                  <Col md={3}>
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

                  <Col md={3}>
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
                    <Form.Group controlId="formJobLocation">
                      <Form.Label>Job Location</Form.Label>
                      <Dropdown>
                        <Dropdown.Toggle variant="danger" id="dropdown-basic">
                          {selectedJob?.jobLocation &&
                          selectedJob.jobLocation.length > 0
                            ? selectedJob.jobLocation.join(", ") // Use jobLocation from selectedJob
                            : "Select Job Location"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {jobLocation.map((location, index) => (
                            <Form.Check
                              key={index}
                              type="checkbox"
                              label={location}
                              value={location}
                              checked={
                                selectedJob?.jobLocation?.includes(location) ||
                                false
                              } // Check if this location is selected
                              onChange={handleJobLocationsCheckboxChange} // Ensure this function handles the checkbox state
                              onClick={(e) => e.stopPropagation()} // Prevent closing the dropdown on checkbox click
                            />
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Form.Group>
                  </Col>
                </Row>
                {/* Post Date, Deadline Date, and Department */}
                <Row
                  className="mb-4"
                  style={{
                    backgroundColor: "#7fccde",
                    padding: "20px",
                    borderRadius: "6px",
                  }}
                >
                  <Col
                    md={12}
                    className="mb-3"
                    style={{
                      borderBottom: "2px solid #004d66",
                      paddingBottom: "10px",
                    }}
                  >
                    <h2 style={{ textAlign: "center", margin: 0 }}>
                      Job Date
                    </h2>
                  </Col>
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
                </Row>
                {/* Location, Phone Number, and P.O. Box */}

                <Row
                  className="mb-4"
                  style={{
                    backgroundColor: "#7fccde",
                    padding: "20px",
                    borderRadius: "6px",
                  }}
                >
                  <Col
                    md={12}
                    className="mb-3"
                    style={{
                      borderBottom: "2px solid #004d66",
                      paddingBottom: "10px",
                    }}
                  >
                    <h2 style={{ textAlign: "center", margin: 0 }}>
                      Contact Info
                    </h2>
                  </Col>
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

                  <Col md={4}>
                    <Form.Group controlId="formCity">
                      <Form.Label>City</Form.Label>
                      <Form.Select
                        name="city"
                        value={selectedJob?.city || ""}
                        onChange={handleInputChange}
                      >
                        {/* Default option */}
                        {jobLocation.map((city, index) => (
                          <option key={index} value={city}>
                            {city}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                {/* Email, City, How to Apply */}

                <Row
                  className="mb-4"
                  style={{
                    backgroundColor: "#7fccde",
                    padding: "20px",
                    borderRadius: "6px",
                  }}
                >
                  <Col
                    md={12}
                    className="mb-3"
                    style={{
                      borderBottom: "2px solid #004d66",
                      paddingBottom: "10px",
                    }}
                  >
                    <h2 style={{ textAlign: "center", margin: 0 }}>
                      Reference Info And Job Status
                    </h2>
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
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        name="status" // Ensure this matches selectedJob key
                        value={selectedJob?.status || ""}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Status</option>{" "}
                        {/* Optional: add a default option */}
                        <option value="active">Active</option>
                        <option value="expire">Expire</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  {/* <Col md={4}>
                    <Form.Group controlId="formJobIcon">
                      <Form.Label>Job Icon</Form.Label>
                      <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                  </Col> */}
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
