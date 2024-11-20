import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';
import { toast } from 'react-toastify';

const PaymentForm = ({ paymentId, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    depositedBy: '',
    transactionRef: '',
    date: '',
    bankName: '' // Add the new field here
  });

  useEffect(() => {
    if (paymentId) {
      const fetchPayment = async () => {
        const paymentDoc = doc(db, 'payments', paymentId);
        const docSnapshot = await getDoc(paymentDoc);
        if (docSnapshot.exists()) {
          setFormData(docSnapshot.data());
        }
      };
      fetchPayment();
    }
  }, [paymentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (paymentId) {
        await updateDoc(doc(db, 'payments', paymentId), formData);
      } else {
        await addDoc(collection(db, 'payments'), formData);
      }
      toast.success('Payment details saved successfully');
      onSubmit(formData);
    } catch (error) {
      toast.error('Error saving payment details: ' + error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formDepositedBy">
        <Form.Label>Deposited By</Form.Label>
        <Form.Control
          type="text"
          name="depositedBy"
          value={formData.depositedBy}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formTransactionRef">
        <Form.Label>Transaction Reference Number</Form.Label>
        <Form.Control
          type="text"
          name="transactionRef"
          value={formData.transactionRef}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formDate">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBankName">
        <Form.Label>Bank Name</Form.Label>
        <Form.Control
          type="text"
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Save
      </Button>
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
    </Form>
  );
};

export default PaymentForm;
