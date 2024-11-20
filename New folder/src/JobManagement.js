import React, { useState, useEffect } from "react";
import { Container,  } from "react-bootstrap";
import SideNav from "./SideNav";
import JobTable from "./JobTable";
import JobForm from "./JobForm";
import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";
import "./JobManagement.css";

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

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "jobs", id));
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const handleViewDetails = (jobId) => {
    console.log("Viewing details for job ID:", jobId);
  };

  const handleToggleStatus = async (job) => {
    const jobRef = doc(db, "jobs", job.id);
    await updateDoc(jobRef, {
      status: job.status === "Active" ? "Inactive" : "Active",
    });
    setJobs(
      jobs.map((j) =>
        j.id === job.id
          ? { ...j, status: job.status === "Active" ? "Inactive" : "Active" }
          : j
      )
    );
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
          <JobTable
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
          {/* 
      <Card className="job-management-card">
            <Card.Header className="bg-primary text-white text-center">
              <h3 className="text-center">Job Management</h3>
            </Card.Header>
            <Card.Body>
              
            </Card.Body>
          </Card>
       */}
        </Container>
      </div>
    </div>
  );
};

export default JobManagement;
