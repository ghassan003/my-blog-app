import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form, Container, Row, Col, Card } from "react-bootstrap";
import { db } from "./firebase"; // Adjust the path as needed
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";

const SetupDataManager = () => {
  const [setupData, setSetupData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    eventBar: "",
    contactUs: "",
    partnersSponsors: "",
    visitWebsite: "",
    status: "Active",
    telegram: "",
    learnMore: "",
    paidBar: "",
    unpaidBar: "",
    businessLeadPage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "setup_data"));
      setSetupData(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    fetchData();
  }, []);

  const handleEdit = (data) => {
    setSelectedData(data);
    setFormData({
      eventBar: data.eventBar || "",
      contactUs: data.contactUs || "",
      partnersSponsors: data.partnersSponsors || "",
      visitWebsite: data.visitWebsite || "",
      status: data.status || "Active",
      telegram: data.telegram || "",
      learnMore: data.learnMore || "",
      paidBar: data.paidBar || "",
      unpaidBar: data.unpaidBar || "",
      businessLeadPage: data.businessLeadPage || "",
    });
    setEditMode(true);
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        if (!selectedData || !selectedData.id) {
          throw new Error("No selected data available for update.");
        }
        const dataRef = doc(db, "setup_data", selectedData.id);
        await updateDoc(dataRef, formData);
      } else {
        await addDoc(collection(db, "setup_data"), formData);
      }

      const querySnapshot = await getDocs(collection(db, "setup_data"));
      setSetupData(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setShowModal(false);
      setSelectedData(null);
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToggleStatus = async (data) => {
    const newStatus = data.status === "Active" ? "Disabled" : "Active";
    const dataRef = doc(db, "setup_data", data.id);
    await updateDoc(dataRef, { status: newStatus });

    const querySnapshot = await getDocs(collection(db, "setup_data"));
    setSetupData(
      querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h3 className="text-center bg-secondary text-white py-2 rounded">
            Setup Data Manager
          </h3>
        </Col>
      </Row>
      {setupData.map((data) => (
        <Card key={data.id} className="mb-4">
          <Card.Header className="d-flex justify-content-between align-items-center bg-light">
            <h5 className="mb-0">Setup Data</h5>
            <div>
              <Button
                variant="warning"
                onClick={() => handleEdit(data)}
                className="me-2"
              >
                Edit
              </Button>
              {data.status === "Disabled" && (
                <Button
                  variant="success"
                  onClick={() => handleToggleStatus(data)}
                >
                  Enable
                </Button>
              )}
            </div>
          </Card.Header>
          <Card.Body>
            <Table responsive striped bordered hover>
              <tbody>
                <tr>
                <th style={{ backgroundColor: 'white', color: 'black' }}>Paid Bar</th>
                  <td>{data.paidBar}</td>
                </tr>
                <tr>
                <th style={{ backgroundColor: 'white', color: 'black' }}>Un-paid Bar</th>
                  <td>{data.unpaidBar}</td>
                </tr>
                <tr>
                <th style={{ backgroundColor: 'white', color: 'black' }}>Business Lead</th>
                  <td>{data.businessLeadPage}</td>
                </tr>
                <tr>
                <th style={{ backgroundColor: 'white', color: 'black' }}>Event Bar</th>
                  <td>{data.eventBar}</td>
                </tr>
                <tr>
                <th style={{ backgroundColor: 'white', color: 'black' }}>Contact Us</th>
                  <td>{data.contactUs}</td>
                </tr>
                <tr>
                <th style={{ backgroundColor: 'white', color: 'black' }}>Partners/Sponsors</th>
                  <td>{data.partnersSponsors}</td>
                </tr>
                <tr>
                <th style={{ backgroundColor: 'white', color: 'black' }}>Visit Website</th>
                  <td>{data.visitWebsite}</td>
                </tr>
                <tr>
                <th style={{ backgroundColor: 'white', color: 'black' }}>Telegram</th>
                  <td>{data.telegram}</td>
                </tr>
                <tr>
                <th style={{ backgroundColor: 'white', color: 'black' }}>Learn More</th>
                  <td>{data.learnMore}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      ))}

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>
            {editMode ? "Edit Setup Data" : "Add Setup Data"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formEventBar">
                  <Form.Label>Event Bar</Form.Label>
                  <Form.Control
                    type="text"
                    name="eventBar"
                    value={formData.eventBar}
                    onChange={handleInputChange}
                    placeholder="Enter event bar"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formContactUs">
                  <Form.Label>Contact Us</Form.Label>
                  <Form.Control
                    type="text"
                    name="contactUs"
                    value={formData.contactUs}
                    onChange={handleInputChange}
                    placeholder="Enter contact us info"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formPartnersSponsors">
                  <Form.Label>Partners/Sponsors</Form.Label>
                  <Form.Control
                    type="text"
                    name="partnersSponsors"
                    value={formData.partnersSponsors}
                    onChange={handleInputChange}
                    placeholder="Enter partners/sponsors"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formVisitWebsite">
                  <Form.Label>Visit Website</Form.Label>
                  <Form.Control
                    type="text"
                    name="visitWebsite"
                    value={formData.visitWebsite}
                    onChange={handleInputChange}
                    placeholder="Enter website URL"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formTelegram">
                  <Form.Label>Telegram</Form.Label>
                  <Form.Control
                    type="text"
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleInputChange}
                    placeholder="Enter Telegram handle or link"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formLearnMore">
                  <Form.Label>Learn More</Form.Label>
                  <Form.Control
                    type="text"
                    name="learnMore"
                    value={formData.learnMore}
                    onChange={handleInputChange}
                    placeholder="Enter more info link"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formPaidBar">
                  <Form.Label>Paid Bar</Form.Label>
                  <Form.Control
                    type="text"
                    name="paidBar"
                    value={formData.paidBar}
                    onChange={handleInputChange}
                    placeholder="Enter Paid Bar"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formUnpaidBar">
                  <Form.Label>Unpaid Bar</Form.Label>
                  <Form.Control
                    type="text"
                    name="unpaidBar"
                    value={formData.unpaidBar}
                    onChange={handleInputChange}
                    placeholder="Enter Unpaid Bar"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formBusinessLeadPage">
              <Form.Label>Business Lead Page</Form.Label>
              <Form.Control
                type="text"
                name="businessLeadPage"
                value={formData.businessLeadPage}
                onChange={handleInputChange}
                placeholder="Enter Business Lead Page"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default SetupDataManager;