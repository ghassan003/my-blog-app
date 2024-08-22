import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase'; // Import Firestore
//import { requestPermission } from './firebase'; // Import Firebase setup
import { toast } from 'react-toastify';
import { Card, Row, Col, Form } from 'react-bootstrap'; // Import Bootstrap components
import SideNav from './SideNav'; // Import SideNav component
import CountdownLoader from './CountdownLoader'; // Import CountdownLoader component
import 'bootstrap/dist/css/bootstrap.min.css';
import './PaymentConfirmationPage.css'; // Import custom CSS

const PaymentConfirmationPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailFilter, setEmailFilter] = useState('');
  const [mobileFilter, setMobileFilter] = useState('');

  useEffect(() => {
    // Request notification permission when component mounts
   // requestPermission();

    const fetchPayments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'payments'));
        const paymentsList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const date = data.date;
          return {
            id: doc.id,
            ...data,
            date: date ? (date.toDate ? date.toDate() : new Date(date)) : null
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

      // Replace with the actual FCM token
      const userToken = 'USER_FCM_TOKEN'; 

      // Make a request to your backend to send the notification
      const response = await fetch('/api/sendNotification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId,
          newStatus,
          userToken
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send notification');
      }
    } catch (error) {
      toast.error('Error updating payment status: ' + error.message);
    }
  };

  const filteredPayments = payments.filter(payment =>
    (payment.email || '').toLowerCase().includes(emailFilter.toLowerCase()) &&
    (payment.mobileNumber || '').toLowerCase().includes(mobileFilter.toLowerCase())
  );

  if (loading) return <CountdownLoader />;

  return (
    <div className="d-flex">
      <SideNav />
      <div className="content-wrapper">
        <h2 className="text-center">User Payment Confirmation</h2>
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col md={4}>
                <Form.Group controlId="emailFilter">
                  <Form.Label>Filter by Email:</Form.Label>
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
                  <Form.Label>Filter by Mobile Number:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter mobile number"
                    value={mobileFilter}
                    onChange={(e) => setMobileFilter(e.target.value)}
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
  );
};

export default PaymentConfirmationPage;
