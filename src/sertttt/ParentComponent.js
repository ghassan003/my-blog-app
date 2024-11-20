import React, { useState } from 'react';
import JobPage from './JobPage'; // Path sahi karein

const ParentComponent = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);

  return (
    <JobPage
      selectedJob={selectedJob}
      setSelectedJob={setSelectedJob}
      setJobs={setJobs}
    />
  );
};

export default ParentComponent;
