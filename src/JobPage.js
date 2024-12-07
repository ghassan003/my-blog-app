import React, { useState } from "react";
import {
  Card,
  Container,
  Dropdown,
  Modal,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import SideNav from "./SideNav"; // Make sure the path is correct
import { db } from "./firebase"; // Adjust the import according to your firebase configuration
import "./blogPage.css"; // Ensure you have a CSS file for styling

const JobPage = () => {
  const [selectedJob, setSelectedJob] = useState({});
  const [jobIconUrl, setJobIconUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState({ show: false, message: "" });
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedQualifications, setSelectedQualifications] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);

  const handleClosePopup = () => setShowPopup(false);

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

  const handleInputChangeForEmploymentType = (e) => {
    console.log("Value of Employment: ", e.target.value);
    let contractDurationID = document.getElementById("formContractDuration");
    if (e.target.value === "Permanent") {
      contractDurationID.removeAttribute("required");
    } else {
      let contractDurationID = document.getElementById("formContractDuration");
      contractDurationID.setAttribute("required", "");
    }

    console.log("asad", contractDurationID);

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
    console.log("");

    e.preventDefault();
    console.log("Data", e);

    if (loading) return;
    setLoading(true);

    const jobData = {
      title: selectedJob.title || "",
      qualification: selectedQualifications.join(", ") || [], // Join the qualifications array
      field: selectedFields.join(", ") || [], // Join the fields array
      experience: selectedJob.experience || "",
      requiredNumber: selectedJob.requiredNumber || "",
      additionalRequirements: selectedJob.additionalRequirements || "",
      company: selectedJob.company || "",
      salary:selectedJob.salary || "", 
      salarytype :selectedJob.salaryType || "", 
      // jobLocation: selectedJob.jobLocation,
      jobLocation: selectedJob.jobLocation
        ? selectedJob.jobLocation.join(", ")
        : "",
      benefit: selectedJob.benefit || "",
      employmentType: selectedJob.employmentType || "",
      contractDuration: selectedJob.contractDuration || "",
      postDate: selectedJob.postDate || "",
      deadlineDate: selectedJob.deadlineDate || "",
      department: selectedJob.department || "",
      // location: selectedJob.location || "",
      location: "",
      phoneNumber: selectedJob.phoneNumber || "",
      poBox: selectedJob.poBox || "",
      email: selectedJob.email || "",
      city: selectedJob.city || "",
      howToApply: selectedJob.howToApply,
      includeReference: selectedJob.includeReference || "",
      source: selectedJob.source || "",
      status: selectedJob.status || "",
      jobIcon: jobIconUrl || "",
    };

    try {
      await addDoc(collection(db, "jobs"), jobData);

      setSelectedJob({});
      setJobIconUrl("");
      console.log("Job added logic triggered!"); // Log to check if this runs
      setShowPopup({ show: true, message: "Job added Successfully!" });
      setTimeout(() => {
        setLoading(false);
        setShowPopup(true); // Show the modal after job is saved
      }, 15000);
    } catch (error) {
      console.log("Data", jobData);
      console.error("Error saving job data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      {/* Side Navigation */}
      <div className="sidebar-wrapper">
        <SideNav />
      </div>

      {/* Main Content */}
      <div className="main-content flex-grow-1">
        <Container className="mt-6">
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
                      backgroundColor: "#abdfeb",
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
                      <h2 style={{ textAlign: "center", margin: 0 }}>
                        Job Info
                      </h2>
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
                          required // Add this attribute
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
                          required
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
                    {/* 
                  <Col md={4}>
                    <Form.Group controlId="formRequiredNumber">
                      <Form.Label>Required Number</Form.Label>
                      <Form.Control
                        type="number"
                        name="requiredNumber"
                        value={selectedJob?.requiredNumber || ""}
                        onChange={(e) => handleInputChange(e)}
                        placeholder="Enter required number"
                        required
                      /> */}
                    {/* Validation message */}
                    {/* {(!selectedJob?.requiredNumber ||
                        isNaN(selectedJob.requiredNumber)) && (
                        <small style={{ color: "red" }}>
                          Please enter a valid numeric value
                        </small>
                      )}
                    </Form.Group>
                  </Col> */}

                    <Col md={4}>
                      <Form.Group controlId="formRequiredNumber">
                        <Form.Label>Required Number</Form.Label>
                        <Form.Control
                          type="number"
                          name="requiredNumber"
                          value={selectedJob?.requiredNumber || ""}
                          onChange={(e) => {
                            console.log(
                              "Required Number Changed:",
                              e.target.value
                            ); // Log the value to console
                            handleInputChange(e);
                          }}
                          placeholder="Enter required number"
                          required
                        />
                        {/* Validation message */}
                        {/* {(!selectedJob?.requiredNumber ||
      isNaN(selectedJob.requiredNumber)) && (
      <small style={{ color: "red" }}>
        Please enter a valid numeric value
      </small>
    )} */}
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
                          // required
                        />
                      </Form.Group>
                    </Col>

                   

                    <Col md={4}>
                      <Form.Group controlId="formEmploymentType">
                        <Form.Label>Employment Type</Form.Label>
                        <Form.Select
                          as="select"
                          name="employmentType"
                          value={selectedJob?.employmentType || ""}
                          onChange={handleInputChangeForEmploymentType}
                          required
                        >
                          <option value=""></option>
                          <option value="Permanent">Permanent</option>
                          <option value="Contract">Contract</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    {/* <Col md={4}>
                      <Form.Group controlId="formEmploymentType">
                        <Form.Label>Employment Type</Form.Label>
                        <Form.Select
                          as="select"
                          name="employmentType"
                          value={selectedJob?.employmentType || ""}
                          onChange={handleInputChange}
                          required
                        >
                          <option value=""></option>
                          <option value="part-time">Permanent</option>
                          <option value="contract">Contract</option>
                        </Form.Select>
                      </Form.Group>
                    </Col> */}

                    <Col md={6}>
                      <Form.Group controlId="formQualification">
                        <Form.Label>Qualification</Form.Label>
                        <Dropdown
                          show={showDropdown}
                          onToggle={(isOpen) => setShowDropdown(isOpen)}
                        >
                          <Dropdown.Toggle
                            variant="primary"
                            id="dropdown-basic"
                          >
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
                                name="qualification"
                                checked={selectedQualifications.includes(
                                  qualification
                                )}
                                onChange={handleCheckboxChange}
                                onClick={(e) => e.stopPropagation()}
                              />
                            ))}
                          </Dropdown.Menu>

                          {/* <Dropdown.Menu>
                          {qualifications.map((qualification, index) => (
                            <Form.Check
                              key={index}
                              type="checkbox"
                              label={qualification}
                              value={qualification}
                              name="qualification"
                              checked={selectedQualifications.includes(
                                qualification
                              )}
                              onChange={handleCheckboxChange}
                              onClick={(e) => e.stopPropagation()}
                              required
                            />
                          ))}
                        </Dropdown.Menu> */}
                          {selectedQualifications.length === 0 && (
                            <small style={{ color: "red" }}>
                              Please select at least one field.
                            </small>
                          )}
                        </Dropdown>
                      </Form.Group>
                    </Col>
                    <Col md={12} lg={12} xl={12}>
                      {" "}
                      {/* Adjusted column sizes */}
                      {/* Added overflow handling */}
                      <Form.Group controlId="formField">
                        <Form.Label>
                          Field <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Dropdown>
                          <Dropdown.Toggle variant="danger" id="dropdown-basic">
                            {selectedFields.length > 0
                              ? selectedFields.join(", ")
                              : "Select Fields"}
                          </Dropdown.Toggle>

                          <Dropdown.Menu
                            style={{ maxHeight: "200px", overflowY: "auto" }}
                          >
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

                        {/* Validation message */}
                        {selectedFields.length === 0 && (
                          <small style={{ color: "red" }}>
                            Please select at least one field.
                          </small>
                        )}
                      </Form.Group>
                    </Col>

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
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId="formSalary">
                        <Form.Label>Salary</Form.Label>
                        <Form.Control
                          type="number"  // Change type to "number"
                          name="salary"
                          value={selectedJob?.salary || ""}
                          onChange={handleInputChange}
                          placeholder="Enter salary"
                          // required  
                        />
                      </Form.Group>
                    </Col>

                    {/* <Col md={3}>
                      <Form.Group controlId="formSalary">
                        <Form.Label>Salary</Form.Label>
                        <Form.Control
                          type="text"
                          name="salary"
                          value={selectedJob?.salary || ""}
                          onChange={handleInputChange}
                          placeholder="Enter salary"
                          required
                        />
                      </Form.Group>
                    </Col> */}

                    <Col md={4}>
                      {/* Dropdown for Salary Type */}
                      <Form.Group controlId="formSalaryType" className="mt-2">
                        <Form.Label>Salary Type</Form.Label>
                        <Form.Select
                          name="salaryType"
                          value={selectedJob?.salaryType || ""}
                          onChange={handleInputChange}
                          required
                        >
                          <option value=""></option>
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
                          // required
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
                          required
                        />
                      </Form.Group>
                    </Col>



                    {/* <Col md={4}>
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
                    </Col> */}
                    <Col md={4}>
                      <Form.Group controlId="formJobLocation">
                        <Form.Label>Job Location</Form.Label>
                        <Dropdown>
                          <Dropdown.Toggle variant="danger" id="dropdown-basic">
                            {selectedJob?.jobLocation &&
                              selectedJob.jobLocation.length > 0
                              ? selectedJob.jobLocation.join(", ") // Show selected job locations
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
                                  selectedJob?.jobLocation?.includes(
                                    location
                                  ) || false
                                } // Check if location is selected
                                onChange={handleJobLocationsCheckboxChange} // Handle checkbox state change
                                onClick={(e) => e.stopPropagation()} // Prevent closing the dropdown on click
                              />
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>

                        {/* Validation message for job location */}
                        {(!selectedJob?.jobLocation ||
                          selectedJob.jobLocation.length === 0) && (
                            <small style={{ color: "red" }}>
                              Please select at least one job location.
                            </small>
                          )}
                      </Form.Group>
                    </Col>

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
                          required
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
                          required
                        />
                      </Form.Group>
                    </Col>

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
                          // required
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
                          // required
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
                          // required
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
                          required
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
                    <Col md={4}>
                      <Form.Group controlId="formDepartment">
                        <Form.Label>Department</Form.Label>
                        <Form.Control
                          type="text"
                          name="department"
                          value={selectedJob?.department || ""}
                          onChange={handleInputChange}
                          placeholder="Enter department"
                          // required
                        />
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
                          required
                        >
                          <option value=""></option>
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
                          // required
                        >
                          <option value=""></option>
                          <option value="job-board">Reporter</option>
                          <option value="referral">Addis Zemen</option>
                          <option value="company-website">Yegara jobs</option>
                          <option value="other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="formIncludeReference">
                        <Form.Label>Include Reference</Form.Label>
                        <Form.Select
                          name="includeReference"
                          value={selectedJob?.includeReference || ""}
                          onChange={handleInputChange}
                          // required
                        >
                          <option value=""></option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group controlId="formSource">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                          name="status" // Ensure this matches selectedJob key
                          value={selectedJob?.status || ""}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Status</option>{" "}
                          {/* Optional: add a default option */}
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
                {/* {showPopup.show && (
                <div className="popup-message">{showPopup.message}</div>
              )} */}
                <Modal show={showPopup.show} onHide={handleClosePopup} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                  </Modal.Header>
                  <Modal.Body
                    style={{ fontSize: "1.5rem", textAlign: "center" }}
                  >
                    {showPopup.message}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={handleClosePopup}>
                      OK
                    </Button>
                  </Modal.Footer>
                </Modal>
                {/* {showPopup.show && (
                <div
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "#28a745",
                  color: "white",
                  width: "350px", // Set width to 350px
                  height: "350px", // Set height to 350px
                  display: "flex", // Use flexbox to center content
                  alignItems: "center", // Center content vertically
                  justifyContent: "center", // Center content horizontally
                  padding: "10px", // Adjust padding if needed
                  borderRadius: "5px",
                  fontSize: "5.5rem", // Increase font size to 1.5rem (adjust as needed)
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  zIndex: 9999,  
                  }}
                >
                  {showPopup.message}
                </div>
              )} */}
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default JobPage;
