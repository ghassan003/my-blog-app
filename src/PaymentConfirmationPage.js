import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { toast } from 'react-toastify';
import PaymentForm from './PaymentForm'; // Import PaymentForm component
import { Modal, Button } from 'react-bootstrap'; // Import React-Bootstrap components
import SideNav from './SideNav'; // Import SideNav component

const PaymentConfirmationPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

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
            date: date ? (date.toDate ? date.toDate() : new Date(date)) : null // Handle date
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

  const handleShowAddForm = () => setShowAddForm(true);
  const handleCloseAddForm = () => setShowAddForm(false);

  const handleAddPayment = async (paymentData) => {
    try {
      await addDoc(collection(db, 'payments'), paymentData);
      toast.success('Payment added successfully');
      handleCloseAddForm(); // Close the form modal after adding payment
      // Refresh the payments list
      const querySnapshot = await getDocs(collection(db, 'payments'));
      const paymentsList = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const date = data.date;
        return {
          id: doc.id,
          ...data,
          date: date ? (date.toDate ? date.toDate() : new Date(date)) : null // Handle date
        };
      });
      setPayments(paymentsList);
    } catch (error) {
      toast.error('Error adding payment: ' + error.message);
    }
  };

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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="d-flex">
      <SideNav /> {/* Include the SideNav component */}
      <div className="content-wrapper">
        <h2 className="text-center">User Payment Confirmation</h2>
        <Button className="btn btn-success mb-3" onClick={handleShowAddForm}>
          Add New Payment
        </Button>
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>Deposited By</th>
              <th>Transaction Reference Number</th>
              <th>Date</th>
              <th>Bank Name</th>
              <th>Bank Branch</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.depositedBy}</td>
                <td>{payment.transactionRef}</td>
                <td>{payment.date ? new Date(payment.date).toLocaleDateString() : 'N/A'}</td>
                <td>{payment.bankName}</td> {/* Bank Name column */}
                <td>{payment.bankBranch}</td> {/* Bank Branch column */}
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

        {/* Payment Form Modal for Adding New Payment */}
        <Modal show={showAddForm} onHide={handleCloseAddForm}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PaymentForm onSubmit={handleAddPayment} onClose={handleCloseAddForm} />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;
 