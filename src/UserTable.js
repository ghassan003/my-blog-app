import React, { useState, useEffect, useCallback } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

import { toast } from "react-toastify";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import * as XLSX from "xlsx";
import { CSVLink } from "react-csv";
import "./UserTable.css"; // Import the CSS file
import {sendPushNotification} from '../src/firebase/firebase.js'
const UserTable = ({ compType }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Filter states
  const [batchFilter, setBatchFilter] = useState("");
  const [professionFilter, setProfessionFilter] = useState("");
  const [educationFilter, setEducationFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // Generate batch options
  const currentYear = new Date().getFullYear();
  const batchOptions = [];
  for (let year = 1997; year <= currentYear; year++) {
    batchOptions.push(year);
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
        setFilteredUsers(usersList);
      } catch (error) {
        toast.error("Error fetching users: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // const handleDelete = async () => {
  //   if (selectedUserId) {
  //     try {
  //       await deleteDoc(doc(db, 'users', selectedUserId));
  //       setUsers(users.filter((user) => user.id !== selectedUserId));
  //       setFilteredUsers(filteredUsers.filter((user) => user.id !== selectedUserId));
  //       toast.success('User deleted successfully');
  //       setShowModal(false);
  //     } catch (error) {
  //       toast.error('Error deleting user: ' + error.message);
  //     }
  //   }
  // };

  const handleDelete = async () => {
    if (selectedUserId) {
      try {
        await deleteDoc(doc(db, "users", selectedUserId)); // Await the deletion operation
        setUsers(users.filter((user) => user.id !== selectedUserId));
        setFilteredUsers(
          filteredUsers.filter((user) => user.id !== selectedUserId)
        );
        toast.success("User deleted successfully");
        setShowModal(false);
      } catch (error) {
        toast.error("Error deleting user: " + error.message);
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
      await updateDoc(doc(db, "users", id), { paymentStatus: newStatus });
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, paymentStatus: newStatus } : user
        )
      );
      toast.success("Payment status updated successfully");
    } catch (error) {
      toast.error("Error updating payment status: " + error.message);
    }
  };

  // Filter function
  const applyFilters = useCallback(() => {
    const filtered = users.filter(
      (user) =>
        (batchFilter ? user.batch === batchFilter : true) &&
        (professionFilter ? user.profession === professionFilter : true) &&
        (educationFilter ? user.education === educationFilter : true) &&
        (emailFilter
          ? user.email.toLowerCase().includes(emailFilter.toLowerCase())
          : true) &&
        (phoneFilter ? user.phoneNumber.includes(phoneFilter) : true)
    );
    setFilteredUsers(filtered);
  }, [
    users,
    batchFilter,
    professionFilter,
    educationFilter,
    emailFilter,
    phoneFilter,
  ]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredUsers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "UsersData.xlsx");
  };

  async function sendNotification() {
    if (!title || !description) return;
    await fetch('https://token-generator-production.up.railway.app/').then((response)=>response.json()).then(async(response)=>{
      console.log(response)
      const accessToken =response
      const querySnapshot = await getDocs(collection(db, "pushUsers"));
      querySnapshot.docs.forEach((doc) =>{
       console.log(doc.data().userToken)
       const userToken = doc.data().userToken
       sendPushNotification(accessToken, userToken, title, description)
      });
      
    }).catch((error)=>console.log(error))
  }

  // CSV headers
  const csvHeaders = [
    { label: "Full Name", key: "fullName" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "Email", key: "email" },
    { label: "Batch", key: "batch" },
    { label: "Profession", key: "profession" },
    { label: "Educational Background", key: "education" },
    { label: "Payment Status", key: "paymentStatus" },
  ];

  if (loading) return <p>Loading...</p>;

  return (
    <div className="table-container">
      <div className="box-container p-3 mb-3 border rounded bg-light">
        <div className="row align-items-center">
          <div className="col-md-12">
            <div className="filters row">
              <div className="filter-group col-md-4">
                <label>
                  <strong>Batch:</strong>
                </label>
                <select
                  className="form-select"
                  value={batchFilter}
                  onChange={(e) => setBatchFilter(e.target.value)}
                >
                  <option value="">All</option>
                  {batchOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-group col-md-4">
                <label>
                  <strong>Profession:</strong>
                </label>
                <select
                  className="form-select"
                  value={professionFilter}
                  onChange={(e) => setProfessionFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Government Employee">
                    Government Employee
                  </option>
                  <option value="Private Sector">Private Sector</option>
                  <option value="Merchant">Merchant</option>
                  <option value="Job seeker">Job seeker</option>
                </select>
              </div>
              <div className="filter-group col-md-4">
                <label>
                  <strong>Educational Background:</strong>
                </label>
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
              {compType !== "push-not" && (
                <div className="filter-group col-md-4">
                  <label>
                    <strong>Email:</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={emailFilter}
                    onChange={(e) => setEmailFilter(e.target.value)}
                    placeholder="Enter email"
                  />
                </div>
              )}
              {compType !== "push-not" && (
                <div className="filter-group col-md-4">
                  <label>
                    <strong>Phone Number:</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={phoneFilter}
                    onChange={(e) => setPhoneFilter(e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
              )}
            </div>
          </div>

          {compType !== "push-not" && (
            <div>
              <div className="col-md-3">
                <div className="user-count">
                  <h5>Total Member: {users.length}</h5>
                  <h5>Filtered Member: {filteredUsers.length}</h5>
                </div>
              </div>
              <div className="col-md-3 d-flex justify-content-end">
                <button
                  className="btn btn-success me-2"
                  onClick={exportToExcel}
                >
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
            </div>
          )}
        </div>
      </div>
      <div className="table-wrapper">
        {compType === "push-not" && (
          <div className="row p-3">
            <div className="filter-group col-md-4">
              <label>
                <strong>Title:</strong>
              </label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
              />
            </div>

            <div
              className="filter-group col-md-7"
              style={{ marginLeft: "9px" }}
            >
              <label>
                <strong>Description:</strong>
              </label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
              />
            </div>
            <button
              className="btn btn-success col-md-3"
              onClick={sendNotification}
            >
              Send
            </button>
          </div>
        )}

        <table className="table table-striped table-bordered">
          <thead className="bg-primary text-white">
            <tr>
              <th>Full Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Batch</th>
              <th>Profession</th>
              <th>Educational Background</th>
              {compType !== "push-not" && <th>Photo</th>}
              {compType !== "push-not" && <th>Payment Status</th>}
              {compType !== "push-not" && <th>Actions</th>}
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
                  {user.photo && (
                    <img
                      src={user.photo}
                      alt="User"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </td>
                {compType !== "push-not" && (
                  <td>
                    <select
                      className="form-select"
                      value={user.paymentStatus}
                      onChange={(e) =>
                        handlePaymentStatusChange(user.id, e.target.value)
                      }
                    >
                      <option value="Paid">Paid</option>
                      <option value="Unpaid">Unpaid</option>
                    </select>
                  </td>
                )}
                {compType !== "push-not" && (
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => openDeleteConfirmation(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteConfirmationModal
        show={showModal}
        handleClose={handleModalClose}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default UserTable;
