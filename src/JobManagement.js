import React, { useState, useEffect } from "react";
import { Container, Card, } from "react-bootstrap"; // Import Button here
import SideNav from "./SideNav"; // Adjust the path as needed
import JobTable from "./JobTable";
import JobForm from "./JobForm";
import { collection, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase"; // Adjust the path as needed

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "jobs"));
      setJobs(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, []);


  

  // const handleAdd = () => {
  //   setSelectedJob({
  //     title: "",
  //     companyName: "",
  //     location: "",
  //     status: "Active",
  //     jobIcon: "",
  //   });
  //   setShowModal(true);
  // };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "jobs", id));
    setJobs(jobs.filter((job) => job.id !== id));
  };


  const handleViewDetails = (jobId) => {
    console.log("Viewing details for job ID:", jobId);
    // Implement logic to show job details (e.g., redirect or modal)
  }
  

  const handleToggleStatus = async (job) => {
    const jobRef = doc(db, 'jobs', job.id);
    await updateDoc(jobRef, { status: job.status === 'Active' ? 'Inactive' : 'Active' });
    setJobs(jobs.map(j => j.id === job.id ? { ...j, status: job.status === 'Active' ? 'Inactive' : 'Active' } : j));
  };

  // const handleToggleStatus = async (job) => {
  //   const newStatus = job.status === "Active" ? "Disabled" : "Active";
  //   const jobRef = doc(db, "jobs", job.id);
  //   await updateDoc(jobRef, { status: newStatus });

  //   const querySnapshot = await getDocs(collection(db, "jobs"));
  //   setJobs(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  // };

  return (
    <div className="d-flex">
      <SideNav /> {/* Render the SideNav component */}
      <div className="main-content" style={{ flexGrow: 1 }}>
        <Container className="mt-5">
          <Card>
            <Card.Header className="bg-primary text-white text-center">
              <h3 className="text-center">Job Management</h3>
            </Card.Header>
            <Card.Body>

              <JobTable
                //jobs={jobs}
                // handleDelete={handleDelete}
                // handleToggleStatus={handleToggleStatus}
                jobs={jobs}
                handleDelete={handleDelete}
                handleToggleStatus={handleToggleStatus}
                handleViewDetails={handleViewDetails}
              />
              <JobForm
                selectedJob={selectedJob}
                setSelectedJob={setSelectedJob}
                setJobs={setJobs}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default JobManagement;
