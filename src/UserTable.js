import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import * as XLSX from 'xlsx';
import { CSVLink } from 'react-csv';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  
  // Filter states
  const [batchFilter, setBatchFilter] = useState('');
  const [professionFilter, setProfessionFilter] = useState('');
  const [educationFilter, setEducationFilter] = useState('');

  // Generate batch options
  const currentYear = new Date().getFullYear();
  const batchOptions = [];
  for (let year = 1997; year <= currentYear; year++) {
    batchOptions.push(year);
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
        setFilteredUsers(usersList);
      } catch (error) {
        toast.error('Error fetching users: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async () => {
    if (selectedUserId) {
      try {
        await deleteDoc(doc(db, 'users', selectedUserId));
        setUsers(users.filter((user) => user.id !== selectedUserId));
        setFilteredUsers(filteredUsers.filter((user) => user.id !== selectedUserId));
        toast.success('User deleted successfully');
        setShowModal(false);
      } catch (error) {
        toast.error('Error deleting user: ' + error.message);
      }
    }
  };

  const openDeleteConfirmation = (id) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedUserId(null);
  };

  const handlePaymentStatusChange = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'users', id), { paymentStatus: newStatus });
      setUsers(users.map((user) => (user.id === id ? { ...user, paymentStatus: newStatus } : user)));
      toast.success('Payment status updated successfully');
    } catch (error) {
      toast.error('Error updating payment status: ' + error.message);
    }
  };

  // Filter function
  const applyFilters = useCallback(() => {
    const filtered = users.filter(user => 
      (batchFilter ? user.batch === batchFilter : true) &&
      (professionFilter ? user.profession === professionFilter : true) &&
      (educationFilter ? user.education === educationFilter : true)
    );
    setFilteredUsers(filtered);
  }, [users, batchFilter, professionFilter, educationFilter]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredUsers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'UsersData.xlsx');
  };

  // CSV headers
  const csvHeaders = [
    { label: 'Full Name', key: 'fullName' },
    { label: 'Phone Number', key: 'phoneNumber' },
    { label: 'Email', key: 'email' },
    { label: 'Batch', key: 'batch' },
    { label: 'Profession', key: 'profession' },
    { label: 'Educational Background', key: 'education' },
    { label: 'Payment Status', key: 'paymentStatus' },
  ];

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <button className="btn btn-primary mb-3">
        <Link to="/add-user" className="text-white text-decoration-none">Add New User</Link>
      </button>

      <button className="btn btn-info mb-3">
        <Link to="/payment-confirmation" className="text-white text-decoration-none">View Payment Confirmation</Link>
      </button>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-4">
          <label>Batch:</label>
          <select
            className="form-select"
            value={batchFilter}
            onChange={(e) => setBatchFilter(e.target.value)}
          >
            <option value="">All</option>
            {batchOptions.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label>Profession:</label>
          <select
            className="form-select"
            value={professionFilter}
            onChange={(e) => setProfessionFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Government Employee">Government Employee</option>
            <option value="Private Sector">Private Sector</option>
            <option value="Merchant">Merchant</option>
            <option value="Job seeker">Job seeker</option>
          </select>
        </div>
        <div className="col-md-4">
          <label>Educational Background:</label>
          <select
            className="form-select"
            value={educationFilter}
            onChange={(e) => setEducationFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="High school">High school</option>
            <option value="College diploma">College diploma</option>
            <option value="BA/BSc">BA/BSc</option>
            <option value="MA/MSC">MA/MSC</option>
            <option value="PhD">PhD</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* User Count */}
      <div className="mb-3">
        <h5>Total Users: {users.length}</h5>
        <h5>Filtered Users: {filteredUsers.length}</h5>
      </div>

      {/* Export Buttons */}
      <div className="mb-3">
        <button className="btn btn-success me-2" onClick={exportToExcel}>
          Export to Excel
        </button>
        <CSVLink 
          data={filteredUsers} 
          headers={csvHeaders} 
          filename="UsersData.csv" 
          className="btn btn-warning"
        >
          Export to CSV
        </CSVLink>
      </div>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Batch</th>
            <th>Profession</th>
            <th>Educational Background</th>
            <th>Photo</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.fullName}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.email}</td>
              <td>{user.batch}</td>
              <td>{user.profession}</td>
              <td>{user.education}</td>
              <td>
                {user.photoUrl ? (
                  <img src={user.photoUrl} alt="User" style={{ width: '100px', height: 'auto' }} />
                ) : (
                  'No Photo'
                )}
              </td>
              <td>
                <select
                  className="form-select"
                  value={user.paymentStatus || 'Unpaid'}
                  onChange={(e) => handlePaymentStatusChange(user.id, e.target.value)}
                >
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => openDeleteConfirmation(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteConfirmationModal
        show={showModal}
        onHide={handleModalClose}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default UserTable;
