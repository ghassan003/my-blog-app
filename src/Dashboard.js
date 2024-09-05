// // import React, { useState, useEffect } from 'react';
// // import { collection, getDocs } from 'firebase/firestore';
// // import { db } from './firebase';
// // import './Dashboard.css'; // Import the CSS file for styling
// // import SideNav from './SideNav';
// // import CountdownLoader from './CountdownLoader'; // Import the CountdownLoader component
// // import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// // const Dashboard = () => {
// //   const [totalPosts, setTotalPosts] = useState(0);
// //   const [totalUsers, setTotalUsers] = useState(0);
// //   const [paidUsers, setPaidUsers] = useState(0);
// //   const [unpaidUsers, setUnpaidUsers] = useState(0);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       setLoading(true); // Set loading to true before starting data fetch
// //       try {
// //         // Fetch total posts
// //         const postsSnapshot = await getDocs(collection(db, 'blogPosts'));
// //         setTotalPosts(postsSnapshot.size);

// //         // Fetch users data
// //         const usersSnapshot = await getDocs(collection(db, 'users'));
// //         const usersList = usersSnapshot.docs.map((doc) => doc.data());

// //         setTotalUsers(usersList.length);

// //         const paidCount = usersList.filter(user => user.paymentStatus === 'Paid').length;
// //         const unpaidCount = usersList.length - paidCount;

// //         setPaidUsers(paidCount);
// //         setUnpaidUsers(unpaidCount);
// //       } catch (error) {
// //         console.error('Error fetching data:', error);
// //         setError('Failed to load data. Please try again later.');
// //       } finally {
// //         setLoading(false); // Set loading to false after data fetch
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   if (loading) {
// //     return <CountdownLoader />;
// //   }

// //   if (error) {
// //     return <div className="alert alert-danger" role="alert">{error}</div>;
// //   }

// //   return (
// //     <div className="d-flex">
// //       <SideNav />
// //       <div className="content-wrapper">
// //         <div className="container mt-5">
// //           {/* <h2>Dashboard</h2> */}
// //           <div className="row">
// //             {/* Consolidated Card */}
// //             <div className="col-lg-12 mb-4">
// //               <div className="card border-dark">
// //                 <div className="card-header bg-primary text-white">
// //                   <h5 className="card-title mb-0">Dashboard Overview</h5>
// //                 </div>
// //                 <div className="card-body bg-white">
// //                   <div className="row">
// //                     {/* Card for Total Posts */}
// //                     <div className="col-lg-3 col-md-6 mb-4">
                  
// //                     <div className="card border-dark">
// //                         <div className="card-body">
// //                           <h6 className="card-subtitle mb-2 text-muted">Total Posts</h6>
// //                           <p className="card-text">{totalPosts}</p>
// //                         </div>
// //                       </div>
// //                       </div>
                    
// //                     {/* Card for Total Users */}
// //                     <div className="col-lg-3 col-md-6 mb-4">
               
// //                       <div className="card border-dark">
// //                         <div className="card-body">
// //                           <h6 className="card-subtitle mb-2 text-muted">Total Users</h6>
// //                           <p className="card-text">{totalUsers}</p>
// //                         </div>
// //                       </div>
// //                     </div>
               
// //                     {/* Card for Paid and Unpaid Users */}
// //                     <div className="col-lg-4 mb-4">
// //                     <div className="card border-dark">
// //                         <div className="card-body">
                     
// //                           <h6 className="card-subtitle mb-2 text-muted">User Payment Status</h6>
// //                           <div className="row">
// //                             <div className="col-12 col-md-6 mb-3">
// //                               <div className="card bg-success text-white">
// //                                 <div className="card-body">
// //                                   <h6 className="card-subtitle mb-2">Paid Users</h6>
// //                                   <p className="card-text">{paidUsers}</p>
// //                                 </div>
// //                               </div>
// //                             </div>
// //                             <div className="col-12 col-md-6 mb-3">
// //                               <div className="card bg-danger text-white">
// //                                 <div className="card-body">
// //                                   <h6 className="card-subtitle mb-2">Unpaid Users</h6>
// //                                   <p className="card-text">{unpaidUsers}</p>
// //                                 </div>
// //                               </div>
// //                             </div>
                      
// //                         </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;



import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import './Dashboard.css'; // Import the CSS file for styling
import SideNav from './SideNav';
import CountdownLoader from './CountdownLoader'; // Import the CountdownLoader component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Dashboard = () => {
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [paidUsers, setPaidUsers] = useState(0);
  const [unpaidUsers, setUnpaidUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before starting data fetch
      try {
        // Fetch total posts
        const postsSnapshot = await getDocs(collection(db, 'blogPosts'));
        setTotalPosts(postsSnapshot.size);

        // Fetch users data
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersList = usersSnapshot.docs.map((doc) => doc.data());

        setTotalUsers(usersList.length);

        const paidCount = usersList.filter(user => user.paymentStatus === 'Paid').length;
        const unpaidCount = usersList.length - paidCount;

        setPaidUsers(paidCount);
        setUnpaidUsers(unpaidCount);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <CountdownLoader />;
  }

  if (error) {
    return <div className="alert alert-danger" role="alert">{error}</div>;
  }

  return (
    <div className="d-flex">
      <SideNav />
      <div className="content-wrapper">
        <div className="container mt-5">
          <div className="row">
            {/* Consolidated Card */}
            <div className="col-lg-12 mb-4">
              <div className="card border-dark">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">Dashboard Overview</h5>
                </div>
                <div className="card-body bg-white">
                  <div className="row">
                    <DashboardCard title="Total Member" value={totalPosts} />
                    <DashboardCard title="Total Member" value={totalUsers} />
                    <DashboardCard title="Paid Member" value={paidUsers} bgClass="bg-success" />
                    <DashboardCard title="Unpaid Member" value={unpaidUsers} bgClass="bg-danger" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, bgClass = "bg-white" }) => (
  <div className="col-lg-3 col-md-6 mb-4">
    <div className={`card border-dark ${bgClass}`}>
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-muted">{title}</h6>
        <p className="card-text">{value}</p>
      </div>
    </div>
  </div>
);

export default Dashboard;



