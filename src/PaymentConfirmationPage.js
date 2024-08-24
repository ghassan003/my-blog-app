// import React, { useState, useEffect } from 'react';
// import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
// import { db } from './firebase';
// import { toast } from 'react-toastify';
// import { Card, Row, Col, Form } from 'react-bootstrap';
// import SideNav from './SideNav';
// import CountdownLoader from './CountdownLoader';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './PaymentConfirmationPage.css';

// const PaymentConfirmationPage = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [emailFilter, setEmailFilter] = useState('');
//   const [mobileFilter, setMobileFilter] = useState('');
//   const [depositedByFilter, setDepositedByFilter] = useState('');

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'payments'));
//         const paymentsList = querySnapshot.docs.map((doc) => {
//           const data = doc.data();
//           const date = data.date;
//           return {
//             id: doc.id,
//             ...data,
//             date: date ? (date.toDate ? date.toDate() : new Date(date)) : null,
//           };
//         });
//         setPayments(paymentsList);
//       } catch (error) {
//         toast.error('Error fetching payments: ' + error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayments();
//   }, []);

//   const handlePaymentStatusChange = async (paymentId, newStatus) => {
//     try {
//       await updateDoc(doc(db, 'payments', paymentId), { status: newStatus });
//       setPayments(payments.map((payment) =>
//         payment.id === paymentId ? { ...payment, status: newStatus } : payment
//       ));
//       toast.success('Payment status updated successfully');
//     } catch (error) {
//       toast.error('Error updating payment status: ' + error.message);
//     }
//   };

//   const filteredPayments = payments.filter(payment =>
//     (payment.email || '').toLowerCase().includes(emailFilter.toLowerCase()) &&
//     (payment.mobileNumber || '').toLowerCase().includes(mobileFilter.toLowerCase()) &&
//     (payment.depositedBy || '').toLowerCase().includes(depositedByFilter.toLowerCase())
//   );

//   if (loading) return <CountdownLoader />;

//   return (
//     <div className="d-flex">
//       <SideNav />
//       <div className="content-wrapper">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-12 mb-4">
//               <div className="card border-dark">
//                 <div className="card-header bg-primary text-white">
                  
//                   <h5  className="card-title mb-0 text-center custom-title">User Payment Confirmation</h5>
//                 </div>
//                 <div className="card-body">
//                   <Card className="mb-4">
//                     <Card.Body>
//                       <Row>
//                         <Col md={4}>
//                           <Form.Group controlId="emailFilter">
//                             <Form.Label className="custom-label">Filter by Email:</Form.Label>
//                             <Form.Control
//                               type="text"
//                               placeholder="Enter email"
//                               value={emailFilter}
//                               onChange={(e) => setEmailFilter(e.target.value)}
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col md={4}>
//                           <Form.Group controlId="mobileFilter">
//                             <Form.Label className="custom-label">Filter by Mobile Number:</Form.Label>
//                             <Form.Control
//                               type="text"
//                               placeholder="Enter mobile number"
//                               value={mobileFilter}
//                               onChange={(e) => setMobileFilter(e.target.value)}
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col md={4}>
//                           <Form.Group controlId="depositedByFilter">
//                             <Form.Label className="custom-label">Filter by Deposited By:</Form.Label>
//                             <Form.Control
//                               type="text"
//                               placeholder="Enter depositor's name"
//                               value={depositedByFilter}
//                               onChange={(e) => setDepositedByFilter(e.target.value)}
//                             />
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                     </Card.Body>
//                   </Card>

//                   <div className="table-responsive">
//                     <table className="table table-bordered table-striped mt-4">
//                       <thead>
//                         <tr>
//                           <th>Email</th>
//                           <th>Mobile Number</th>
//                           <th>Deposited By</th>
//                           <th>Transaction Reference Number</th>
//                           <th>Date</th>
//                           <th>Bank Name</th>
//                           <th>Status</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {filteredPayments.map((payment) => (
//                           <tr key={payment.id}>
//                             <td>{payment.email || 'N/A'}</td>
//                             <td>{payment.mobileNumber || 'N/A'}</td>
//                             <td>{payment.depositedBy}</td>
//                             <td>{payment.transactionRef}</td>
//                             <td>{payment.date ? new Date(payment.date).toLocaleDateString() : 'N/A'}</td>
//                             <td>{payment.bankName}</td>
//                             <td>
//                               <select
//                                 className="form-select"
//                                 value={payment.status || 'Pending'}
//                                 onChange={(e) => handlePaymentStatusChange(payment.id, e.target.value)}
//                               >
//                                 <option value="Pending">Pending</option>
//                                 <option value="Received">Received</option>
//                               </select>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentConfirmationPage;


import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { toast } from 'react-toastify';
import { Card, Row, Col, Form } from 'react-bootstrap';
import SideNav from './SideNav';
import CountdownLoader from './CountdownLoader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PaymentConfirmationPage.css';

const PaymentConfirmationPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailFilter, setEmailFilter] = useState('');
  const [mobileFilter, setMobileFilter] = useState('');
  const [depositedByFilter, setDepositedByFilter] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'payments'));
        const paymentsList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const date = data.date;
          return {
            id: doc.id,
            ...data,
            date: date ? (date.toDate ? date.toDate() : new Date(date)) : null,
          };
        });
        setPayments(paymentsList);
      } catch (error) {
        toast.error('Error fetching payments: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handlePaymentStatusChange = async (paymentId, newStatus) => {
    try {
      await updateDoc(doc(db, 'payments', paymentId), { status: newStatus });
      setPayments(payments.map((payment) =>
        payment.id === paymentId ? { ...payment, status: newStatus } : payment
      ));
      toast.success('Payment status updated successfully');
    } catch (error) {
      toast.error('Error updating payment status: ' + error.message);
    }
  };

  const filteredPayments = payments.filter(payment =>
    (payment.email || '').toLowerCase().includes(emailFilter.toLowerCase()) &&
    (payment.mobileNumber || '').toLowerCase().includes(mobileFilter.toLowerCase()) &&
    (payment.depositedBy || '').toLowerCase().includes(depositedByFilter.toLowerCase())
  );

  if (loading) return <CountdownLoader />;

  return (
    <div className="d-flex">
      <SideNav />
      <div className="content-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-4">
              <div className="card border-dark">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0 text-center custom-title">User Payment Confirmation</h5>
                </div>
                <div className="card-body">
                  <Card className="mb-4">
                    <Card.Body>
                      <Row>
                        <Col md={4}>
                          <Form.Group controlId="emailFilter">
                            <Form.Label className="custom-label">Filter by Email:</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter email"
                              value={emailFilter}
                              onChange={(e) => setEmailFilter(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="mobileFilter">
                            <Form.Label className="custom-label">Filter by Mobile Number:</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter mobile number"
                              value={mobileFilter}
                              onChange={(e) => setMobileFilter(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="depositedByFilter">
                            <Form.Label className="custom-label">Filter by Deposited By:</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter depositor's name"
                              value={depositedByFilter}
                              onChange={(e) => setDepositedByFilter(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>

                  <div className="table-responsive">
                    <table className="table table-bordered table-striped mt-4">
                      <thead>
                        <tr>
                          <th>Email</th>
                          <th>Mobile Number</th>
                          <th>Deposited By</th>
                          <th>Transaction Reference Number</th>
                          <th>Date</th>
                          <th>Bank Name</th>
                          <th>Amount</th> {/* New column for Amount */}
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPayments.map((payment) => (
                          <tr key={payment.id}>
                            <td>{payment.email || 'N/A'}</td>
                            <td>{payment.mobileNumber || 'N/A'}</td>
                            <td>{payment.depositedBy}</td>
                            <td>{payment.transactionRef}</td>
                            <td>{payment.date ? new Date(payment.date).toLocaleDateString() : 'N/A'}</td>
                            <td>{payment.bankName}</td>
                            <td>{payment.amount ? payment.amount.toFixed(2) : 'N/A'}</td> {/* Display Amount */}
                            <td>
                              <select
                                className="form-select"
                                value={payment.status || 'Pending'}
                                onChange={(e) => handlePaymentStatusChange(payment.id, e.target.value)}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Received">Received</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default PaymentConfirmationPage;
