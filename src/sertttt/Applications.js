// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getFirestore, collection, doc, getDocs } from "firebase/firestore";

// const Applications = () => {
//   const { jobId } = useParams();
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const db = getFirestore();

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         const jobDocRef = doc(db, "appliedJobs", jobId);
//         const userApplicationsCollection = collection(jobDocRef, "userId");

//         const userApplicationsSnapshot = await getDocs(userApplicationsCollection);
//         const applicationList = userApplicationsSnapshot.docs.map((doc) => ({
//           userId: doc.id,
//           ...doc.data(),
//         }));

//         setApplications(applicationList);
//       } catch (error) {
//         setError("Failed to load applications.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplications();
//   }, [jobId, db]);

//   if (loading) return <p className="text-center mt-8">Loading applications...</p>;
//   if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

//   return (

//     <div className="p-4 md:p-8 lg:p-12">
//       <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center">
//         Applications for Job ID: {jobId}
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {applications.map((application) => (
//           <div
//             key={application.userId}
//             className="bg-white border border-gray-200 shadow-lg rounded-lg p-5 hover:shadow-xl transition-shadow duration-300"
//           >
//             <p className="font-bold text-lg mb-3">User ID: {application.userId}</p>
//             <p className="mb-2">
//               <span className="font-semibold">Username:</span> {application.userName}
//             </p>
//             <p className="mb-2">
//               <span className="font-semibold">Phone Number:</span> {application.userPhoneNumber}
//             </p>
//             <p className="mb-2">
//               <span className="font-semibold">Email:</span> {application.userEmail}
//             </p>
//             <p className="mb-2">
//               <span className="font-semibold">Application Date:</span> {application.applicationDate}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>

//   );
// };

// export default Applications;

// import React from 'react';
// import { Container, Card } from 'react-bootstrap'; // Import Card here
// import SideNav from './SideNav'; // Adjust the path as needed
// import  { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getFirestore, collection, doc, getDocs } from "firebase/firestore";
// const Applications = () => {
//     const { jobId } = useParams();
//     const [applications, setApplications] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const db = getFirestore();

//     useEffect(() => {
//       const fetchApplications = async () => {
//         try {
//           const jobDocRef = doc(db, "appliedJobs", jobId);
//           const userApplicationsCollection = collection(jobDocRef, "userId");
//           const userApplicationsSnapshot = await getDocs(userApplicationsCollection);
//           const applicationList = userApplicationsSnapshot.docs.map((doc) => ({
//             userId: doc.id,
//             ...doc.data(),
//           }));

//           setApplications(applicationList);
//         } catch (error) {
//           setError("Failed to load applications.");
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchApplications();
//     }, [jobId, db]);

//     if (loading) return <p className="text-center mt-8">Loading applications...</p>;
//     if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;
//   return (
//     <div className="d-flex">
//       {/* Side Navigation */}
//       <div className="sidebar-wrapper">
//         <SideNav />
//       </div>
//       {/* Main Content */}
//       <div className="main-content flex-grow-1">
//       <Container className="mt-6">
//           {/* <h2>Setup</h2> */}
//           <Card>
//             <Card.Header className="bg-primary text-white text-center">
//               <h3 className="text-center">Setup Configuration</h3>
//               </Card.Header>
//             <Card.Body>
//             <div className="p-4 md:p-8 lg:p-">
//       <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center">
//         Applications for Job ID: {jobId}
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {applications.map((application) => (
//           <div
//             key={application.userId}
//             className="bg-white border border-gray-200 shadow-lg rounded-lg p-5 hover:shadow-xl transition-shadow duration-300"
//           >
//             <p className="font-bold text-lg mb-3">User ID: {application.userId}</p>
//             <p className="mb-2">
//               <span className="font-semibold">Username:</span> {application.userName}
//             </p>
//             <p className="mb-2">
//               <span className="font-semibold">Phone Number:</span> {application.userPhoneNumber}
//             </p>
//             <p className="mb-2">
//               <span className="font-semibold">Email:</span> {application.userEmail}
//             </p>
//             <p className="mb-2">
//               <span className="font-semibold">Application Date:</span> {application.applicationDate}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//          </Card.Body>
//           </Card>
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default Applications;

///////////////////////////////////////////////Card code

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getFirestore, collection, doc, getDocs } from "firebase/firestore";
// import { Container, Card, Button } from "react-bootstrap";
// import SideNav from "./SideNav"; // Adjust the path if necessary
// import CountdownLoader from "./CountdownLoader"; // Import your CountdownLoader component
// import "./Applications.css"; // Optional CSS file for extra styling


// const Applications = () => {
//   const { jobId  } = useParams();
//   const navigate = useNavigate(); // Initialize navigate
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const db = getFirestore();

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         const jobDocRef = doc(db, "appliedJobs", jobId);
//         const userApplicationsCollection = collection(jobDocRef, "userId");
//         const userApplicationsSnapshot = await getDocs(
//           userApplicationsCollection
//         );
//         const applicationList = userApplicationsSnapshot.docs.map((doc) => ({
//           userId: doc.id,
//           ...doc.data(),
//         }));

//         setApplications(applicationList);
//       } catch (error) {
//         setError("Failed to load applications.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplications();
//   }, [jobId, db]);

//   // Use CountdownLoader if loading
//   if (loading) {
//     return <CountdownLoader />; // Show CountdownLoader while loading
//   }

//   // Handle error case
//   if (error) {
//     return <p className="text-center text-red-500 mt-8">{error}</p>;
//   }

//   return (
//     <div className="d-flex">
//       {/* Side Navigation */}
//       <div className="sidebar-wrapper">
//         <SideNav />
//       </div>
//       {/* Main Content */}
//       <div className="main-content flex-grow-1">
//         <Container className="mt-4">
//           {/* Back Button */}

//           <Card>
//             <Card.Header className="bg-primary text-white text-center">
//               {/* <h>Applications</h> */}
//               <h3> Total Application : {applications.length}</h3>
//             </Card.Header>
//             <Card.Body>
//               <div className="grid-container">
//                 {applications.length === 0 ? (
//                   <p
//                     className="text-center"
//                     style={{
//                       color: "red",
//                       fontWeight: "bold",
//                       fontSize: "20px", // Adjust the size as needed
//                     }}
//                   >
//                     No Applicants Applied for the job. 😢
//                   </p>
//                 ) : (
//                   applications.map((application) => (
//                     <Card key={application.userId} className="application-card">
//                       <Card.Body>
//                         <p>
//                           <strong>Applicant Name:</strong>{" "}
//                           {application.userName}
//                         </p>
//                         <p>
//                           <strong>Applicant Contact Number:</strong>{" "}
//                           {application.userPhoneNumber}
//                         </p>
//                         <p>
//                           <strong>Applicant Email:</strong>{" "}
//                           {application.userEmail}
//                         </p>
//                         <p>
//                           <strong>Application Date:</strong>{" "}
//                           {new Date(
//                             application.applicationDate
//                           ).toLocaleDateString()}
//                         </p>
//                       </Card.Body>
//                     </Card>
//                   ))
//                 )}
//               </div>
//             </Card.Body>
//           </Card>
//           {/* Back Button with margin for space */}
//           <Button
//             variant="primary"
//             onClick={() => navigate("/job-management")}
//             className="mb-3 mt-3" // Added margin-top for space
//           >
//             Back to Job Management
//           </Button>
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default Applications;












import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getFirestore, collection, doc, getDocs } from "firebase/firestore";
import { Container, Card, Button } from "react-bootstrap";
import SideNav from "./SideNav"; // Adjust the path if necessary
import CountdownLoader from "./CountdownLoader"; // Import your CountdownLoader component
import "./Applications.css"; // Optional CSS file for extra styling

const Applications = () => {
    const { jobId } = useParams();
    const location = useLocation();
    const { company, status, title } = location.state || {};
    const navigate = useNavigate(); // Initialize navigate
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const db = getFirestore();

    // Debugging output
    console.log("company:", company, "status:", status, "title:", title);


    console.log("Location state:", location.state);



    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const jobDocRef = doc(db, "appliedJobs", jobId);
                const userApplicationsCollection = collection(jobDocRef, "userId");
                const userApplicationsSnapshot = await getDocs(userApplicationsCollection);
                const applicationList = userApplicationsSnapshot.docs.map((doc) => ({
                    userId: doc.id,
                    ...doc.data(),
                }));

                setApplications(applicationList);
            } catch (error) {
                setError("Failed to load applications.");
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [jobId, db]);

    // Use CountdownLoader if loading
    if (loading) {
        return <CountdownLoader />; // Show CountdownLoader while loading
    }

    // Handle error case
    if (error) {
        return <p className="text-center text-red-500 mt-8">{error}</p>;
    }

    return (
        <div className="d-flex">
            <div className="sidebar-wrapper">
                <SideNav />
            </div>
            <div className="main-content flex-grow-1">
                <Container className="mt-4">
                    <Card>
                        <Card.Header className="bg-primary text-white text-center">
                            <h3>Total Applications: {applications.length}</h3>
                        </Card.Header>
                        <Card.Body>
                        {/* <Card.Header className="bg-primary text-white text-center">
    <h3 style={{ color: status && status.toLowerCase() === 'active' ? 'green' : 'red' }}>
        {title} at {company} ({status})
    </h3>
</Card.Header> */}


                            <div className="grid-container">
                                {applications.length === 0 ? (
                                    <p className="text-center" style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}>
                                        No Applicants Applied for the job. 😢
                                    </p>
                                ) : (
                                    applications.map((application) => (
                                        <Card key={application.userId} className="application-card">
                                            <Card.Body>
                                                <p><strong>Applicant Name:</strong> {application.userName}</p>
                                                <p><strong>Applicant Contact Number:</strong> {application.userPhoneNumber}</p>
                                                <p><strong>Applicant Email:</strong> {application.userEmail}</p>
                                                <p><strong>Application Date:</strong> {new Date(application.applicationDate).toLocaleDateString()}</p>
                                            </Card.Body>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                    <Button
                        variant="primary"
                        onClick={() => navigate("/job-management")}
                        className="mb-3 mt-3"
                    >
                        Back to Job Management
                    </Button>
                </Container>
            </div>
        </div>
    );
};

export default Applications;
