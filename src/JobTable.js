import React from 'react';
import { Button, Table } from 'react-bootstrap';

const JobTable = ({ jobs, handleDelete, handleToggleStatus }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Company Name</th>
          <th>Job Location</th>
          <th>Job Icon</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job.id}>
            <td>{job.title}</td>
            <td>{job.companyName}</td>
            <td>{job.location}</td>
            <td>
              {job.jobIcon && (
                <img
                  src={job.jobIcon}
                  alt="Job Icon"
                  style={{ width: '50px', height: '50px' }}
                />
              )}
            </td>
            <td>{job.status}</td>
            <td>
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
