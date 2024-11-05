// src/ApplyJobPage.js


import { Container,  } from "react-bootstrap";
import SideNav from "./SideNav";
import "./JobManagement.css";
 import ApplyJobList from "./ApplyJobList";
//import MatchedJobsComponent from './MatchedJobsComponent'; // Make sure path is correct


const JobApplicants = () => {


  return (
    <div className="d-flex">
      {/* Side Navigation */}
      <div className="sidebar-wrapper">
        <SideNav />
      </div>
      {/* Main Content */}
      <div className="main-content flex-grow-1">
        <Container className="mt-6">


         <ApplyJobList />
         






        </Container>
      </div>
    </div>
  );
};

export default JobApplicants;











// import React, { useState, useEffect } from "react";
// import { db } from "./firebase"; // Adjust the import according to your firebase config file

// const JobApplicants = ({ jobId }) => {
//   const [applicants, setApplicants] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!jobId) return; // Skip fetching if no job ID is provided

//     setLoading(true);

//     // Fetching applicants from Firestore
//     const unsubscribe = db
//       .collection("appliedJobs")
//       .doc(jobId)
//       .collection("userId") // Assuming each job document has a subcollection named "userId"
//       .onSnapshot(
//         (snapshot) => {
//           const applicantData = snapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }));
//           setApplicants(applicantData);
//           setLoading(false);
//         },
//         (error) => {
//           console.error("Error fetching applicants:", error);
//           setLoading(false);
//         }
//       );

//     return () => unsubscribe(); // Cleanup on unmount
//   }, [jobId]);

//   return (
//     <div>
//       <h2>Applicants for Job ID: {jobId}</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : applicants.length > 0 ? (
//         <ul>
//           {applicants.map((applicant) => (
//             <li key={applicant.id}>
//               <h3>{applicant.userName}</h3>
//               <p><strong>Email:</strong> {applicant.userEmail}</p>
//               <p><strong>Phone:</strong> {applicant.userPhoneNumber}</p>
//               <p><strong>Applied on:</strong> {new Date(applicant.applicationDate).toLocaleString()}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No applicants found for this job.</p>
//       )}
//     </div>
//   );
// };

// export default JobApplicants;
