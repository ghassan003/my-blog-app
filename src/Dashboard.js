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
          <h2>Dashboard</h2>
          <div className="row">
            {/* Card for Total Posts */}
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Posts</h5>
                  <p className="card-text">{totalPosts}</p>
                </div>
              </div>
            </div>
            {/* Card for Total Users */}
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Users</h5>
                  <p className="card-text">{totalUsers}</p>
                </div>
              </div>
            </div>
            {/* Card for Paid and Unpaid Users */}
            <div className="col-lg-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">User Payment Status</h5>
                  <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                      <div className="card bg-success text-white">
                        <div className="card-body">
                          <h5 className="card-title">Paid Users</h5>
                          <p className="card-text">{paidUsers}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <div className="card bg-danger text-white">
                        <div className="card-body">
                          <h5 className="card-title">Unpaid Users</h5>
                          <p className="card-text">{unpaidUsers}</p>
                        </div>
                      </div>
                    </div>
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

export default Dashboard;
