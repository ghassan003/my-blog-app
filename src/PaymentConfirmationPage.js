// // src/components/PaymentConfirmationPage.js
// import React, { useEffect, useState } from 'react';
// // import { collection, getDocs } from 'firebase/firestore';

// import './PaymentConfirmationPage.css'; // Import the CSS file


// import SideNav from './SideNav'; // Adjust the path as needed


// import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
// import { db } from './firebase';

// const PaymentConfirmationPage = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Filter states
//   const [bankNameFilter, setBankNameFilter] = useState('');
//   const [emailFilter, setEmailFilter] = useState('');
//   const [mobileNumberFilter, setMobileNumberFilter] = useState('');

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'payments'));
//         const today = new Date();

//         const paymentData = await Promise.all(
//           querySnapshot.docs.map(async (docSnapshot) => {
//             const payment = {
//               id: docSnapshot.id,
//               ...docSnapshot.data(),
//             };

//             const endDate = payment.endDate ? payment.endDate.toDate() : null;

//             if (endDate && endDate < today) {
//               payment.paymentStatus = 'EXPIRED';
//               await updateDoc(doc(db, 'payments', payment.id), {
//                 paymentStatus: 'EXPIRED',
//               });
//             } else if (endDate && endDate >= today) {
//               payment.paymentStatus = 'PAID';
//               await updateDoc(doc(db, 'payments', payment.id), {
//                 paymentStatus: 'PAID',
//               });
//             }

//             return payment;
//           })
//         );

//         setPayments(paymentData);
//       } catch (error) {
//         console.error('Error fetching payments: ', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayments();
//   }, []);

//   const formatDate = (timestamp) => {
//     if (!timestamp || !timestamp.seconds) return '';
//     const date = new Date(timestamp.seconds * 1000);
//     return date.toLocaleDateString();
//   };

//   // Filter logic
//   const filteredPayments = payments.filter((payment) => {
//     return (
//       payment.bankName.toLowerCase().includes(bankNameFilter.toLowerCase()) &&
//       payment.email.toLowerCase().includes(emailFilter.toLowerCase()) &&
//       payment.mobileNumber.includes(mobileNumberFilter)
//     );
//   });

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mt-5">
//       <h2>Payment Confirmation Details</h2>
//       <SideNav /> {/* Render the SideNav component */}

//       {/* Filter Inputs */}
//       <div className="filters mb-3">
//         <input
//           type="text"
//           placeholder="Filter by Bank Name"
//           value={bankNameFilter}
//           onChange={(e) => setBankNameFilter(e.target.value)}
//           className="form-control mb-2"
//         />
//         <input
//           type="text"
//           placeholder="Filter by Email"
//           value={emailFilter}
//           onChange={(e) => setEmailFilter(e.target.value)}
//           className="form-control mb-2"
//         />
//         <input
//           type="text"
//           placeholder="Filter by Mobile Number"
//           value={mobileNumberFilter}
//           onChange={(e) => setMobileNumberFilter(e.target.value)}
//           className="form-control mb-2"
//         />
//       </div>

//       <table className="custom-table table table-striped">
//         <thead>
//           <tr>
//             <th>Email</th>
//             <th>Mobile Number</th>
//             <th>Bank Name</th>
//             <th>Deposited By</th>
//             <th>Transaction Reference Number</th>
//             <th>Date</th>
//             <th>End Date</th>
//             <th>Package</th>
//             <th>Amount</th>
//             <th>Payment Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredPayments.map((payment) => (
//             <tr key={payment.id}>
//               <td>{payment.email}</td>
//               <td>{payment.mobileNumber}</td>
//               <td>{payment.bankName}</td>
//               <td>{payment.depositedBy}</td>
//               <td>{payment.transactionRef}</td>
//               <td>{payment.date}</td>
//               <td>{formatDate(payment.endDate)}</td>
//               <td>{payment.package}</td>
//               <td>{payment.amount}</td>
//               <td>{payment.paymentStatus}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PaymentConfirmationPage;


import React, { useState, useEffect } from 'react';
import SideNav from './SideNav';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PaymentConfirmationPage.css'; // Ensure you have a CSS file for styling

const PaymentConfirmationPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'payments'));
        const today = new Date();

        const paymentData = await Promise.all(
          querySnapshot.docs.map(async (docSnapshot) => {
            const payment = {
              id: docSnapshot.id,
              ...docSnapshot.data(),
            };

            const endDate = payment.endDate ? payment.endDate.toDate() : null;

            if (endDate && endDate < today) {
              payment.paymentStatus = 'EXPIRED';
              await updateDoc(doc(db, 'payments', payment.id), {
                paymentStatus: 'EXPIRED',
              });
            } else if (endDate && endDate >= today) {
              payment.paymentStatus = 'PAID';
              await updateDoc(doc(db, 'payments', payment.id), {
                paymentStatus: 'PAID',
              });
            }

            return payment;
          })
        );

        setPayments(paymentData);
      } catch (error) {
        console.error('Error fetching payments: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.seconds) return '';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  return (
    <div className="app-container d-flex">
      <SideNav />
      <div className="main-content flex-grow-1 p-3">
        <div className="container mt-6">
          <Card className="mb-4">
            <Card.Header as="h5" className="bg-primary text-white font-weight-bold">
              <h2 className="text-center mb-4">Payment Confirmation Details</h2>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="custom-table table table-striped">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Mobile Number</th>
                      <th>Bank Name</th>
                      <th>Deposited By</th>
                      <th>Transaction Reference Number</th>
                      <th>Date</th>
                      <th>End Date</th>
                      <th>Package</th>
                      <th>Amount</th>
                      <th>Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id}>
                        <td>{payment.email}</td>
                        <td>{payment.mobileNumber}</td>
                        <td>{payment.bankName}</td>
                        <td>{payment.depositedBy}</td>
                        <td>{payment.transactionRef}</td>
                        <td>{formatDate(payment.date)}</td>
                        <td>{formatDate(payment.endDate)}</td>
                        <td>{payment.package}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.paymentStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;
