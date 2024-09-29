// // import React from 'react';
// // import { Button, Table } from 'react-bootstrap';

// // const JobTable = ({ jobs, handleDelete, handleToggleStatus }) => {
// //   return (
// //     <Table striped bordered hover>
// //       <thead>
// //         <tr>
// //           <th>Job Title</th>
// //           <th>Company Name</th>
// //           <th>Job Location</th>
// //           {/* <th>Job Icon</th> */}
// //           <th>Status</th>
// //           <th>Actions</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {jobs.map((job) => (
// //           <tr key={job.id}>
// //             <td>{job.title}</td>
// //             <td>{job.company}</td>
// //             <td>{job.location}</td>
// //               {/* <td>
// //                 {job.jobIcon && (
// //                   <img
// //                     src={job.jobIcon}
// //                     alt="Job Icon"
// //                     style={{ width: '50px', height: '50px' }}
// //                   />
// //                 )}
// //               </td> */}
// //             <td>{job.status}</td>
// //             <td>
// //               <Button variant="danger" onClick={() => handleDelete(job.id)}>
// //                 Delete
// //               </Button>
// //               <Button
// //                 variant={job.status === 'Active' ? 'secondary' : 'success'}
// //                 onClick={() => handleToggleStatus(job)}
// //               >
// //                 {job.status === 'Active' ? 'Disable' : 'Enable'}
// //               </Button>
// //             </td>
// //           </tr>
// //         ))}
// //       </tbody>
// //     </Table>
// //   );
// // };

// // export default JobTable;



// // import React from 'react';
// // import { Button, Table } from 'react-bootstrap';

// // const JobTable = ({ jobs, handleDelete, handleToggleStatus, handleViewDetails }) => {
// //   return (
// //     <Table striped bordered hover>
// //       <thead>
// //         <tr>
// //           <th>Job Title</th>
// //           <th>Company Name</th>
// //           <th>Job Location</th>
// //           <th>Status</th>
// //           <th>Actions</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {jobs.map((job) => (
// //           <tr key={job.id}>
// //             <td>{job.title}</td>
// //             <td>{job.company}</td>
// //             <td>{job.location}</td>
// //             <td>{job.status}</td>
// //             <td>
// //               {/* <Button variant="info" onClick={() => handleViewDetails(job.id)}>
// //                 View Details
// //               </Button> */}
// //               <Button variant="danger" onClick={() => handleDelete(job.id)}>
// //                 Delete
// //               </Button>
// //               <Button
// //                 variant={job.status === 'Active' ? 'secondary' : 'success'}
// //                 onClick={() => handleToggleStatus(job)}
// //               >
// //                 {job.status === 'Active' ? 'Disable' : 'Enable'}
// //               </Button>
// //             </td>
// //           </tr>
// //         ))}
// //       </tbody>
// //     </Table>
// //   );
// // };

// // export default JobTable;



// // import React from 'react';
// // import { Button, Table } from 'react-bootstrap';

// // const JobTable = ({ jobs, handleDelete, handleToggleStatus, handleViewDetails }) => {


  
  
// //   return (
// //     <Table striped bordered hover>
// //       <thead>
// //         <tr>
// //           <th>Job Title</th>
// //           <th>Company Name</th>
// //           <th>Job Location</th>
// //           <th>Status</th>
// //           <th>Actions</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {jobs.map((job) => (
// //           <tr key={job.id}>
// //             <td>{job.title}</td>
// //             <td>{job.company}</td>
// //             <td>{job.location}</td>
// //             <td>{job.status}</td>
// //             <td>
// //               {/* View Details Button */}
// //               <Button variant="info" onClick={() => handleViewDetails(job.id)}>
// //                 View Details
// //               </Button>
              
// //               <Button variant="danger" onClick={() => handleDelete(job.id)}>
// //                 Delete
// //               </Button>
              
// //               <Button
// //                 variant={job.status === 'Active' ? 'secondary' : 'success'}
// //                 onClick={() => handleToggleStatus(job)}
// //               >
// //                 {job.status === 'Active' ? 'Disable' : 'Enable'}
// //               </Button>
// //             </td>
// //           </tr>
// //         ))}
// //       </tbody>
// //     </Table>
// //   );
// // };

// // export default JobTable;
 

// // JobTable.js

// import React, { useEffect, useState } from 'react';
// import { Button, Table } from 'react-bootstrap';
// import { getFirestore, collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';

// const JobTable = () => {
//   const [jobs, setJobs] = useState([]);
//   const db = getFirestore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchJobs = async () => {
//       const jobsCollection = collection(db, 'jobs');
//       const jobSnapshot = await getDocs(jobsCollection);
//       const jobList = jobSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setJobs(jobList);
//     };
//     fetchJobs();
//   }, [db]);

//   const handleViewDetails = (jobId) => {
//     navigate(`/jobs/${jobId}`); // Navigate to the JobDetails page
//   };

//   const handleDelete = async (jobId) => {
//     await deleteDoc(doc(db, 'jobs', jobId));
//     setJobs(jobs.filter(job => job.id !== jobId));
//   };

//   const handleToggleStatus = async (job) => {
//     const jobRef = doc(db, 'jobs', job.id);
//     await updateDoc(jobRef, { status: job.status === 'Active' ? 'Expire' : 'Active' });
//     setJobs(jobs.map(j => j.id === job.id ? { ...j, status: job.status === 'Active' ? 'Expire' : 'Active' } : j));
//   };

//   return (
//     <Table striped bordered hover>
//       <thead>
//         <tr>
//           <th>Job Title</th>
//           <th>Company Name</th>
//           <th>Job Location</th>
//           <th>Status</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {jobs.map((job) => (
//           <tr key={job.id}>
//             <td>{job.title}</td>
//             <td>{job.company}</td>
//             <td>{job.location}</td>
//             <td>{job.status}</td>
//             <td>
//               <Button variant="info" onClick={() => handleViewDetails(job.id)}>
//                 View Details
//               </Button>
//               <Button variant="danger" onClick={() => handleDelete(job.id)}>
//                 Delete
//               </Button>
//               <Button
//                 variant={job.status === 'Active' ? 'secondary' : 'success'}
//                 onClick={() => handleToggleStatus(job)}
//               >
//                 {job.status === 'Active' ? 'Disable' : 'Enable'}
//               </Button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//   );
// };

// export default JobTable;



import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { getFirestore, collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const JobTable = () => {
  const [jobs, setJobs] = useState([]);
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      const jobsCollection = collection(db, 'jobs');
      const jobSnapshot = await getDocs(jobsCollection);
      const jobList = jobSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(jobList);
    };
    fetchJobs();
  }, [db]);

  const handleViewDetails = (jobId) => {
    navigate(`/jobs/${jobId}`); // Navigate to the JobDetails page
  };

  const handleEditJob = (jobId) => {
    navigate(`/edit-job/${jobId}`); // Navigate to the Job Editing page
  };

  const handleDelete = async (jobId) => {
    await deleteDoc(doc(db, 'jobs', jobId));
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  const handleToggleStatus = async (job) => {
    const jobRef = doc(db, 'jobs', job.id);
    await updateDoc(jobRef, { status: job.status === 'Active' ? 'Expire' : 'Active' });
    setJobs(jobs.map(j => j.id === job.id ? { ...j, status: job.status === 'Active' ? 'Expire' : 'Active' } : j));
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Company Name</th>
          <th>Job Location</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job.id}>
            <td>{job.title}</td>
            <td>{job.company}</td>
            <td>{job.jobLocation}</td>
            <td>{job.status}</td>
            <td>
              <Button variant="info" onClick={() => handleViewDetails(job.id)}>
                View Details
              </Button>
              <Button variant="warning" onClick={() => handleEditJob(job.id)}>
                Edit Job Profile
              </Button>
              <Button variant="danger" onClick={() => handleDelete(job.id)}>
                Delete
              </Button>
              <Button
                variant={job.status === 'Active' ? 'secondary' : 'success'}
                onClick={() => handleToggleStatus(job)}
              >
                {job.status === 'Active' ? 'Disable' : 'Enable'}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default JobTable;
