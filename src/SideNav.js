// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import './SideNav.css'; // Ensure CSS is imported
// import 'bootstrap-icons/font/bootstrap-icons.css';

// const SideNav = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const location = useLocation();
//   const navigate = useNavigate(); // Hook for navigation

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleLogout = () => {
//     // Clear any authentication tokens or user data here
//     // For example, localStorage.removeItem('authToken');

//     // Redirect to the login page
//     navigate('/');
//   };

//   return (
//     <>
//       <button
//         className="btn btn-toggle d-md-none"
//         onClick={toggleSidebar}
//       >
//         {isOpen ? 'Close' : 'Open'}
//       </button>
//       <div
//         className={`bg-light border-end ${isOpen ? 'show' : ''}`}
//         id="sidebar-wrapper"
//       >
//         <div className="sidebar-heading">My Blog</div>
//         <div className="list-group list-group-flush">
//           <Link
//             to="/dashboard"
//             className={`list-group-item list-group-item-action ${location.pathname === '/dashboard' ? 'active' : ''}`}
//           >
//             <i className="bi bi-house me-2"></i>
//             Dashboard
//           </Link>
//           <Link
//             to="/user"
//             className={`list-group-item list-group-item-action ${location.pathname === '/user' ? 'active' : ''}`}
//           >
//             <i className="bi bi-person me-2"></i>
//             Member Management
//           </Link>
//           <Link
//             to="/blog"
//             className={`list-group-item list-group-item-action ${location.pathname === '/blog' ? 'active' : ''}`}
//           >
//             <i className="bi bi-file-earmark-text me-2"></i>
//             View All Posts
//           </Link>
//           <Link
//             to="/payment-confirmation"
//             className={`list-group-item list-group-item-action ${location.pathname === '/payment-confirmation' ? 'active' : ''}`}
//           >
//             <i className="bi bi-credit-card me-2"></i>
//             View Payment Confirmation
//           </Link>
//           <Link
//             to="/setup"
//             className={`list-group-item list-group-item-action ${location.pathname === '/setup' ? 'active' : ''}`}
//           >
//             <i className="bi bi-gear me-2"></i>
//             Setup
//           </Link>

//           {/* New "User Management" Button */}
//           <Link
//             to="/user-management"
//             className={`list-group-item list-group-item-action ${location.pathname === '/user-management' ? 'active' : ''}`}
//           >
//             <i className="bi bi-people me-2"></i>
//             User Management
//           </Link>

//           {/* Logout Button */}
//           <button
//             className="list-group-item list-group-item-action"
//             onClick={handleLogout}
//           >
//             <i className="bi bi-box-arrow-right me-2"></i>
//             Logout
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SideNav;

// import React, { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import './SideNav.css'; // Ensure CSS is imported
// import 'bootstrap-icons/font/bootstrap-icons.css';

// const SideNav = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [role, setRole] = useState(null); // State to store the user's role
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Fetch the role from localStorage when the component mounts
//   useEffect(() => {
//     const userData = localStorage.getItem('user');
//     if (userData) {
//       const parsedData = JSON.parse(userData);
//       setRole(parsedData.role); // Set role from localStorage
//     }
//   }, []);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleLogout = () => {
//     // Clear the user session
//     localStorage.removeItem('user');
//     navigate('/');
//   };

//   return (
//     <>
//       <button className="btn btn-toggle d-md-none" onClick={toggleSidebar}>
//         {isOpen ? 'Close' : 'Open'}
//       </button>
//       <div className={`bg-light border-end ${isOpen ? 'show' : ''}`} id="sidebar-wrapper">
//         <div className="sidebar-heading">My Blog</div>
//         <div className="list-group list-group-flush">

//           {/* Dashboard and Member Management are only shown to 'admin' */}
//           {role === 'admin' && (
//             <>
//               <Link
//                 to="/dashboard"
//                 className={`list-group-item list-group-item-action ${
//                   location.pathname === '/dashboard' ? 'active' : ''
//                 }`}
//               >
//                 <i className="bi bi-house me-2"></i>
//                 Dashboard
//               </Link>

//               <Link
//                 to="/user"
//                 className={`list-group-item list-group-item-action ${
//                   location.pathname === '/user' ? 'active' : ''
//                 }`}
//               >
//                 <i className="bi bi-person me-2"></i>
//                 Member Management
//               </Link>

//               <Link
//                 to="/user-management"
//                 className={`list-group-item list-group-item-action ${
//                   location.pathname === '/user-management' ? 'active' : ''
//                 }`}
//               >
//                 <i className="bi bi-people me-2"></i>
//                 User Management
//               </Link>

//             </>
//           )}

//           {/* The "View All Posts" button is available to all roles */}
//           <Link
//             to="/blog"
//             className={`list-group-item list-group-item-action ${
//               location.pathname === '/blog' ? 'active' : ''
//             }`}
//           >
//             <i className="bi bi-file-earmark-text me-2"></i>
//             View All Posts
//           </Link>

//           {/* Payment Confirmation and Setup are only shown to 'admin' */}
//           {role === 'admin' && (
//             <>
//               <Link
//                 to="/payment-confirmation"
//                 className={`list-group-item list-group-item-action ${
//                   location.pathname === '/payment-confirmation' ? 'active' : ''
//                 }`}
//               >
//                 <i className="bi bi-credit-card me-2"></i>
//                 View Payment Confirmation
//               </Link>

//               <Link
//                 to="/setup"
//                 className={`list-group-item list-group-item-action ${
//                   location.pathname === '/setup' ? 'active' : ''
//                 }`}
//               >
//                 <i className="bi bi-gear me-2"></i>
//                 Setup
//               </Link>

//               <Link
//                 to="/user-management"
//                 className={`list-group-item list-group-item-action ${
//                   location.pathname === '/user-management' ? 'active' : ''
//                 }`}
//               >
//                 <i className="bi bi-people me-2"></i>
//                 User Management
//               </Link>
//             </>
//           )}

//           {/* Logout Button */}
//           <button className="list-group-item list-group-item-action" onClick={handleLogout}>
//             <i className="bi bi-box-arrow-right me-2"></i>
//             Logout
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SideNav;

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SideNav.css"; // Ensure CSS is imported
import "bootstrap-icons/font/bootstrap-icons.css";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [role, setRole] = useState(null); // State to store the user's role
  const [email, setEmail] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Fetch the role from localStorage when the component mounts
  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log("localStorage content in SideNav:", localStorage);
    if (userData) {
      const parsedData = JSON.parse(userData);
      console.log("Parsed user data:", parsedData);
      setRole(parsedData.role); // Set role from localStorage
      setEmail(parsedData.username); // Set role from localStorage
    } else {
      console.log("No user data found in localStorage");
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear the user session
    localStorage.removeItem("user");
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <button className="btn btn-toggle d-md-none" onClick={toggleSidebar}>
        {isOpen ? "Close" : "Open"}
      </button>
      <div
        className={`bg-light border-end ${isOpen ? "show" : ""}`}
        id="sidebar-wrapper"
      >
        <div className="sidebar-heading">My Blog</div>
        <div className="list-group list-group-flush">
          {/* Dashboard and Member Management are only shown to 'admin' */}
          {role === "Admin" && (
            <>
              <Link
                to="/dashboard"
                className={`list-group-item list-group-item-action ${
                  location.pathname === "/dashboard" ? "active" : ""
                }`}
              >
                <i className="bi bi-house me-2"></i>
                Dashboard
              </Link>

              <Link
                to="/user"
                className={`list-group-item list-group-item-action ${
                  location.pathname === "/user" ? "active" : ""
                }`}
              >
                <i className="bi bi-person me-2"></i>
                Member Management
              </Link>

              <Link
                to="/user-management"
                className={`list-group-item list-group-item-action ${
                  location.pathname === "/user-management" ? "active" : ""
                }`}
              >
                <i className="bi bi-people me-2"></i>
                User Management
              </Link>

              {/* Add the Job Management button here */}
              <Link
                to="/job-management"
                className={`list-group-item list-group-item-action ${
                  location.pathname === "/job-management" ? "active" : ""
                }`}
              >
                <i className="bi bi-briefcase me-2"></i>
                Job Management
              </Link>

              <Link
                to="/blog"
                className={`list-group-item list-group-item-action ${
                  location.pathname === "/blog" ? "active" : ""
                }`}
              >
                <i className="bi bi-file-earmark-text me-2"></i>
                View All Posts
              </Link>

              <Link
                to="/setup"
                className={`list-group-item list-group-item-action ${
                  location.pathname === "/setup" ? "active" : ""
                }`}
              >
                <i className="bi bi-gear me-2"></i>
                Setup
              </Link>

              <Link
                to="/payment-confirmation"
                className={`list-group-item list-group-item-action ${
                  location.pathname === "/payment-confirmation" ? "active" : ""
                }`}
              >
                <i className="bi bi-credit-card me-2"></i>
                View Payment Confirmation
              </Link>
            </>
          )}

          {/* Payment Confirmation and Setup are only shown to 'admin' */}
          {role === "Payment Checker" && (
            <>
              <Link
                to="/payment-confirmation"
                className={`list-group-item list-group-item-action ${
                  location.pathname === "/payment-confirmation" ? "active" : ""
                }`}
              >
                <i className="bi bi-credit-card me-2"></i>
                View Payment Confirmation
              </Link>
            </>
          )}

          {role === "Blog Writer" && (
            <>
              <Link
                to="/blog"
                className={`list-group-item list-group-item-action ${
                  location.pathname === "/blog" ? "active" : ""
                }`}
              >
                <i className="bi bi-file-earmark-text me-2"></i>
                View All Posts
              </Link>
            </>
          )}

          <Link
            to="/push-notfication"
            className={`list-group-item list-group-item-action ${
              location.pathname === "/push-notfication" ? "active" : ""
            }`}
          >
            <i className="bi bi-file-earmark-text me-2"></i>
            Push Notfication
          </Link>

          {/* Logout Button */}
          <button
            className="list-group-item list-group-item-action"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Logout
          </button>
        </div>
        <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
          <p style={{ textAlign: "center", fontWeight: "bold" }}>{email}</p>
        </div>
      </div>
    </>
  );
};

export default SideNav;
