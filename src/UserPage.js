// import React, { useState, useEffect } from 'react';
// import SideNav from './SideNav';
// import UserTable from './UserTable'; // Import UserTable
// import CountdownLoader from './CountdownLoader'; // Import CountdownLoader
// import { Card } from 'react-bootstrap'; // Import Card component from React-Bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
// import './UserPage.css'; // Ensure you have a CSS file for styling

// const UserPage = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate data fetch with a timeout
//     const timer = setTimeout(() => {
//       setLoading(false); // Set loading to false after data fetch is complete
//     }, 3000); // Adjust the timeout duration to match your data fetching time

//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return <CountdownLoader />;
//   }

//   return (
//     <div className="app-container d-flex">
//       <SideNav />
//       <div className="main-content flex-grow-1 p-3">
//         <div className="container mt-6">
         
//           <Card className="mb-4">
//             <Card.Header as="h5" className="bg-primary text-white font-weight-bold">
//         {    <h2 className="text-center mb-4">Member Management</h2>  }          </Card.Header>
//             <Card.Body>
//               <div className="table-responsive">


                
//                 <UserTable /> {/* Render the UserTable component */}
//               </div>
//             </Card.Body>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserPage;



// import React, { useState } from 'react';
// import { Card, Offcanvas, Button } from 'react-bootstrap';
// import SideNav from './SideNav';
// import UserTable from './UserTable';

// function AppContainer() {
//   const [showSidebar, setShowSidebar] = useState(false);

//   const handleSidebarToggle = () => setShowSidebar(!showSidebar);

//   return (
//     <div className="app-container">
//       {/* Sidebar for larger screens */}
//       <div className="d-none d-md-block sidebar">
//         <SideNav />
//       </div>

//       {/* Collapsible Sidebar for smaller screens */}
//       <Offcanvas show={showSidebar} onHide={handleSidebarToggle} className="d-md-none">
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>Menu</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           <SideNav />
//         </Offcanvas.Body>
//       </Offcanvas>

//       {/* Toggle Button for Sidebar on mobile */}
//       <Button 
//         variant="primary" 
//         className="d-md-none mb-2" 
//         onClick={handleSidebarToggle}
//         style={{ position: 'fixed', top: '1rem', left: '1rem', zIndex: '1040' }}
//       >
        
//       </Button>

//       {/* Main Content */}
//       <div className="main-content flex-grow-1 p-3">
//         <div className="app-container fluid mt-10">
//           <Card className="mb-4">
//             <Card.Header as="h5" className="bg-primary text-white font-weight-bold">
//               <h2 className="text-center mb-4">Member Management</h2>
//             </Card.Header>
//             <Card.Body>
//               <div className="table-responsive">
//                 <UserTable />
//               </div>
//             </Card.Body>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AppContainer;



import React, { } from 'react';
import { Card, Container} from 'react-bootstrap';
import SideNav from './SideNav';
import UserTable from './UserTable';

function AppContainer() {

  
  return (




    <div className="d-flex">
    {/* Side Navigation */}
    <div className="sidebar-wrapper">
      <SideNav />
    </div>
    
    {/* Main Content */}
    <div className="main-content flex-grow-1">
      <Container className="mt-6">

      <Card className="mb-4 shadow-sm">
            <Card.Header as="h5" className="bg-primary text-white">
              <h2 className="text-center mb-0">Member Management</h2>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <UserTable />
              </div>
            </Card.Body>
          </Card>


      </Container>
    </div>
  </div>








  );
}

export default AppContainer;