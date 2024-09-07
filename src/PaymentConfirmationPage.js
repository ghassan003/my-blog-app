// import React, { useState, useEffect } from 'react';
// import SideNav from './SideNav';
// import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

// import { db } from './firebase'; // Ensure this path is correct
// // import { db } from './firebase';
// import { Card } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './PaymentConfirmationPage.css'; // Ensure you have a CSS file for styling

// const PaymentConfirmationPage = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);

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

//             // Convert Firestore timestamps to Date objects if they exist
//             const endDate = payment.endDate ? payment.endDate.toDate() : null;

//             // Check if the payment has EXPIRED
//             if (endDate && endDate < today) {
//               payment.paymentStatus = 'EXPIRED';
//               // Update Firestore with the new status
//               await updateDoc(doc(db, 'payments', payment.id), {
//                 paymentStatus: 'EXPIRED',
//               });
//             } else if (endDate && endDate >= today) {
//               payment.paymentStatus = 'PAID';
//               // Update Firestore with the new status
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

//   // Function to format date
//   const formatDate = (timestamp) => {
//     if (!timestamp) return '';
//     if (timestamp.toDate) {
//       const date = timestamp.toDate();
//       return date.toLocaleDateString();
//     } else {
//       const date = new Date(timestamp);
//       return date.toLocaleDateString();
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="d-flex">
//       <SideNav />
//       <div className="content-wrapper">
//         <Card className="mb-4">
//           <Card.Header as="h5" className="bg-primary text-white font-weight-bold">
//             Payment Confirmation Details
//           </Card.Header>

//           <Card.Body>
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   <th>Email</th>
//                   <th>Mobile Number</th>
//                   <th>Bank Name</th>
//                   <th>Deposited By</th>
//                   <th>Transaction Reference Number</th>
//                   <th>Date</th>
//                   <th>End Date</th>
//                   <th>Package</th>
//                   <th>Amount</th>
//                   <th>Payment Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {payments.map((payment) => (
//                   <tr key={payment.id}>
//                     <td>{payment.email}</td>
//                     <td>{payment.mobileNumber}</td>
//                     <td>{payment.bankName}</td>
//                     <td>{payment.depositedBy}</td>
//                     <td>{payment.transactionRef}</td>
//                     <td>{formatDate(payment.date)}</td>
//                     <td>{formatDate(payment.endDate)}</td>
//                     <td>{payment.packageMonth}</td>
//                     <td>{payment.amount}</td>
//                     <td>{payment.paymentStatus}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </Card.Body>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default PaymentConfirmationPage;





// import React, { useState, useEffect } from 'react';
// import SideNav from './SideNav';
// import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
// import { db } from './firebase';
// import { Card } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './PaymentConfirmationPage.css';

// const PaymentConfirmationPage = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [emailFilter, setEmailFilter] = useState('');
//   const [mobileNumberFilter, setMobileNumberFilter] = useState('');
//   const [bankNameFilter, setBankNameFilter] = useState('');

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
//     if (!timestamp) return '';
//     if (timestamp.toDate) {
//       const date = timestamp.toDate();
//       return date.toLocaleDateString();
//     } else {
//       const date = new Date(timestamp);
//       return date.toLocaleDateString();
//     }
//   };

//   const filteredPayments = payments.filter(payment => {
//     return (
//       (emailFilter === '' || payment.email.toLowerCase().includes(emailFilter.toLowerCase())) &&
//       (mobileNumberFilter === '' || payment.mobileNumber.includes(mobileNumberFilter)) &&
//       (bankNameFilter === '' || payment.bankName.toLowerCase().includes(bankNameFilter.toLowerCase()))
//     );
//   });

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="d-flex">
//       <SideNav />
//       <div className="content-wrapper">
//         <Card className="mb-4">
//           <Card.Header as="h5" className="bg-primary text-white font-weight-bold">
//             Payment Confirmation Details
//           </Card.Header>

//           <Card.Body>
//             {/* New Section */}
//             <div className="row align-items-center mb-3">
//               {/* Email Filter */}
//               <div className="col-md-4">
//                 <label><strong>Email:</strong></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={emailFilter}
//                   onChange={(e) => setEmailFilter(e.target.value)}
//                   placeholder="Filter by Email"
//                 />
//               </div>

//               {/* Mobile Number Filter */}
//               <div className="col-md-4">
//                 <label><strong>Mobile Number:</strong></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={mobileNumberFilter}
//                   onChange={(e) => setMobileNumberFilter(e.target.value)}
//                   placeholder="Filter by Mobile Number"
//                 />
//               </div>

//               {/* Bank Name Filter */}
//               <div className="col-md-4">
//                 <label><strong>Bank Name:</strong></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={bankNameFilter}
//                   onChange={(e) => setBankNameFilter(e.target.value)}
//                   placeholder="Filter by Bank Name"
//                 />
//               </div>
//             </div>

//             {/* Existing Table */}
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   <th>Email</th>
//                   <th>Mobile Number</th>
//                   <th>Bank Name</th>
//                   <th>Deposited By</th>
//                   <th>Transaction Reference Number</th>
//                   <th>Date</th>
//                   <th>End Date</th>
//                   <th>Package</th>
//                   <th>Amount</th>
//                   <th>Payment Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredPayments.map((payment) => (
//                   <tr key={payment.id}>
//                     <td>{payment.email}</td>
//                     <td>{payment.mobileNumber}</td>
//                     <td>{payment.bankName}</td>
//                     <td>{payment.depositedBy}</td>
//                     <td>{payment.transactionRef}</td>
//                     <td>{formatDate(payment.date)}</td>
//                     <td>{formatDate(payment.endDate)}</td>
//                     <td>{payment.packageMonth}</td>
//                     <td>{payment.amount}</td>
//                     <td>{payment.paymentStatus}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </Card.Body>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default PaymentConfirmationPage;




// import React, { useState, useEffect } from 'react';
// import SideNav from './SideNav';
// import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
// import { db } from './firebase'; // Ensure this path is correct
// import { Card } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './PaymentConfirmationPage.css'; // Ensure you have a CSS file for styling
// import { CSVLink } from 'react-csv';

// const PaymentConfirmationPage = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [emailFilter, setEmailFilter] = useState('');
//   const [mobileFilter, setMobileFilter] = useState('');

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

//             // Convert Firestore timestamps to Date objects if they exist
//             const endDate = payment.endDate ? payment.endDate.toDate() : null;

//             // Check if the payment has EXPIRED
//             if (endDate && endDate < today) {
//               payment.paymentStatus = 'EXPIRED';
//               // Update Firestore with the new status
//               await updateDoc(doc(db, 'payments', payment.id), {
//                 paymentStatus: 'EXPIRED',
//               });
//             } else if (endDate && endDate >= today) {
//               payment.paymentStatus = 'PAID';
//               // Update Firestore with the new status
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

//   // Function to format date
//   const formatDate = (timestamp) => {
//     if (!timestamp) return '';
//     if (timestamp.toDate) {
//       const date = timestamp.toDate();
//       return date.toLocaleDateString();
//     } else {
//       const date = new Date(timestamp);
//       return date.toLocaleDateString();
//     }
//   };

//   // Filtered payments based on selected filters
//   const filteredPayments = payments.filter((payment) => {
//     return (
//       (!emailFilter || payment.email.includes(emailFilter)) &&
//       (!mobileFilter || payment.mobileNumber.includes(mobileFilter))
//     );
//   });

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="d-flex">
//       <SideNav />
//       <div className="content-wrapper">
//         <Card className="mb-4">
//           <Card.Header as="h5" className="bg-primary text-white font-weight-bold">
//             Payment Confirmation Details
//           </Card.Header>

//           <Card.Body>
//             {/* Filters Section */}
//             <div className="row align-items-center">
//               <div className="col-md-12">
//                 <div className="filters row">
//                   <div className="filter-group col-md-6">
//                     <label><strong>Email:</strong></label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={emailFilter}
//                       onChange={(e) => setEmailFilter(e.target.value)}
//                     />
//                   </div>
//                   <div className="filter-group col-md-6">
//                     <label><strong>Mobile Number:</strong></label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={mobileFilter}
//                       onChange={(e) => setMobileFilter(e.target.value)}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="col-md-3">
//                 <div className="user-count">
//                   <h5>Total Payments: {payments.length}</h5>
//                   <h5>Filtered Payments: {filteredPayments.length}</h5>
//                 </div>
//               </div>

//               <div className="col-md-3 d-flex justify-content-end">
//                 <CSVLink
//                   data={filteredPayments}
//                   headers={[
//                     { label: 'Email', key: 'email' },
//                     { label: 'Mobile Number', key: 'mobileNumber' },
//                     // Add other necessary headers
//                   ]}
//                   filename="PaymentsData.csv"
//                   className="btn btn-warning"
//                 >
//                   Export to CSV
//                 </CSVLink>
//               </div>
//             </div>

//             {/* Payment Table */}
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   <th>Email</th>
//                   <th>Mobile Number</th>
//                   <th>Bank Name</th>
//                   <th>Deposited By</th>
//                   <th>Transaction Reference Number</th>
//                   <th>Date</th>
//                   <th>End Date</th>
//                   <th>Package</th>
//                   <th>Amount</th>
//                   <th>Payment Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredPayments.map((payment) => (
//                   <tr key={payment.id}>
//                     <td>{payment.email}</td>
//                     <td>{payment.mobileNumber}</td>
//                     <td>{payment.bankName}</td>
//                     <td>{payment.depositedBy}</td>
//                     <td>{payment.transactionRef}</td>
//                     <td>{formatDate(payment.date)}</td>
//                     <td>{formatDate(payment.endDate)}</td>
//                     <td>{payment.packageMonth}</td>
//                     <td>{payment.amount}</td>
//                     <td>{payment.paymentStatus}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </Card.Body>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default PaymentConfirmationPage;


// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form, Card } from 'react-bootstrap';
// import SideNav from './SideNav';
// import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
// import { db } from './firebase';

// const PaymentConfirmationPage = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [emailFilter, setEmailFilter] = useState('');
//   const [mobileFilter, setMobileFilter] = useState('');
//   const [depositedByFilter, setDepositedByFilter] = useState('');

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
  
//             // Check if endDate is valid or not
//             let endDate;
//             if (payment.endDate && payment.endDate.toDate) {
//               endDate = payment.endDate.toDate();
//             } else {
//               endDate = null; // Handle case where endDate is not available
//             }
  
//             // Determine the payment status based on endDate
//             if (endDate === null) {
//               payment.paymentStatus = 'PENDING';
//               await updateDoc(doc(db, 'payments', payment.id), {
//                 paymentStatus: 'PENDING',
//               });
//             } else if (endDate < today) {
//               payment.paymentStatus = 'EXPIRED';
//               await updateDoc(doc(db, 'payments', payment.id), {
//                 paymentStatus: 'EXPIRED',
//               });
//             } else if (endDate >= today) {
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
//     if (!timestamp) return '';
//     if (timestamp.toDate) {
//       const date = timestamp.toDate();
//       return date.toLocaleDateString();
//     } else {
//       const date = new Date(timestamp);
//       return date.toLocaleDateString();
//     }
//   };

//   const filteredPayments = payments.filter((payment) => {
//     return (
//       (!emailFilter || payment.email.includes(emailFilter)) &&
//       (!mobileFilter || payment.mobileNumber.includes(mobileFilter)) &&
//       (!depositedByFilter || payment.depositedBy.includes(depositedByFilter))
//     );
//   });

//   const handleEditClick = (payment) => {
//     setSelectedPayment(payment);
//     setShowModal(true);
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     setSelectedPayment(null);
//   };

//   const handleSave = async () => {
//     try {
//       if (selectedPayment) {
//         await updateDoc(doc(db, 'payments', selectedPayment.id), selectedPayment);
//         const updatedPayments = payments.map(payment =>
//           payment.id === selectedPayment.id ? selectedPayment : payment
//         );
//         setPayments(updatedPayments);
//         handleClose();
//       }
//     } catch (error) {
//       console.error('Error updating payment: ', error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="d-flex">
//       <SideNav />
//       <div className="content-wrapper">
//         <Card className="mb-4">
//           <Card.Header as="h5" className="bg-primary text-white font-weight-bold">
//             Payment Confirmation Details
//           </Card.Header>

//           <Card.Body>
//             {/* Filters Section */}
//             <div className="row align-items-center mb-3">
//               <div className="col-md-4">
//                 <label><strong>Email:</strong></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={emailFilter}
//                   onChange={(e) => setEmailFilter(e.target.value)}
//                   placeholder="Filter by Email"
//                 />
//               </div>
//               <div className="col-md-4">
//                 <label><strong>Mobile Number:</strong></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={mobileFilter}
//                   onChange={(e) => setMobileFilter(e.target.value)}
//                   placeholder="Filter by Mobile Number"
//                 />
//               </div>
//               <div className="col-md-4">
//                 <label><strong>Deposited By:</strong></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={depositedByFilter}
//                   onChange={(e) => setDepositedByFilter(e.target.value)}
//                   placeholder="Filter by Deposited By"
//                 />
//               </div>
//             </div>

//             {/* Payment Table */}
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   <th>Email</th>
//                   <th>Mobile Number</th>
//                   <th>Bank Name</th>
//                   <th>Deposited By</th>
//                   <th>Transaction Reference Number</th>
//                   <th>Date</th>
//                   <th>Start Date</th>

//                   <th>End Date</th>
//                   <th>Package</th>
//                   <th>Amount</th>
//                   <th>Payment Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredPayments.map((payment) => (
//                   <tr key={payment.id}>
//                     <td>{payment.email}</td>
//                     <td>{payment.mobileNumber}</td>
//                     <td>{payment.bankName}</td>
//                     <td>{payment.depositedBy}</td>
//                     <td>{payment.transactionRef}</td>
//                     <td>{formatDate(payment.date)}</td>
//                     <td>{formatDate(payment.startDate)}</td>
//                     <td>{formatDate(payment.endDate)}</td>
//                     <td>{payment.packageMonth}</td>
//                     <td>{payment.amount}</td>
//                     <td>{payment.paymentStatus}</td>
//                     <td>
//                       <button
//                         className="btn btn-primary"
//                         onClick={() => handleEditClick(payment)}
//                       >
//                         Edit User Package
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </Card.Body>
//         </Card>

//         {/* Edit Modal */}
//         <Modal show={showModal} onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit User Package</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {selectedPayment && (
//               <Form>
//                 <Form.Group controlId="formPackage">
//                   <Form.Label>Package</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={selectedPayment.packageMonth}
//                     disabled
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formAmount">
//                   <Form.Label>Amount</Form.Label>
//                   <Form.Control
//                     type="number"
//                     value={selectedPayment.amount}
//                     disabled
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formStartDate">
//                   <Form.Label>Start Date</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={selectedPayment.startDate ? selectedPayment.startDate.toDate().toISOString().substr(0, 10) : ''}
//                     onChange={(e) => setSelectedPayment({ ...selectedPayment, startDate: new Date(e.target.value) })}
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formEndDate">
//                   <Form.Label>End Date</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={selectedPayment.endDate ? selectedPayment.endDate.toDate().toISOString().substr(0, 10) : ''}
//                     onChange={(e) => setSelectedPayment({ ...selectedPayment, endDate: new Date(e.target.value) })}
//                   />
//                 </Form.Group>
//               </Form>
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//             <Button variant="primary" onClick={handleSave}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal>

//       </div>
//     </div>
//   );
// };

// export default PaymentConfirmationPage;


// import React, { useState, useEffect } from 'react';
// import { Card, Modal, Button, Form } from 'react-bootstrap';
// import SideNav from './SideNav';
// import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
// import { db } from './firebase'; // Import your Firestore instance
// import { Timestamp } from 'firebase/firestore';

// const PaymentConfirmationPage = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [emailFilter, setEmailFilter] = useState('');
//   const [mobileFilter, setMobileFilter] = useState('');
//   const [depositedByFilter, setDepositedByFilter] = useState('');

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

//             let endDate = payment.endDate;
//             if (endDate && endDate.toDate) {
//               endDate = endDate.toDate();
//             } else if (endDate && !(endDate instanceof Date)) {
//               endDate = new Date(endDate);
//             }
//               // if (!endDate) 
//               if(payment.paymentStatus = 'PENDING')
//               {
//               payment.paymentStatus = 'PENDING';
//               await updateDoc(doc(db, 'payments', payment.id), {
//                 paymentStatus: 'PENDING',
//               });

//             } else if (endDate < today) {
//               payment.paymentStatus = 'EXPIRED';
//               await updateDoc(doc(db, 'payments', payment.id), {
//                 paymentStatus: 'EXPIRED',
//               });
//             } else if (endDate >= today) {
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
//     if (!timestamp) return '';
//     if (timestamp.toDate) {
//       return timestamp.toDate().toISOString().split('T')[0];
//     }
//     return new Date(timestamp).toISOString().split('T')[0];
//   };

//   const filteredPayments = payments.filter((payment) => {
//     return (
//       (!emailFilter || payment.email.includes(emailFilter)) &&
//       (!mobileFilter || payment.mobileNumber.includes(mobileFilter)) &&
//       (!depositedByFilter || payment.depositedBy.includes(depositedByFilter))
//     );
//   });

//   const handleEditClick = (payment) => {
//     setSelectedPayment(payment);
//     console.log("payment",payment)
//     setShowModal(true);
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     setSelectedPayment(null);
//   };

//   const handleSave = async () => {
//     try {
//       if (selectedPayment) {
//         const updatedPayment = {
//           ...selectedPayment,
//           startDate: selectedPayment.startDate ? Timestamp.fromDate(new Date(selectedPayment.startDate)) : null,
//           endDate: selectedPayment.endDate ? Timestamp.fromDate(new Date(selectedPayment.endDate)) : null,
//         };

//         await updateDoc(doc(db, 'payments', selectedPayment.id), updatedPayment);

//         const updatedPayments = payments.map(payment =>
//           payment.id === selectedPayment.id ? updatedPayment : payment
//         );
//         setPayments(updatedPayments);
//         handleClose();
//       }
//     } catch (error) {
//       console.error('Error updating payment: ', error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="d-flex">
//       <SideNav />
//       <div className="content-wrapper">
//         <Card className="mb-4">
//           <Card.Header as="h5" className="bg-primary text-white font-weight-bold">
//             Payment Confirmation Details
//           </Card.Header>

//           <Card.Body>
//             {/* Filters Section */}
//             <div className="row align-items-center mb-3">
//               <div className="col-md-4">
//                 <label><strong>Email:</strong></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={emailFilter}
//                   onChange={(e) => setEmailFilter(e.target.value)}
//                   placeholder="Filter by Email"
//                 />
//               </div>
//               <div className="col-md-4">
//                 <label><strong>Mobile Number:</strong></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={mobileFilter}
//                   onChange={(e) => setMobileFilter(e.target.value)}
//                   placeholder="Filter by Mobile Number"
//                 />
//               </div>
//               <div className="col-md-4">
//                 <label><strong>Deposited By:</strong></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={depositedByFilter}
//                   onChange={(e) => setDepositedByFilter(e.target.value)}
//                   placeholder="Filter by Deposited By"
//                 />
//               </div>
//             </div>

//             {/* Payment Table */}
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   <th>Email</th>
//                   <th>Mobile Number</th>
//                   <th>Bank Name</th>
//                   <th>Deposited By</th>
//                   <th>Transaction Reference Number</th>
//                   <th>Date</th>
//                   <th>End Date</th>
//                   <th>Package</th>
//                   <th>Amount</th>
//                   <th>Payment Status</th>
//                   <th>Actions</th> {/* Column for actions */}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredPayments.map((payment) => (
//                   <tr key={payment.id}>
//                     <td>{payment.email}</td>
//                     <td>{payment.mobileNumber}</td>
//                     <td>{payment.bankName}</td>
//                     <td>{payment.depositedBy}</td>
//                     <td>{payment.transactionRef}</td>
//                     <td>{formatDate(payment.date)}</td>
//                     <td>{formatDate(payment.endDate)}</td>
//                     <td>{payment.packageMonth}</td>
//                     <td>{payment.amount}</td>
//                     <td>{payment.paymentStatus}</td>
//                     <td>
//                       <button
//                         className="btn btn-primary"
//                         onClick={() => handleEditClick(payment)}
//                       >
//                         Edit User Package
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </Card.Body>
//         </Card>

//         {/* Edit Modal */}
//         <Modal show={showModal} onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit User Package</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {selectedPayment && (
//               <Form>
//                 <Form.Group controlId="formPackage">
//                   <Form.Label>Package</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={selectedPayment.packageMonth}
//                     disabled
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formAmount">
//                   <Form.Label>Amount</Form.Label>
//                   <Form.Control
//                     type="number"
//                     value={selectedPayment.amount}
//                     disabled
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formStartDate">
//                   <Form.Label>Start Date</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={selectedPayment.startDate ? new Date(selectedPayment.startDate?.seconds * 1000).toISOString().split('T')[0] : ''}
//                     onChange={(e) => setSelectedPayment({ ...selectedPayment, startDate: new Date(e.target.value) })}
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formEndDate">
//                   <Form.Label>End Date</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={selectedPayment.endDate ? new Date(selectedPayment.endDate?.seconds * 1000).toISOString().split('T')[0] : ''}
//                     onChange={(e) => setSelectedPayment({ ...selectedPayment, endDate: new Date(e.target.value) })}
//                   />
//                 </Form.Group>
//               </Form>
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//             <Button variant="primary" onClick={handleSave}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default PaymentConfirmationPage;




import React, { useState, useEffect } from 'react';
import { Card, Modal, Button, Form } from 'react-bootstrap';
import SideNav from './SideNav';
import CountdownLoader from './CountdownLoader'; // Import CountdownLoader
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase'; // Import your Firestore instance
import { Timestamp } from 'firebase/firestore';

const PaymentConfirmationPage = () => {
  const [payments, setPayments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [emailFilter, setEmailFilter] = useState('');
  
  const [mobileFilter, setMobileFilter] = useState('');
  const [depositedByFilter, setDepositedByFilter] = useState('');

  // State variables for payment status counts
  const [paidCount, setPaidCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [expiredCount, setExpiredCount] = useState(0);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'payments'));
        const today = new Date();

        let paid = 0;
        let pending = 0;
        let expired = 0;

        const paymentData = await Promise.all(
          querySnapshot.docs.map(async (docSnapshot) => {
            const payment = {
              id: docSnapshot.id,
              ...docSnapshot.data(),
            };

            let endDate = payment.endDate;
            if (endDate && endDate.toDate) {
              endDate = endDate.toDate();
            } else if (endDate && !(endDate instanceof Date)) {
              endDate = new Date(endDate);
            }

            if (payment.paymentStatus === 'PENDING') {
              payment.paymentStatus = 'PENDING';
              pending += 1;
              await updateDoc(doc(db, 'payments', payment.id), {
                paymentStatus: 'PENDING',
              });
            }
            else if (payment.paymentStatus === 'REJCET') {
              payment.paymentStatus = 'REJCET';
              pending += 1;
              await updateDoc(doc(db, 'payments', payment.id), {
                paymentStatus: 'REJCET',
              });
            }

            else if (endDate < today) {
              payment.paymentStatus = 'EXPIRED';
              expired += 1;
              await updateDoc(doc(db, 'payments', payment.id), {
                paymentStatus: 'EXPIRED',
              });
            } else if (endDate >= today) {
              payment.paymentStatus = 'PAID';
              paid += 1;
              await updateDoc(doc(db, 'payments', payment.id), {
                paymentStatus: 'PAID',
              });
            }

            return payment;
          })
        );

        // Update counts
        setPaidCount(paid);
        setPendingCount(pending);
        setExpiredCount(expired);

        setPayments(paymentData);
      } catch (error) {
        console.error('Error fetching payments: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetch with a timeout
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after data fetch is complete
    }, 3000); // Adjust the timeout duration to match your data fetching time

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <CountdownLoader />;
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    if (timestamp.toDate) {
      console.log("toISOString",timestamp.toDate().toISOString().split('T')[0]);
      
      return timestamp.toDate().toISOString().split('T')[0];
    }
    return new Date(timestamp).toISOString().split('T')[0];
  };

  const filteredPayments = payments.filter((payment) => {
    return (
      (!emailFilter || payment.email.includes(emailFilter)) &&
      (!mobileFilter || payment.mobileNumber.includes(mobileFilter)) &&
      (!depositedByFilter || payment.depositedBy.includes(depositedByFilter))
    );
  });

  // const handleEditClick = (payment) => {
  //   setSelectedPayment(payment);
  //   setShowEditModal(true);
  // };

  const handleStatusUpdateClick = (payment) => {
    setSelectedPayment(payment);
    setShowStatusModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedPayment(null);
  };

  const handleCloseStatusModal = () => {
    setShowStatusModal(false);
    setSelectedPayment(null);
  };

  const handleSave = async () => {
    try {
      if (selectedPayment) {
        const updatedPayment = {
          ...selectedPayment,
          startDate: selectedPayment.startDate ? Timestamp.fromDate(new Date(selectedPayment.startDate)) : null,
          endDate: selectedPayment.endDate ? Timestamp.fromDate(new Date(selectedPayment.endDate)) : null,
        };

        await updateDoc(doc(db, 'payments', selectedPayment.id), updatedPayment);

        const updatedPayments = payments.map(payment =>
          payment.id === selectedPayment.id ? updatedPayment : payment
        );
        setPayments(updatedPayments);
        handleCloseEditModal();
      }
    } catch (error) {
      console.error('Error updating payment: ', error);
    }
  };

  const updatePaymentStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, 'payments', id), { paymentStatus: status });

      // Update the payment list
      const updatedPayments = payments.map(payment =>
        payment.id === id ? { ...payment, paymentStatus: status } : payment
      );
      setPayments(updatedPayments);
    } catch (error) {
      console.error('Error updating payment status: ', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex">
      <SideNav />
      <div className="content-wrapper">
        <Card className="mb-4">
          <Card.Header as="h5" className="bg-primary text-white font-weight-bold">
            Payment Confirmation Details
          </Card.Header>

          <Card.Body>
            {/* Filters Section */}
            <div className="row align-items-center mb-3">
              <div className="col-md-4">
                <label><strong>Email:</strong></label>
                <input
                  type="text"
                  className="form-control"
                  value={emailFilter}
                  onChange={(e) => setEmailFilter(e.target.value)}
                  placeholder="Filter by Email"
                />
              </div>
              <div className="col-md-4">
                <label><strong>Mobile Number:</strong></label>
                <input
                  type="text"
                  className="form-control"
                  value={mobileFilter}
                  onChange={(e) => setMobileFilter(e.target.value)}
                  placeholder="Filter by Mobile Number"
                />
              </div>
              <div className="col-md-4">
                <label><strong>Deposited By:</strong></label>
                <input
                  type="text"
                  className="form-control"
                  value={depositedByFilter}
                  onChange={(e) => setDepositedByFilter(e.target.value)}
                  placeholder="Filter by Deposited By"
                />
              </div>
            </div>

            {/* Status Counts Section */}
            <div className="row mb-3" style={{ backgroundColor: '#e9eaec' }}>
              <div className="col-md-4">
                <strong>Total Paid:</strong> {paidCount}
              </div>
              <div className="col-md-4">
                <strong>Total Pending:</strong> {pendingCount}
              </div>
              <div className="col-md-4">
                <strong>Total Expired:</strong> {expiredCount}
              </div>
            </div>

            {/* Payment Table */}
            <table className="table table-striped">
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
                  <th>Actions</th> {/* Column for actions */}
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.email}</td>
                    <td>{payment.mobileNumber}</td>
                    <td>{payment.bankName}</td>
                    <td>{payment.depositedBy}</td>
                    <td>{payment.transactionRef}</td>
                    <td>{formatDate(payment.date)}</td>
                    <td>{formatDate(payment.endDate)}</td>
                    <td>{payment.packageMonth}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.paymentStatus}</td>
                    <td>
                      {/* <button
                        className="btn btn-primary"
                        onClick={() => handleEditClick(payment)}
                      >
                        Edit User Package
                      </button> */}
                      <button
                        className="btn btn-primary ml-2"
                        onClick={() => handleStatusUpdateClick(payment)}
                      >
                        Update Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>

        {/* Edit User Package Modal */}
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User Package</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedPayment && (
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={selectedPayment.email}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formBasicMobile">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedPayment.mobileNumber}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPackage">
                  <Form.Label>Package</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedPayment.packageMonth}
                    onChange={(e) =>
                      setSelectedPayment({
                        ...selectedPayment,
                        packageMonth: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formBasicAmount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={selectedPayment.amount}
                    onChange={(e) =>
                      setSelectedPayment({
                        ...selectedPayment,
                        amount: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formBasicDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formatDate(selectedPayment.date)}
                    onChange={(e) =>
                      setSelectedPayment({
                        ...selectedPayment,
                        date: new Date(e.target.value),
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEndDate">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formatDate(selectedPayment.endDate)}
                    onChange={(e) =>
                      setSelectedPayment({
                        ...selectedPayment,
                        endDate: new Date(e.target.value),
                      })
                    }
                  />
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Status Update Modal */}
        {selectedPayment && (
          <StatusUpdateModal
            show={showStatusModal}
            handleClose={handleCloseStatusModal}
            payment={selectedPayment}
            updatePaymentStatus={updatePaymentStatus}
          />
        )}
      </div>
    </div>
  );
};

const StatusUpdateModal = ({ show, handleClose, payment, updatePaymentStatus }) => {
  const [status, setStatus] = useState(payment.paymentStatus);

  const handleSubmit = async () => {
    try {
      await updatePaymentStatus(payment.id, status);
      handleClose();
    } catch (error) {
      console.error('Error updating payment status: ', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Payment Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicStatus">
            <Form.Label>Payment Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="PENDING">PENDING</option>
              <option value="PAID">PAID</option>
              <option value="REJCET">REJCET</option>
              <option value="EXPIRED">EXPIRED</option>
              {/* Add more options if needed */}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentConfirmationPage;
