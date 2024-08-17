// // src/Header.js
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Header = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear any authentication tokens or user data here if applicable
//     // For example, localStorage.removeItem('authToken');
    
//     // Redirect to the login page
//     navigate('/');
//   };

//   return (
//     <header className="bg-primary text-white p-3">
//       <div className="container d-flex justify-content-between align-items-center">
//         <div>
//           {/* <h1>My Application</h1>
//           <p>Welcome to the dashboard</p> */}
//         </div>
//         <button className="btn btn-light" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;




// src/Header.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase'; // Ensure you have this import
import { collection, getCountFromServer } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const notificationsRef = collection(db, 'notifications');
        const snapshot = await getCountFromServer(notificationsRef);
        setNotificationCount(snapshot.data().count || 0);
      } catch (error) {
        console.error('Error fetching notifications: ', error);
      }
    };

    fetchNotificationCount();
  }, []);

  const handleLogout = () => {
    // Clear any authentication tokens or user data here if applicable
    // For example, localStorage.removeItem('authToken');
    
    // Redirect to the login page
    navigate('/');
  };

  return (
    <header className="bg-primary text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          {/* <h1>My Application</h1>
          <p>Welcome to the dashboard</p> */}
        </div>
        <div className="d-flex align-items-center">
          <span className="me-3">
            Notifications: {notificationCount}
          </span>
          <button className="btn btn-light" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
