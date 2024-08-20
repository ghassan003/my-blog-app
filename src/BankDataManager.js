import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from './firebase'; // Adjust the path as needed

const BankDataManager = () => {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [bankIconUrl, setBankIconUrl] = useState(''); // For storing the bank icon URL

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'banks'));
      setBanks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, []);

  const handleEdit = (bank) => {
    setSelectedBank(bank);
    setBankIconUrl(bank.bankIcon || ''); // Load existing icon URL if any
    setEditMode(true);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedBank({
      name: '',
      accountTitle: '',
      accountNumber: '',
      status: 'Active',
      bankIcon: ''
    });
    setBankIconUrl(''); // Clear the icon URL for new bank
    setEditMode(false);
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

    // Refresh the bank list
    const querySnapshot = await getDocs(collection(db, 'banks'));
    setBanks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const data = {
      name: selectedBank.name,
      accountTitle: selectedBank.accountTitle,
      accountNumber: selectedBank.accountNumber,
      bankIcon: bankIconUrl, // Include bankIcon URL in data
      status: selectedBank.status
    };

    if (editMode) {
      const bankRef = doc(db, 'banks', selectedBank.id);
      await updateDoc(bankRef, data);
    } else {
      await addDoc(collection(db, 'banks'), data);
    }
    
    const querySnapshot = await getDocs(collection(db, 'banks'));
    setBanks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setShowModal(false);
    setSelectedBank(null);
    setBankIconUrl(''); // Clear bankIcon URL after saving
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedBank(prev => ({ ...prev, [name]: value }));
  };

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    // Implement file upload logic and get the URL
    // For simplicity, here we'll just set the file name
    // In production, upload the file to a storage service and get the URL
    if (file) {
      setBankIconUrl(URL.createObjectURL(file)); // Replace with your upload logic
    }
  };

  return (
    <div>
      <h3>Bank Data Manager</h3>
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
                <Button variant="warning" onClick={() => handleEdit(bank)}>Edit</Button>
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
          <Modal.Title>{editMode ? 'Edit Bank' : 'Add Bank'}</Modal.Title>
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

            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BankDataManager;
