import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, updateDoc, } from 'firebase/firestore';
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

  // const parseDate = (date) => {
  //   if (date instanceof Date) return date;
  //   if (date && typeof date.toDate === 'function') return date.toDate(); // Handle Firebase Timestamp
  //   if (typeof date === 'string') {
  //     const parsedDate = new Date(date);
  //     return isNaN(parsedDate.getTime()) ? null : parsedDate; // Validate the parsed date
  //   }
  //   console.warn('Unknown date format:', date);
  //   return null;
  // };

  const parseDate = (date) => {
    console.log('Parsing date:', date); // Log the date input for debugging
  
    if (date instanceof Date) return date;
  
    if (date && typeof date.toDate === 'function') {
      return date.toDate(); // Handle Firebase Timestamp
    }
    
    if (typeof date === 'string') {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate; // Validate the parsed date
      } else {
        console.warn('Invalid date string format:', date);
        return null;
      }
    }
  
    // Log unhandled date formats
    console.warn('Unknown date format:', date);
    return null;  
  };
  

  const checkAndUpdateExpiredPayments = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'payments'));
      const now = new Date().setHours(0, 0, 0, 0); // Start of the day for today

      await Promise.all(querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const endDate = parseDate(data.endDate);

        if (endDate) {
          const endDateStartOfDay = new Date(endDate).setHours(0, 0, 0, 0); // Start of the day for endDate

          if (endDateStartOfDay <= now) {
            const paymentRef = doc.ref;
            const currentPaymentStatus = data.paymentStatus || 'Pending';

            if (currentPaymentStatus !== 'Paid') {
              await updateDoc(paymentRef, { paymentStatus: 'Paid' });

              if (data.userId) {
                const userDocRef = doc(db, 'users', data.userId);
                await updateDoc(userDocRef, { paymentStatus: 'Paid' });
              }
            }
          }
        }
      }));
    } catch (error) {
      toast.error('Error updating expired payments: ' + error.message);
    }
  }, []);

  useEffect(() => {
    checkAndUpdateExpiredPayments();

    const intervalId = setInterval(checkAndUpdateExpiredPayments, 60000); // 60000 ms = 1 minute

    return () => clearInterval(intervalId);
  }, [checkAndUpdateExpiredPayments]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'payments'));
        const now = new Date().setHours(0, 0, 0, 0); // Start of the day for today
  
        const paymentsList = await Promise.all(querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const date = parseDate(data.date);
          const startDate = parseDate(data.startDate);
          const endDate = parseDate(data.endDate);
  
          let paymentStatus = data.paymentStatus || 'Pending';
  
          if (endDate && endDate.setHours(0, 0, 0, 0) < now) { // Check if endDate is less than today
            paymentStatus = 'Expired';
            await updateDoc(doc.ref, { paymentStatus });
  
            if (data.userId) {
              try {
                // Create a reference to the user document
                const userDocRef = doc(db, 'users', data.userId);
            
                // Log the userDocRef and paymentStatus for debugging
                console.log('Updating user document:', userDocRef.path);
                console.log('New paymentStatus:', paymentStatus);
            
                // Update the user document
                await updateDoc(userDocRef, { paymentStatus });
            
                // Log success
                console.log('User document updated successfully');
              } catch (error) {
                // Log any errors that occur during the update
                console.error('Error updating user document:', error.message);
                toast.error('Error updating user document: ' + error.message);
              }
            }
            
          }
  
          return {
            id: doc.id,
            ...data,
            date: date ? date.toLocaleDateString() : 'Invalid Date',
            startDate: startDate ? startDate.toLocaleDateString() : 'Invalid Date',
            endDate: endDate ? endDate.toLocaleDateString() : 'Invalid Date',
            package: data.package || 'N/A',
            userId: data.userId || '',
            paymentStatus,
          };
        }));
  
        setPayments(paymentsList);
      } catch (error) {
        toast.error('Error fetching payments: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPayments();
  }, []); // Empty dependency array, runs once on component mount
  


  // useEffect(() => {
  //   const fetchPayments = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, 'payments'));
  //       const paymentsList = await Promise.all(querySnapshot.docs.map(async (doc) => {
  //         const data = doc.data();

  //         const date = parseDate(data.date);
  //         const startDate = parseDate(data.startDate);
  //         const endDate = parseDate(data.endDate);

  //         let paymentStatus = data.paymentStatus || 'N/A';

  //         if (endDate && endDate < new Date()) {
  //           paymentStatus = 'Expired';
  //           await updateDoc(doc.ref, { paymentStatus });

  //           if (data.userId) {
  //             const userDocRef = doc(db, 'users', data.userId);
  //             await updateDoc(userDocRef, { paymentStatus });
  //           }
  //         }

  //         return {
  //           id: doc.id,
  //           ...data,
  //           date: date ? date.toLocaleDateString() : 'Invalid Date',
  //           startDate: startDate ? startDate.toLocaleDateString() : 'Invalid Date',
  //           endDate: endDate ? endDate.toLocaleDateString() : 'Invalid Date',
  //           package: data.package || 'N/A',
  //           userId: data.userId || '',
  //           paymentStatus,
  //         };
  //       }));
  //       setPayments(paymentsList);
  //     } catch (error) {
  //       toast.error('Error fetching payments: ' + error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPayments();
  // }, []);

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
                          <th>Bank Name</th>
                          <th>Deposited By</th>
                          <th>Transaction Reference Number</th>
                          <th>Start Date</th> 
                         <th>End Date</th>
                          <th>Package</th>
                          
                          <th>Amount</th>
                     
                          <th>Payment Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPayments.map((payment) => (
                          <tr key={payment.id}>
                            <td>{payment.email || 'N/A'}</td>
                            <td>{payment.mobileNumber || 'N/A'}</td>
                            <td>{payment.bankName || 'N/A'}</td>
                            <td>{payment.depositedBy || 'N/A'}</td>
                            <td>{payment.transactionRef || 'N/A'}</td>
                            <td>{payment.date || 'Invalid Date'}</td>
                            <td>{payment.endDate || 'Invalid Date'}</td>
                            <td>{payment.Package || 'N/A'}</td>
                          
                            <td>{payment.amount ? payment.amount.toFixed(2) : 'N/A'}</td>
                          
                            <td>{payment.paymentStatus || 'N/A'}</td>
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
