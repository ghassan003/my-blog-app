import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Button, Card, Form } from 'react-bootstrap';
import SideNav from "./SideNav"; // Make sure the path is correct

const EditJob = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [title, setTitle] = useState('');
  const [qualification, setQualification] = useState('');
  const [field, setField] = useState('');
  const [experience, setExperience] = useState('');
  const [requiredNumber, setRequiredNumber] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [company, setCompany] = useState('');
  const [salary, setSalary] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [benefit, setBenefit] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [contractDuration, setContractDuration] = useState('');
  const [postDate, setPostDate] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [poBox, setPoBox] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [howToApply, setHowToApply] = useState('');
  const [includeReference, setIncludeReference] = useState('');
  const [source, setSource] = useState('');
  const [status, setStatus] = useState('');
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      const jobRef = doc(db, 'jobs', jobId);
      const jobSnap = await getDoc(jobRef);
      if (jobSnap.exists()) {
        const jobData = jobSnap.data();
        console.log("Data At edit page", jobData);
        
        setJob(jobData);

        // Set state for all fields
        setTitle(jobData.title);
        setQualification(jobData.qualification);
        setField(jobData.field);
        setExperience(jobData.experience);
        setRequiredNumber(jobData.requiredNumber);
        setAdditionalRequirements(jobData.additionalRequirements);
        setCompany(jobData.company);
        setSalary(jobData.salary);
        setJobLocation(jobData.jobLocation);
        setBenefit(jobData.benefit);
        setEmploymentType(jobData.employmentType);
        setContractDuration(jobData.contractDuration);
        setPostDate(jobData.postDate);
        setDeadlineDate(jobData.deadlineDate);
        setDepartment(jobData.department);
        setLocation(jobData.location);
        setPhoneNumber(jobData.phoneNumber);
        setPoBox(jobData.poBox);
        setEmail(jobData.email);
        setCity(jobData.city);
        setHowToApply(jobData.howToApply);
        setIncludeReference(jobData.includeReference);
        setSource(jobData.source);
        setStatus(jobData.status);
      }
    };
    fetchJob();
  }, [db, jobId]);

  const handleUpdate = async () => {
    const jobRef = doc(db, 'jobs', jobId);
    await updateDoc(jobRef, {
      title,
      qualification,
      field,
      experience,
      requiredNumber,
      additionalRequirements,
      company,
      salary,
      jobLocation: jobLocation  ,
      benefit,
      employmentType,
      contractDuration,
      postDate,
      deadlineDate,
      department,
      location,
      phoneNumber,
      poBox,
      email,
      city,
      howToApply,
      includeReference,
      source,
      status
    });
    navigate('/jobs'); // Redirect to the jobs list after update
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="d-flex">
    <SideNav />
    <div className="main-content">
      <Card>
          <Card.Header className="bg-primary text-white text-center">
            <h3 className="text-center">
            Edit Job Profile
              {/* {selectedJob ? "Edit Job" : "Add Job"} */}
            </h3>
          </Card.Header>
          <Card.Body>
          
          
      <Form>
        <Form.Group controlId="formJobTitle">
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formQualification">
          <Form.Label>Qualification</Form.Label>
          <Form.Control
            type="text"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formField">
          <Form.Label>Field</Form.Label>
          <Form.Control
            type="text"
            value={field}
            onChange={(e) => setField(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formExperience">
          <Form.Label>Experience</Form.Label>
          <Form.Control
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formRequiredNumber">
          <Form.Label>Required Number</Form.Label>
          <Form.Control
            type="number"
            value={requiredNumber}
            onChange={(e) => setRequiredNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formAdditionalRequirements">
          <Form.Label>Additional Requirements</Form.Label>
          <Form.Control
            type="text"
            value={additionalRequirements}
            onChange={(e) => setAdditionalRequirements(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formCompanyName">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formSalary">
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formJobLocation">
          <Form.Label>Job Location</Form.Label>
          <Form.Control
            type="text"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBenefit">
          <Form.Label>Benefit</Form.Label>
          <Form.Control
            type="text"
            value={benefit}
            onChange={(e) => setBenefit(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmploymentType">
          <Form.Label>Employment Type</Form.Label>
          <Form.Control
            type="text"
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formContractDuration">
          <Form.Label>Contract Duration</Form.Label>
          <Form.Control
            type="text"
            value={contractDuration}
            onChange={(e) => setContractDuration(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPostDate">
          <Form.Label>Post Date</Form.Label>
          <Form.Control
            type="date"
            value={postDate}
            onChange={(e) => setPostDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDeadlineDate">
          <Form.Label>Deadline Date</Form.Label>
          <Form.Control
            type="date"
            value={deadlineDate}
            onChange={(e) => setDeadlineDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDepartment">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPoBox">
          <Form.Label>PO Box</Form.Label>
          <Form.Control
            type="text"
            value={poBox}
            onChange={(e) => setPoBox(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formHowToApply">
          <Form.Label>How to Apply</Form.Label>
          <Form.Control
            type="text"
            value={howToApply}
            onChange={(e) => setHowToApply(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formIncludeReference">
          <Form.Label>Include Reference</Form.Label>
          <Form.Control
            type="text"
            value={includeReference}
            onChange={(e) => setIncludeReference(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formSource">
          <Form.Label>Source</Form.Label>
          <Form.Control
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </Form.Group>
{/* 
        <Form.Group controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Form.Control>
        </Form.Group> */}

        <Button variant="primary" onClick={handleUpdate}>
          Update Job
        </Button>
      </Form>
          </Card.Body>
        </Card>






    </div>
    </div>
  );
};

export default EditJob;
