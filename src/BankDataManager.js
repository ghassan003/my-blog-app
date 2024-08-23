import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Alert } from 'react-bootstrap';
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase'; // Adjust the path as needed

const BankDataManager = () => {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bankIconUrl, setBankIconUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState({ show: false, message: '' });

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'banks'));
      setBanks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, []);

  const handleAdd = () => {
    setSelectedBank({
      name: '',
      accountTitle: '',
      accountNumber: '',
      status: 'Active',
      bankIcon: ''
    });
    setBankIconUrl(''); 
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'banks', id));
    setBanks(banks.filter(bank => bank.id !== id));
  };

  const handleToggleStatus = async (bank) => {
    const newStatus = bank.status === 'Active' ? 'Disabled' : 'Active';
    const bankRef = doc(db, 'banks', bank.id);
    await updateDoc(bankRef, { status: newStatus });

    const querySnapshot = await getDocs(collection(db, 'banks'));
    setBanks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (loading) return; 

    if (!bankIconUrl) {
      setShowPopup({ show: true, message: 'Bank Icon URL is not set.' });
      return;
    }

    setLoading(true);

    const data = {
      name: selectedBank.name,
      accountTitle: selectedBank.accountTitle,
      accountNumber: selectedBank.accountNumber,
      bankIcon: bankIconUrl,
      status: selectedBank.status
    };

    try {
      await addDoc(collection(db, 'banks'), data);

      const querySnapshot = await getDocs(collection(db, 'banks'));
      setBanks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setShowModal(false);
      setSelectedBank(null);
      setBankIconUrl('');
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedBank(prev => ({ ...prev, [name]: value }));
  };

  const handleIconUpload = async (e) => {
    const file = e.target.files[0];
    
    if (file && file.type === 'image/png') {
      try {
        const storageRef = ref(storage, `bankIcons/${file.name}`);
        const uploadResult = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(uploadResult.ref);
        setBankIconUrl(url);
        setShowPopup({ show: false, message: '' });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      setShowPopup({ show: true, message: 'Please upload a .png file.' });
      e.target.value = null;
    }
  };

  const handleClosePopup = () => setShowPopup({ show: false, message: '' });

  return (
    <div>
       <h3 className="text-center">Bank Data Manager</h3>
      <Button variant="primary" onClick={handleAdd} className="mb-3">Add New Bank</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Bank Name</th>
            <th>Account Title</th>
            <th>Account Number</th>
            <th>Bank Icon</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {banks.map(bank => (
            <tr key={bank.id}>
              <td>{bank.name}</td>
              <td>{bank.accountTitle}</td>
              <td>{bank.accountNumber}</td>
              <td>
                {bank.bankIcon && <img src={bank.bankIcon} alt="Bank Icon" style={{ width: '50px', height: '50px' }} />}
              </td>
              <td>{bank.status}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(bank.id)}>Delete</Button>
                <Button
                  variant={bank.status === 'Active' ? 'secondary' : 'success'}
                  onClick={() => handleToggleStatus(bank)}
                >
                  {bank.status === 'Active' ? 'Disable' : 'Enable'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Bank</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3" controlId="formBankName">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={selectedBank?.name || ''}
                onChange={handleInputChange}
                placeholder="Enter bank name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAccountTitle">
              <Form.Label>Account Title</Form.Label>
              <Form.Control
                type="text"
                name="accountTitle"
                value={selectedBank?.accountTitle || ''}
                onChange={handleInputChange}
                placeholder="Enter account title"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAccountNumber">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                name="accountNumber"
                value={selectedBank?.accountNumber || ''}
                onChange={handleInputChange}
                placeholder="Enter account number"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBankIcon">
              <Form.Label>Bank Icon</Form.Label>
              <Form.Control
                type="file"
                onChange={handleIconUpload}
              />
              {bankIconUrl && <img src={bankIconUrl} alt="Bank Icon Preview" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
            </Form.Group>

            {/* Popup message for invalid file type */}
            {showPopup.show && (
              <Alert variant="danger" onClose={handleClosePopup} dismissible>
                {showPopup.message}
              </Alert>
            )}

            <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={selectedBank?.status || ''}
                onChange={handleInputChange}
              >
                <option value="Active">Active</option>
                <option value="Disabled">Disabled</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BankDataManager;
