import React, { useEffect, useState } from 'react';  
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import SideNav from "./SideNav"; // Adjust the path as needed
import { Card, Button, Table } from 'react-bootstrap';
import CountdownLoader from './CountdownLoader'; // Import the CountdownLoader
import './SideNav.css'; // Ensure CSS is imported

const JobDetails = () => {
  const { jobId } = useParams(); // Get the jobId from the URL parameters
  const [jobDetails, setJobDetails] = useState(null);
  const db = getFirestore();

  // Fetch job details from Firestore
  useEffect(() => {
    const fetchJobDetails = async () => {
      const jobRef = doc(db, 'jobs', jobId); // Adjust 'jobs' to your collection name
      const jobSnapshot = await getDoc(jobRef);
      if (jobSnapshot.exists()) {
        setJobDetails(jobSnapshot.data());
      } else {
        console.log('No such job found!');
      }
    };
    fetchJobDetails();
  }, [db, jobId]);

  // Show the CountdownLoader while loading job details
  if (!jobDetails) {
    return <CountdownLoader />; // Use CountdownLoader component here
  }

  return (
    <div className="job-details">
      <SideNav />  
      <div className="content-wrapper"> {/* Add this wrapper */}
        <Card>
          <Card.Header className="bg-primary text-white text-center">
            <h3 className="text-center">{jobDetails.title}</h3> {/* Job title in header */}
          </Card.Header>
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted text-center">{}</Card.Subtitle> {/* Optional: company subtitle */}
            
            <Table striped bordered hover>
              <tbody>
              <tr>
                  <td><strong> Compant Name:</strong></td>
                  <td>{jobDetails.company}</td>
                </tr>
                <tr>
                  <td><strong>Location:</strong></td>
                  <td>{jobDetails.location}</td>
                </tr>
                <tr>
                  <td><strong>Status:</strong></td>
                  <td>{jobDetails.status}</td>
                </tr>
                <tr>
                  <td><strong>Qualifications:</strong></td>
                  <td>{jobDetails.qualification}</td>
                </tr>
                <tr>
                  <td><strong>Field:</strong></td>
                  <td>{jobDetails.field}</td>
                </tr>
                <tr>
                  <td><strong>Experience:</strong></td>
                  <td>{jobDetails.experience}</td>
                </tr>
                <tr>
                  <td><strong>Required Number:</strong></td>
                  <td>{jobDetails.requiredNumber}</td>
                </tr>
                <tr>
                  <td><strong>Additional Requirements:</strong></td>
                  <td>{jobDetails.additionalRequirements}</td>
                </tr>
                <tr>
                  <td><strong>Salary:</strong></td>
                  <td>{jobDetails.salary}</td>
                </tr>
                <tr>
                  <td><strong>Benefit:</strong></td>
                  <td>{jobDetails.benefit}</td>
                </tr>
                <tr>
                  <td><strong>Employment Type:</strong></td>
                  <td>{jobDetails.employmentType}</td>
                </tr>
                <tr>
                  <td><strong>Contract Duration:</strong></td>
                  <td>{jobDetails.contractDuration}</td>
                </tr>
                <tr>
                  <td><strong>Post Date:</strong></td>
                  <td>{jobDetails.postDate}</td>
                </tr>
                <tr>
                  <td><strong>Deadline Date:</strong></td>
                  <td>{jobDetails.deadlineDate}</td>
                </tr>
                <tr>
                  <td><strong>Department:</strong></td>
                  <td>{jobDetails.department}</td>
                </tr>
                <tr>
                  <td><strong>Phone Number:</strong></td>
                  <td>{jobDetails.phoneNumber}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{jobDetails.email}</td>
                </tr>
                <tr>
                  <td><strong>How to Apply:</strong></td>
                  <td>{jobDetails.howToApply}</td>
                </tr>
                <tr>
                  <td><strong>Include Reference:</strong></td>
                  <td>{jobDetails.includeReference ? "Yes" : "No"}</td>
                </tr>
                <tr>
                  <td><strong>Source:</strong></td>
                  <td>{jobDetails.source}</td>
                </tr>
              </tbody>
            </Table>

            <Button variant="primary" onClick={() => window.history.back()}>Back</Button>
          </Card.Body>
        </Card>
      </div> {/* End of content-wrapper */}
    </div>
  );
};

export default JobDetails;
