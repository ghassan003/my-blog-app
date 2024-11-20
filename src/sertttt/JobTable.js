// import React, { useEffect, useState } from "react";
// import { Button, Table, Card, Modal } from "react-bootstrap";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   doc,
//   deleteDoc,
//   updateDoc,
// } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const JobTable = () => {
//   const [jobs, setJobs] = useState([]);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [jobToDelete, setJobToDelete] = useState(null);
//   const db = getFirestore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchJobs = async () => {
//       const jobsCollection = collection(db, "jobs");
//       const jobSnapshot = await getDocs(jobsCollection);
//       const jobList = jobSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setJobs(jobList);
//     };
//     fetchJobs();
//   }, [db]);

//   const handleViewDetails = (jobId) => {
//     navigate(`/jobs/${jobId}`);
//   };

//   const handleEditJob = (jobId) => {
//     navigate(`/edit-job/${jobId}`);
//   };

//   const handleDelete = async () => {
//     if (jobToDelete) {
//       await deleteDoc(doc(db, "jobs", jobToDelete));
//       setJobs(jobs.filter((job) => job.id !== jobToDelete));
//       setShowDeleteModal(false);
//       setJobToDelete(null);
//     }
//   };

//   const handleToggleStatus = async (job) => {
//     const jobRef = doc(db, "jobs", job.id);
//     await updateDoc(jobRef, {
//       status: job.status === "Active" ? "Expire" : "Active",
//     });
//     setJobs(
//       jobs.map((j) =>
//         j.id === job.id
//           ? { ...j, status: job.status === "Active" ? "Expire" : "Active" }
//           : j
//       )
//     );
//   };

//   const styles = {
//     card: {
//       margin: "20px",
//       boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//     },
//     table: {
//       minWidth: "650px",
//     },
//     statusBadge: (status) => ({
//       padding: "5px 10px",
//       borderRadius: "20px",
//       fontSize: "0.8rem",
//       fontWeight: "bold",
//       backgroundColor: status === "Active" ? "#d4edda" : "#f8d7da",
//       color: status === "Active" ? "#155724" : "#721c24",
//     }),
//     actionButton: {
//       marginRight: "5px",
//       marginBottom: "5px",
//     },
//   };

//   return (
//     <Card style={styles.card}>
//       <Card.Header className="bg-primary text-white text-center">
//         <h3 className="text-center">Job Management</h3>
//       </Card.Header>
//       <Card.Body>
//         <div style={{ overflowX: "auto" }}>
//           <Table striped bordered hover style={styles.table}>
//             <thead>
//               <tr>
//                 <th>Job Title</th>
//                 <th>Company Name</th>
//                 <th>Job Location</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {jobs.map((job) => (
//                 <tr key={job.id}>
//                   <td>{job.title}</td>
//                   <td>{job.company}</td>
//                   <td>{job.jobLocation}</td>
//                   <td>
//                     <span style={styles.statusBadge(job.status)}>
//                       {job.status}
//                     </span>
//                   </td>
//                   <td>
//                     <Button
//                       variant="info"
//                       size="sm"
//                       style={styles.actionButton}
//                       onClick={() => handleViewDetails(job.id)}
//                     >
//                       View
//                     </Button>
//                     <Button
//                       variant="warning"
//                       size="sm"
//                       style={styles.actionButton}
//                       onClick={() => handleEditJob(job.id)}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       variant="danger"
//                       size="sm"
//                       style={styles.actionButton}
//                       onClick={() => {
//                         setJobToDelete(job.id);
//                         setShowDeleteModal(true);
//                       }}
//                     >
//                       Delete
//                     </Button>
//                     <Button
//                       variant={
//                         job.status === "Active" ? "secondary" : "success"
//                       }
//                       size="sm"
//                       style={styles.actionButton}
//                       onClick={() => handleToggleStatus(job)}
//                     >
//                       {job.status === "Active" ? "Disable" : "Enable"}
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       </Card.Body>

//       <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Deletion</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to delete this job listing? This action cannot
//           be undone.
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleDelete}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Card>
//   );
// };

// export default JobTable;
///////////////////////////////////////////////////////////////////////////
// import React, { useEffect, useState } from "react";
// import { Button, Table, Card, Modal } from "react-bootstrap";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   doc,
//   deleteDoc,
//   updateDoc,
// } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { Grid, Grid3x3GapFill } from "react-bootstrap-icons";
// import './JobTable.css';

// const JobTable = () => {
//   const [jobs, setJobs] = useState([]);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [jobToDelete, setJobToDelete] = useState(null);
//   const [isCardView, setIsCardView] = useState(false);
//   const db = getFirestore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchJobs = async () => {
//       const jobsCollection = collection(db, "jobs");
//       const jobSnapshot = await getDocs(jobsCollection);
//       const jobList = jobSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setJobs(jobList);
//     };
//     fetchJobs();
//   }, [db]);

//   const handleViewDetails = (jobId) => {
//     navigate(`/jobs/${jobId}`);
//   };

//   const handleEditJob = (jobId) => {
//     navigate(`/edit-job/${jobId}`);
//   };

//   const handleDelete = async () => {
//     if (jobToDelete) {
//       await deleteDoc(doc(db, "jobs", jobToDelete));
//       setJobs(jobs.filter((job) => job.id !== jobToDelete));
//       setShowDeleteModal(false);
//       setJobToDelete(null);
//     }
//   };

//   const handleToggleStatus = async (job) => {
//     const jobRef = doc(db, "jobs", job.id);
//     await updateDoc(jobRef, {
//       status: job.status === "Active" ? "Expire" : "Active",
//     });
//     setJobs(
//       jobs.map((j) =>
//         j.id === job.id
//           ? { ...j, status: job.status === "Active" ? "Expire" : "Active" }
//           : j
//       )
//     );
//   };

//   const handleViewToggle = () => {
//     setIsCardView((prev) => !prev);
//   };

//   const styles = {
//     container: {
//       margin: "20px",
//       transition: "all 0.3s ease",
//     },
//     card: {
//       boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//     },
//     table: {
//       minWidth: "650px",
//     },
//     statusBadge: (status) => ({
//       padding: "5px 10px",
//       borderRadius: "20px",
//       fontSize: "0.8rem",
//       fontWeight: "bold",
//       backgroundColor: status === "Active" ? "#d4edda" : "#f8d7da",
//       color: status === "Active" ? "#155724" : "#721c24",
//       display: "inline-block",
//     }),
//     actionButton: {
//       marginRight: "5px",
//       marginBottom: "5px",
//     },
//     cardGrid: {
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//       gap: "20px",
//       padding: "20px",
//       transition: "all 0.3s ease",
//     },
//     jobCard: {
//       height: "100%",
//       transition: "all 0.3s ease-in-out",
//       cursor: "pointer",
//     },
//     viewToggleButton: {
//       marginLeft: "auto",
//       marginBottom: "0",
//       transition: "all 0.2s ease",
//     },
//     header: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       padding: "15px",
//       backgroundColor: "#007bff",
//       color: "white",
//     },
//   };

//   const JobCardView = ({ job }) => (
//     <Card
//       style={{ ...styles.jobCard }}
//       className="hover-shadow"
//       key={job.id}
//     >
//       <Card.Body>
//         <Card.Title>{job.title}</Card.Title>
//         <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
//         <Card.Text>
//           <strong>Location:</strong> {job.jobLocation}
//           <br />
//           <span style={styles.statusBadge(job.status)}>{job.status}</span>
//         </Card.Text>
//         <div className="d-flex flex-wrap mt-3">
//           <Button
//             variant="info"
//             size="sm"
//             style={styles.actionButton}
//             onClick={(e) => {
//               e.stopPropagation();
//               handleViewDetails(job.id);
//             }}
//           >
//             View
//           </Button>
//           <Button
//             variant="warning"
//             size="sm"
//             style={styles.actionButton}
//             onClick={(e) => {
//               e.stopPropagation();
//               handleEditJob(job.id);
//             }}
//           >
//             Edit
//           </Button>
//           <Button
//             variant="danger"
//             size="sm"
//             style={styles.actionButton}
//             onClick={(e) => {
//               e.stopPropagation();
//               setJobToDelete(job.id);
//               setShowDeleteModal(true);
//             }}
//           >
//             Delete
//           </Button>
//           <Button
//             variant={job.status === "Active" ? "secondary" : "success"}
//             size="sm"
//             style={styles.actionButton}
//             onClick={(e) => {
//               e.stopPropagation();
//               handleToggleStatus(job);
//             }}
//           >
//             {job.status === "Active" ? "Disable" : "Enable"}
//           </Button>
//         </div>
//       </Card.Body>
//     </Card>
//   );

//   return (
//     <div style={styles.container}>
//       <Card style={styles.card}>
//         <div style={styles.header}>
//           <h3 className="mb-0">Job Management</h3>
//           <Button
//             variant="outline-light"
//             onClick={handleViewToggle}
//             style={styles.viewToggleButton}
//             className="d-flex align-items-center"
//           >
//             {isCardView ? (
//               <>
//                 <Grid className="me-2" size={20} /> Table View
//               </>
//             ) : (
//               <>
//                 <Grid3x3GapFill className="me-2" size={20} /> Card View
//               </>
//             )}
//           </Button>
//         </div>
//         <Card.Body className="p-0">
//           <div className={`view-container ${isCardView ? 'card-view' : 'table-view'}`}>
//             {isCardView ? (
//               <div style={styles.cardGrid}>
//                 {jobs.map((job) => (
//                   <JobCardView key={job.id} job={job} />
//                 ))}
//               </div>
//             ) : (
//               <div style={{ overflowX: "auto" }} className="p-3">
//                 <Table striped bordered hover style={styles.table}>
//                   <thead>
//                     <tr>
//                       <th>Job Title</th>
//                       <th>Company Name</th>
//                       <th>Job Location</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {jobs.map((job) => (
//                       <tr key={job.id}>
//                         <td>{job.title}</td>
//                         <td>{job.company}</td>
//                         <td>{job.jobLocation}</td>
//                         <td>
//                           <span style={styles.statusBadge(job.status)}>
//                             {job.status}
//                           </span>
//                         </td>
//                         <td>
//                           <Button
//                             variant="info"
//                             size="sm"
//                             style={styles.actionButton}
//                             onClick={() => handleViewDetails(job.id)}
//                           >
//                             View
//                           </Button>
//                           <Button
//                             variant="warning"
//                             size="sm"
//                             style={styles.actionButton}
//                             onClick={() => handleEditJob(job.id)}
//                           >
//                             Edit
//                           </Button>
//                           <Button
//                             variant="danger"
//                             size="sm"
//                             style={styles.actionButton}
//                             onClick={() => {
//                               setJobToDelete(job.id);
//                               setShowDeleteModal(true);
//                             }}
//                           >
//                             Delete
//                           </Button>
//                           <Button
//                             variant={job.status === "Active" ? "secondary" : "success"}
//                             size="sm"
//                             style={styles.actionButton}
//                             onClick={() => handleToggleStatus(job)}
//                           >
//                             {job.status === "Active" ? "Disable" : "Enable"}
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </div>
//             )}
//           </div>
//         </Card.Body>
//       </Card>

//       <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Deletion</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to delete this job listing? This action cannot be
//           undone.
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleDelete}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default JobTable;

//   02 NOvember 2024

import React, { useEffect, useState } from "react";
import { Button, Table, Card, Modal } from "react-bootstrap";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Grid, Grid3x3GapFill } from "react-bootstrap-icons";
import "./JobTable.css";

const JobTable = () => {
  const [jobs, setJobs] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [isCardView, setIsCardView] = useState(false);
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      const jobsCollection = collection(db, "jobs");
      const jobSnapshot = await getDocs(jobsCollection);
      const jobList = jobSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobList);
    };
    fetchJobs();
  }, [db]);

  const handleViewDetails = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleEditJob = (jobId) => {
    navigate(`/edit-job/${jobId}`);
  };

  const handleViewApplication = (jobId) => {
    navigate(`/applications/${jobId}`); // Navigate to the application details
  };

  const handleDelete = async () => {
    if (jobToDelete) {
      await deleteDoc(doc(db, "jobs", jobToDelete));
      setJobs(jobs.filter((job) => job.id !== jobToDelete));
      setShowDeleteModal(false);
      setJobToDelete(null);
    }
  };

  const handleToggleStatus = async (job) => {
    const jobRef = doc(db, "jobs", job.id);
    await updateDoc(jobRef, {
      status: job.status === "Active" ? "Expire" : "Active",
    });
    setJobs(
      jobs.map((j) =>
        j.id === job.id
          ? { ...j, status: job.status === "Active" ? "Expire" : "Active" }
          : j
      )
    );
  };

  const handleViewToggle = () => {
    setIsCardView((prev) => !prev);
  };

  const styles = {
    container: {
      margin: "20px",
      transition: "all 0.3s ease",
    },
    card: {
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    table: {
      minWidth: "650px",
    },
    statusBadge: (status) => ({
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "0.8rem",
      fontWeight: "bold",
      backgroundColor: status === "Active" ? "#d4edda" : "#f8d7da",
      color: status === "Active" ? "#155724" : "#721c24",
      display: "inline-block",
    }),
    actionButton: {
      marginRight: "5px",
      marginBottom: "5px",
    },
    cardGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
      padding: "20px",
      transition: "all 0.3s ease",
    },
    jobCard: {
      height: "100%",
      transition: "all 0.3s ease-in-out",
      cursor: "pointer",
    },
    viewToggleButton: {
      marginLeft: "auto",
      marginBottom: "0",
      transition: "all 0.2s ease",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px",
      backgroundColor: "#007bff",
      color: "white",
    },
  };

  const JobCardView = ({ job }) => (
    <Card style={{ ...styles.jobCard }} className="hover-shadow" key={job.id}>
      <Card.Body>
        <Card.Title>{job.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
        <Card.Text>
          <strong>Location:</strong> {job.jobLocation}
          <br />
          <span style={styles.statusBadge(job.status)}>{job.status}</span>
        </Card.Text>
        <div className="d-flex flex-wrap mt-3">
          <Button
            variant="info"
            size="sm"
            style={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails(job.id);
            }}
          >
            View
          </Button>
          <Button
            variant="warning"
            size="sm"
            style={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              handleEditJob(job.id);
            }}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            style={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              setJobToDelete(job.id);
              setShowDeleteModal(true);
            }}
          >
            Delete
          </Button>
          <Button
            variant={job.status === "Active" ? "secondary" : "success"}
            size="sm"
            style={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              handleToggleStatus(job);
            }}
          >
            {job.status === "Active" ? "Disable" : "Enable"}
          </Button>
          {/* <Button
            variant="primary"
            size="sm"
            style={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              handleViewApplication(job.id);
            }}
          >
            View Application
          </Button> */}
          <Button
            variant="primary"
            size="sm"
            style={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              // Log the job object to check its properties
              console.log("Navigating with job:", job); // Check if job is defined
              if (job && job.id && job.company && job.status && job.title) {
                navigate(`/applications/${job.id}`, {
                  state: {
                    company: job.company,
                    status: job.status,
                    title: job.title,
                  },
                });
              } else {
                console.error("Job properties are missing:", job);
              }
            }}
          >
            View Applications
          </Button>
          
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <div style={styles.header}>
          <h3 className="mb-0">Job Management</h3>
          <Button
            variant="outline-light"
            onClick={handleViewToggle}
            style={styles.viewToggleButton}
            className="d-flex align-items-center"
          >
            {isCardView ? (
              <>
                <Grid className="me-2" size={20} /> Table View
              </>
            ) : (
              <>
                <Grid3x3GapFill className="me-2" size={20} /> Card View
              </>
            )}
          </Button>
        </div>
        <Card.Body className="p-0">
          <div
            className={`view-container ${
              isCardView ? "card-view" : "table-view"
            }`}
          >
            {isCardView ? (
              <div style={styles.cardGrid}>
                {jobs.map((job) => (
                  <JobCardView key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div style={{ overflowX: "auto" }} className="p-3">
                <Table striped bordered hover style={styles.table}>
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
                        <td>
                          <span style={styles.statusBadge(job.status)}>
                            {job.status}
                          </span>
                        </td>
                        <td>
                          <Button
                            variant="info"
                            size="sm"
                            style={styles.actionButton}
                            onClick={() => handleViewDetails(job.id)}
                          >
                            View
                          </Button>
                          <Button
                            variant="warning"
                            size="sm"
                            style={styles.actionButton}
                            onClick={() => handleEditJob(job.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            style={styles.actionButton}
                            onClick={() => {
                              setJobToDelete(job.id);
                              setShowDeleteModal(true);
                            }}
                          >
                            Delete
                          </Button>
                          <Button
                            variant={
                              job.status === "Active" ? "secondary" : "success"
                            }
                            size="sm"
                            style={styles.actionButton}
                            onClick={() => handleToggleStatus(job)}
                          >
                            {job.status === "Active" ? "Disable" : "Enable"}
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            style={styles.actionButton}
                            onClick={() => handleViewApplication(job.id)}
                          >
                            View Application
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this job?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default JobTable;
