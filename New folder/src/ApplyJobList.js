


import { db } from "./firebaseConfig"; // import your Firebase configuration


import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

import { collection, getDocs } from 'firebase/firestore';

const AppliedJobsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        
        // Get the specific document's userId subcollection
        const userIdsCollectionRef = collection(
          db, 
          'appliedJobs', 
          'GA3iFIntzFYqXP7ZU3E1',  // This is the specific document ID
          'userId'
        );
        
        const userIdsSnapshot = await getDocs(userIdsCollectionRef);
        
        const applicationsData = userIdsSnapshot.docs.map(doc => ({
          userId: doc.id,
          ...doc.data()
        }));
        
        setApplications(applicationsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load applications. Error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center m-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="h2 mb-4">Applied Jobs</h1>
      
      {applications.length === 0 ? (
        <p className="text-center text-muted">
          No applications found.
        </p>
      ) : (
        <div className="row g-4">
          {applications.map((application) => (
            <div className="col-12" key={application.userId}>
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">
                    {application.jobTitle || 'Job Title'}
                  </h5>
                </div>
                <div className="card-body">
                  <div className="mb-2">
                    <strong>User ID:</strong> {application.userId}
                  </div>
                  <div className="mb-2">
                    <strong>Company:</strong> {application.company || 'N/A'}
                  </div>
                  <div className="mb-2">
                    <strong>Application Date:</strong>{' '}
                    {application.appliedDate?.toDate().toLocaleDateString() || 'N/A'}
                  </div>
                  <div className="mb-2">
                    <strong>Status:</strong>{' '}
                    <span className={`badge ${
                      application.status === 'pending' ? 'bg-warning' :
                      application.status === 'accepted' ? 'bg-success' :
                      application.status === 'rejected' ? 'bg-danger' :
                      'bg-secondary'
                    }`}>
                      {application.status?.charAt(0).toUpperCase() + application.status?.slice(1) || 'Pending'}
                    </span>
                  </div>
                  {application.notes && (
                    <div className="mb-2">
                      <strong>Notes:</strong> {application.notes}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Debug section */}
      <div className="mt-4">
        <h6>Debug Info:</h6>
        <pre className="bg-light p-3 rounded">
          {JSON.stringify(applications, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default AppliedJobsPage;

// import { Spinner } from 'react-bootstrap';
// import { db } from './firebaseConfig';
// import { collection, getDocs } from 'firebase/firestore';

// const AppliedJobsPage = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [jobsData, setJobsData] = useState({}); // Store jobs data

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         // Step 1: Fetch data from `jobs` collection and store in `jobsData`
//         const jobsCollectionRef = collection(db, 'jobs');
//         const jobsSnapshot = await getDocs(jobsCollectionRef);
//         const jobsMap = {};
        
//         jobsSnapshot.forEach((doc) => {
//           jobsMap[doc.id] = doc.data();  // Map jobId to job data
//         });
//         setJobsData(jobsMap);

//         // Step 2: Fetch data from `appliedJobs` collection and include `jobsData`
//         const appliedJobsCollectionRef = collection(db, 'appliedJobs');
//         const appliedJobsSnapshot = await getDocs(appliedJobsCollectionRef);
        
//         const allApplications = [];

//         for (const doc of appliedJobsSnapshot.docs) {
//           const jobId = doc.id;
//           const userIdsCollectionRef = collection(db, 'appliedJobs', jobId, 'userId');
//           const userIdsSnapshot = await getDocs(userIdsCollectionRef);

//           const jobApplications = userIdsSnapshot.docs.map(userDoc => ({
//             jobId,  // Include job ID for reference
//             userId: userDoc.id,
//             jobTitle: jobsMap[jobId]?.title || 'N/A', // Use `jobsMap` to get job title
//             company: jobsMap[jobId]?.company || 'N/A', // Use `jobsMap` to get company
//             ...userDoc.data()
//           }));

//           allApplications.push(...jobApplications);
//         }

//         setApplications(allApplications);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching applications:", err);
//         setError("Failed to load applications. Error: " + err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="alert alert-danger text-center m-4">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="container py-4">
//       <h1 className="h2 mb-4">Applied Jobs</h1>
      
//       {applications.length === 0 ? (
//         <p className="text-center text-muted">
//           No applications found.
//         </p>
//       ) : (
//         <div className="row g-4">
//           {applications.map((application) => (
//             <div className="col-12" key={`${application.jobId}-${application.userId}`}>
//               <div className="card">
//                 <div className="card-header">
//                   <h5 className="card-title mb-0">
//                     {application.jobTitle}
//                   </h5>
//                 </div>
//                 <div className="card-body">
//                   <div className="mb-2">
//                     <strong>Job ID:</strong> {application.jobId}
//                   </div>
//                   <div className="mb-2">
//                     <strong>User ID:</strong> {application.userId}
//                   </div>
//                   <div className="mb-2">
//                     <strong>Company:</strong> {application.company}
//                   </div>
//                   <div className="mb-2">
//                     <strong>Application Date:</strong>{' '}
//                     {application.appliedDate?.toDate().toLocaleDateString() || 'N/A'}
//                   </div>
//                   <div className="mb-2">
//                     <strong>Status:</strong>{' '}
//                     <span className={`badge ${
//                       application.status === 'pending' ? 'bg-warning' :
//                       application.status === 'accepted' ? 'bg-success' :
//                       application.status === 'rejected' ? 'bg-danger' :
//                       'bg-secondary'
//                     }`}>
//                       {application.status?.charAt(0).toUpperCase() + application.status?.slice(1) || 'Pending'}
//                     </span>
//                   </div>
//                   {application.notes && (
//                     <div className="mb-2">
//                       <strong>Notes:</strong> {application.notes}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
      
//       {/* Debug section */}
//       <div className="mt-4">
//         <h6>Debug Info:</h6>
//         <pre className="bg-light p-3 rounded">
//           {JSON.stringify(applications, null, 2)}
//         </pre>
//       </div>
//     </div>
//   );
// };

// export default AppliedJobsPage;



// import React, { useState, useEffect } from 'react';
// import { db } from './firebaseConfig';
// import { collection, getDocs } from 'firebase/firestore';

// const AppliedJobsComponent = () => {
//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAppliedJobs = async () => {
//       try {
//         // Reference to the appliedJobs collection
//         const appliedJobsRef = collection(db, 'jobs');
        
//         // Get all documents from the collection
//         const querySnapshot = await getDocs(appliedJobsRef);
        
//         // Convert the querySnapshot to an array of documents
//         const jobsData = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));

//         console.log('Fetched jobs:', jobsData);
//         setAppliedJobs(jobsData);
        
//       } catch (error) {
//         console.error('Error fetching applied jobs:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppliedJobs();
//   }, []);

//   if (loading) {
//     return <div>Loading applied jobs...</div>;
//   }

//   if (error) {
//     return <div>Error loading data: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>Applied Jobs</h2>
//       <div>
//         {appliedJobs.map(job => (
//           <div key={job.id}>
//             <h3>Job ID: {job.id}</h3>
//             <pre>{JSON.stringify(job, null, 2)}</pre>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AppliedJobsComponent;


// MatchedJobsComponent.js
// import React, { useState, useEffect } from 'react';
// import { db } from './firebaseConfig';
// import { collection, getDocs } from 'firebase/firestore';

// const AppliedJobsPage = () => {
//   const [matchedJobs, setMatchedJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMatchedJobs = async () => {
//       try {
//         // Fetch data from both collections
//         const jobsSnapshot = await getDocs(collection(db, 'jobs'));
//         const appliedJobsSnapshot = await getDocs(collection(db, 'appliedJobs'));

//         // Convert snapshots to arrays with job IDs
//         const jobs = jobsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));

//         const appliedJobs = appliedJobsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));


// console.log("jobs and appliedJobs", jobs,appliedJobs);


//         // Find matching jobs based on job ID
//         const matched = jobs.filter(job => 
//           appliedJobs.some(appliedJob => 
//             appliedJob.jobId === job.id || appliedJob.id === job.id
//           )
//         ).map(job => {
//           const appliedJob = appliedJobs.find(aj => 
//             aj.jobId === job.id || aj.id === job.id
//           );
//           return {
//             ...job,
//             appliedDetails: appliedJob
//           };
//         });

//         console.log('Matched jobs:', matched);
//         setMatchedJobs(matched);

//       } catch (error) {
//         console.error('Error fetching matched jobs:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMatchedJobs();
//   }, []);

//   if (loading) {
//     return <div>Loading matched jobs...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>Matched Jobs</h2>
//       <div>
//         {matchedJobs.length === 0 ? (
//           <p>No matched jobs found</p>
//         ) : (
//           matchedJobs.map(job => (
//             <div key={job.id} className="border p-4 mb-4 rounded">
//               <h3>{job.title || 'Job Title Not Available'}</h3>
//               <p>Job ID: {job.id}</p>
//               <div>
//                 <strong>Job Details:</strong>
//                 <p>Company: {job.company || 'N/A'}</p>
//                 <p>Location: {job.location || 'N/A'}</p>
//               </div>
//               <div>
//                 <strong>Application Details:</strong>
//                 <p>Status: {job.appliedDetails?.status || 'Pending'}</p>
//                 <p>Applied Date: {
//                   job.appliedDetails?.appliedDate ? 
//                   new Date(job.appliedDetails.appliedDate).toLocaleDateString() : 
//                   'N/A'
//                 }</p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// // Make sure to export the component
// export default AppliedJobsPage;