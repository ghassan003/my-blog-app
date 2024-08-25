// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import BlogPage from './BlogPage'; // Import BlogPage
// import UserPage from './UserPage'; // Import UserPage
// import UserTable from './UserTable'; // Import UserTable
// import AddUserForm from './AddUserForm'; // Import AddUserForm
// import EditUser from './EditUser'; // Import EditUser
// import PaymentConfirmationPage from './PaymentConfirmationPage'; // Import PaymentConfirmationPage
// import LoginPage from './LoginPage'; // Import LoginPage
// import Dashboard from './Dashboard'; // Import Dashboard

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage />} /> {/* Default route for login */}
//         <Route path="/dashboard" element={<Dashboard />} /> {/* Protected dashboard route */}
//         <Route path="/user" element={<UserPage />} /> {/* Route for UserPage */}
//         <Route path="/user-table" element={<UserTable />} /> {/* Route for UserTable */}
//         <Route path="/add-user" element={<AddUserForm />} /> {/* Route for AddUserForm */}
//         <Route path="/edit-user/:id" element={<EditUser />} /> {/* Route for EditUser */}
//         <Route path="/payment-confirmation" element={<PaymentConfirmationPage />} /> {/* Route for PaymentConfirmationPage */}
//         <Route path="/blog" element={<BlogPage />} /> {/* Route for BlogPage */}
//       </Routes>
//     </Router>
//   );
// };// src/App.js

// src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import BlogPage from './BlogPage';
// import UserPage from './UserPage';
// import UserTable from './UserTable';
// import AddUserForm from './AddUserForm';
// import EditUser from './EditUser';
// import PaymentConfirmationPage from './PaymentConfirmationPage';
// import LoginPage from './LoginPage';
// import Dashboard from './Dashboard';
// import Setup from './Setup'; // Import the Setup component
// import PrivateRoute from './PrivateRoute';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
//         <Route path="/user" element={<PrivateRoute element={<UserPage />} />} />
//         <Route path="/user-table" element={<PrivateRoute element={<UserTable />} />} />
//         <Route path="/add-user" element={<PrivateRoute element={<AddUserForm />} />} />
//         <Route path="/edit-user/:id" element={<PrivateRoute element={<EditUser />} />} />
//         <Route path="/payment-confirmation" element={<PrivateRoute element={<PaymentConfirmationPage />} />} />
//         <Route path="/blog" element={<PrivateRoute element={<BlogPage />} />} />
//         <Route path="/setup" element={<Setup />} /> {/* Setup route */}
//               </Routes>
//     </Router>
//   );
// };

// export default App;

//////////////////////////////////////////Login page//////////////////////////////
  // // src/App.js
  // import React from 'react';
  // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
  // import BlogPage from './BlogPage';
  // import UserPage from './UserPage';
  // import UserTable from './UserTable';
  // import AddUserForm from './AddUserForm';
  // import EditUser from './EditUser';
  // import PaymentConfirmationPage from './PaymentConfirmationPage';
  // import Dashboard from './Dashboard';
  // import Setup from './Setup'; // Import the Setup component
  // import LoginPage from './LoginPage'; // Import LoginPage
  // import PrivateRoute from './PrivateRoute';

  // const App = () => {
  //   return (
  //     <Router>
  //       <Routes>
  //         {/* Commented out the LoginPage route */}
  //         <Route path="/" element={<LoginPage />} />

  //         {/* Redirect root path to dashboard */}
  //         {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
          
  //         <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
  //         <Route path="/user" element={<PrivateRoute element={<UserPage />} />} />
  //         <Route path="/user-table" element={<PrivateRoute element={<UserTable />} />} />
  //         <Route path="/add-user" element={<PrivateRoute element={<AddUserForm />} />} />
  //         <Route path="/edit-user/:id" element={<PrivateRoute element={<EditUser />} />} />
  //         <Route path="/payment-confirmation" element={<PrivateRoute element={<PaymentConfirmationPage />} />} />
  //         <Route path="/blog" element={<PrivateRoute element={<BlogPage />} />} />
  //         <Route path="/setup" element={<Setup />} /> {/* Setup route */}
  //       </Routes>
  //     </Router>
  //   );
  // };

  // export default App;


  /////////////////////////Push notifiacation//////////////////////////////////////
  // src/App.js
  // src/App.js
// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogPage from './BlogPage';
import UserPage from './UserPage';
import UserTable from './UserTable';
import AddUserForm from './AddUserForm';
import EditUser from './EditUser';
import PaymentConfirmationPage from './PaymentConfirmationPage';
import Dashboard from './Dashboard';
import Setup from './Setup';
import LoginPage from './LoginPage';
import PrivateRoute from './PrivateRoute';
import NotificationForm from './NotificationForm'; // Import the NotificationForm component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/user" element={<PrivateRoute element={<UserPage />} />} />
        <Route path="/user-table" element={<PrivateRoute element={<UserTable />} />} />
        <Route path="/add-user" element={<PrivateRoute element={<AddUserForm />} />} />
        <Route path="/edit-user/:id" element={<PrivateRoute element={<EditUser />} />} />
        <Route path="/payment-confirmation" element={<PrivateRoute element={<PaymentConfirmationPage />} />} />
        <Route path="/blog" element={<PrivateRoute element={<BlogPage />} />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/notification" element={<NotificationForm />} /> {/* Add the NotificationForm route */}
      </Routes>
    </Router>
  );
};

export default App;
