import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
// //import { 
// , getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from './firebase'; // Adjust the path as needed

import { collection, getDocs, doc, updateDoc,  addDoc } from 'firebase/firestore';

const SetupDataManager = () => {
  const [setupData, setSetupData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [eventBar, setEventBar] = useState('');
  const [contactUs, setContactUs] = useState('');
  const [partnersSponsors, setPartnersSponsors] = useState('');
  const [visitWebsite, setVisitWebsite] = useState('');
  const [status, setStatus] = useState('Active');

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'setup_data'));
      setSetupData(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, []);

  const handleEdit = (data) => {
    setSelectedData(data);
    setEventBar(data.eventBar || '');
    setContactUs(data.contactUs || '');
    setPartnersSponsors(data.partnersSponsors || '');
    setVisitWebsite(data.visitWebsite || '');
    setStatus(data.status || 'Active');
    setEditMode(true);
    setShowModal(true);
  };

  // const handleAdd = () => {
  //   setSelectedData({
  //     eventBar: '',
  //     contactUs: '',
  //     partnersSponsors: '',
  //     visitWebsite: '',
  //     status: 'Active'
  //   });
  //   setEventBar('');
  //   setContactUs('');
  //   setPartnersSponsors('');
  //   setVisitWebsite('');
  //   setStatus('Active');
  //   setEditMode(false);
  //   setShowModal(true);
  // };

  // const handleDelete = async (id) => {
  //   await deleteDoc(doc(db, 'setup_data', id));
  //   setSetupData(setupData.filter(data => data.id !== id));
  // };

  const handleToggleStatus = async (data) => {
    const newStatus = data.status === 'Active' ? 'Disabled' : 'Active';
    const dataRef = doc(db, 'setup_data', data.id);
    await updateDoc(dataRef, { status: newStatus });

    // Refresh the data list
    const querySnapshot = await getDocs(collection(db, 'setup_data'));
    setSetupData(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const newData = {
      eventBar,
      contactUs,
      partnersSponsors,
      visitWebsite,
      status
    };

    if (editMode) {
      const dataRef = doc(db, 'setup_data', selectedData.id);
      await updateDoc(dataRef, newData);
    } else {
      await addDoc(collection(db, 'setup_data'), newData);
    }
    
    const querySnapshot = await getDocs(collection(db, 'setup_data'));
    setSetupData(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setShowModal(false);
    setSelectedData(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'eventBar') setEventBar(value);
    if (name === 'contactUs') setContactUs(value);
    if (name === 'partnersSponsors') setPartnersSponsors(value);
    if (name === 'visitWebsite') setVisitWebsite(value);
    if (name === 'status') setStatus(value);
  };

  return (
    <div>
      <h3>Setup Data Manager</h3>
      {/* <Button variant="primary" onClick={handleAdd} className="mb-3">Add New Setup Data</Button> */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Event Bar</th>
            <th>Contact Us</th>
            <th>Partners/Sponsors</th>
            <th>Visit Website</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {setupData.map(data => (
            <tr key={data.id}>
              <td>{data.eventBar}</td>
              <td>{data.contactUs}</td>
              <td>{data.partnersSponsors}</td>
              <td>{data.visitWebsite}</td>
              <td>{data.status}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(data)}>Edit</Button>
                {data.status === 'Active' && (
                  <>
                    {/* <Button variant="danger" onClick={() => handleDelete(data.id)} className="ms-2">Delete</Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleToggleStatus(data)}
                      className="ms-2"
                    >
                      Disable
                    </Button> */}
                  </>
                )}
                {data.status === 'Disabled' && (
                  <Button 
                    variant="success"
                    onClick={() => handleToggleStatus(data)}
                    className="ms-2"
                  >
                    Enable
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Setup Data' : 'Add Setup Data'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3" controlId="formEventBar">
              <Form.Label>Event Bar</Form.Label>
              <Form.Control
                type="text"
                name="eventBar"
                value={eventBar}
                onChange={handleInputChange}
                placeholder="Enter event bar"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formContactUs">
              <Form.Label>Contact Us</Form.Label>
              <Form.Control
                type="text"
                name="contactUs"
                value={contactUs}
                onChange={handleInputChange}
                placeholder="Enter contact us info"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPartnersSponsors">
              <Form.Label>Partners/Sponsors</Form.Label>
              <Form.Control
                type="text"
                name="partnersSponsors"
                value={partnersSponsors}
                onChange={handleInputChange}
                placeholder="Enter partners/sponsors"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formVisitWebsite">
              <Form.Label>Visit Website</Form.Label>
              <Form.Control
                type="text"
                name="visitWebsite"
                value={visitWebsite}
                onChange={handleInputChange}
                placeholder="Enter website URL"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={status}
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

export default SetupDataManager;
