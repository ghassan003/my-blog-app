// import React, { useState, useEffect } from "react";
// import SideNav from "./SideNav";
// import CountdownLoader from "./CountdownLoader"; // Import CountdownLoader
// import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
// import { db } from "./firebase"; // Import your Firestore instance
// import "./UserWebManagement.css"; // Add a CSS file for additional styling
// import { Card, Modal, Button, Form, Container, Row, Col } from "react-bootstrap";

// const PaymentConfirmationPage = () => {
//   const [payments, setPayments] = useState([]);
//   // const [showEditModal, setShowEditModal] = useState(false);
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [emailFilter, setEmailFilter] = useState("");
//   const [mobileFilter, setMobileFilter] = useState("");
//   const [depositedByFilter, setDepositedByFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");  
//   const [paidCount, setPaidCount] = useState(0);
//   const [pendingCount, setPendingCount] = useState(0);
//   // const [expiredCount, setExpiredCount] = useState(0);
//   const [loading, setLoading] = useState(true);
  
//   const paymentStatuses = ["PAID", "PENDING", "EXPIRED", "UNPAID","REJECT"]; // Define payment statuses

//   useEffect(() => {
    
//     const fetchPayments = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "payments"));
//         const today = new Date();

//         let paid = 0;
//         let pending = 0;
//         // let expired = 0;

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

//             if (payment.paymentStatus === "PENDING") {
//               pending += 1;
//               await updateDoc(doc(db, "payments", payment.id), {
//                 paymentStatus: "PENDING",
//               });
//             } else if (payment.paymentStatus === "UNPAID") {
//               pending += 1;
//               await updateDoc(doc(db, "payments", payment.id), {
//                 paymentStatus: "UNPAID",
//               });
//             }
            
//             else if (payment.paymentStatus === "REJECT") {
//               pending += 1;
//               await updateDoc(doc(db, "payments", payment.id), {
//                 paymentStatus: "REJECT",
//               });
//             } else if (endDate < today) {
//             //  expired += 1;
//               await updateDoc(doc(db, "payments", payment.id), {
//                 paymentStatus: "EXPIRED",
//               });
//             } else if (endDate >= today) {
//               paid += 1;
//               await updateDoc(doc(db, "payments", payment.id), {
//                 paymentStatus: "PAID",
//               });
//             }

//             return payment;
//           })
//         );

//         setPaidCount(paid);
//         setPendingCount(pending);
//         // setExpiredCount(expired);
//         setPayments(paymentData);
//       } catch (error) {
//         console.error("Error fetching payments: ", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayments();
//   }, []); // Only run on mount

//   const formatDate = (timestamp) => {
//     if (!timestamp) return "";
//     if (timestamp.toDate) {
//       return timestamp.toDate().toISOString().split("T")[0];
//     }
//     return new Date(timestamp).toISOString().split("T")[0];
//   };

//   const [filteredPayments, setFilteredPayments] = useState(payments);

//   useEffect(() => {
//     const newFilteredPayments = payments.filter((payment) => {
//       return (
//         (statusFilter === "" || payment.paymentStatus === statusFilter) && 
//         (!emailFilter || payment.email.toLowerCase().includes(emailFilter.toLowerCase())) && 
//         (!mobileFilter || payment.mobileNumber.includes(mobileFilter)) && 
//         (!depositedByFilter || payment.depositedBy.toLowerCase().includes(depositedByFilter.toLowerCase()))
//       );
//     });
//     setFilteredPayments(newFilteredPayments);
//   }, [payments, statusFilter, emailFilter, mobileFilter, depositedByFilter]);

//   const handleStatusFilterChange = (event) => {
//     setStatusFilter(event.target.value);
//   };

//   const handleStatusUpdateClick = (payment) => {
//     setSelectedPayment(payment);
//     setShowStatusModal(true);
//   };

//   // const handleCloseEditModal = () => {
//   //   setShowEditModal(false);
//   //   setSelectedPayment(null);
//   // };

//   const handleCloseStatusModal = () => {
//     setShowStatusModal(false);
//     setSelectedPayment(null);
//   };

//   const handleSave = async () => {
//     if (selectedPayment) {
//       try {
//         await updatePaymentStatus(selectedPayment.id, selectedPayment.paymentStatus);
//         // Optionally show a success message
//         handleCloseStatusModal(); // Close the modal after saving
//       } catch (error) {
//         console.error("Error updating payment status: ", error);
//         // Optionally show an error message
//       }
//     }
//   };
  
//   const updatePaymentStatus = async (id, status) => {
//     const paymentDocRef = doc(db, "payments", id);
//     await updateDoc(paymentDocRef, {
//       paymentStatus: status,
//     });
//   };
  
//   // Conditional rendering moved to return statement
//   return (



//     <div className="d-flex">
//       {/* Side Navigation */}
//       <div className="sidebar-wrapper">
//         <SideNav />
//       </div>
//       {/* Main Content */}
//       <div className="main-content flex-grow-1">
//       <Container className="mt-6">
//         <div className="content-wrapper">
//           {loading ? (
//             <CountdownLoader />
//           ) : (
//             <Card className="border-0 rounded-0">
//               <Card.Header as="h5" className="bg-primary text-white font-weight-bold text-center py-3">
//                 <h2 className="mb-0">Payment Confirmation Details</h2>
//               </Card.Header>
//               <Card.Body className="px-3 px-md-4">
//                 <Row className="mb-4 g-3">
//                   <Col md={6} lg={3}>
//                     <Form.Group>
//                       <Form.Label><strong>Email:</strong></Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={emailFilter}
//                         onChange={(e) => setEmailFilter(e.target.value)}
//                         placeholder="Filter by Email"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6} lg={3}>
//                     <Form.Group>
//                       <Form.Label><strong>Mobile Number:</strong></Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={mobileFilter}
//                         onChange={(e) => setMobileFilter(e.target.value)}
//                         placeholder="Filter by Mobile Number"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6} lg={3}>
//                     <Form.Group>
//                       <Form.Label><strong>Deposited By:</strong></Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={depositedByFilter}
//                         onChange={(e) => setDepositedByFilter(e.target.value)}
//                         placeholder="Filter by Deposited By"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6} lg={3}>
//                     <Form.Group>
//                       <Form.Label><strong>Payment Status</strong></Form.Label>
//                       <Form.Select
//                         value={statusFilter}
//                         onChange={handleStatusFilterChange}
//                       >
//                         <option value="">All Statuses</option>
//                         {paymentStatuses.map((status) => (
//                           <option key={status} value={status}>
//                             {status}
//                           </option>
//                         ))}
//                       </Form.Select>
//                     </Form.Group>
//                   </Col>
//                 </Row>
                
//                 <Row className="mb-4 bg-light py-3 rounded">
//                   <Col xs={4} className="text-center"><strong>Total Paid:</strong> {paidCount}</Col>
//                   <Col xs={4} className="text-center"><strong>Total Pending:</strong> {pendingCount}</Col>
// {/*                   
//                   <Col xs={4} className="text-center"><strong>Total Expired:</strong> {expiredCount}</Col> */}
//                 </Row>
                
//                 <div className="table-responsive">
//                   <table className="table table-striped table-hover">
//                     <thead className="thead-light">
//                       <tr>
//                         <th>Email</th>
//                         <th>Mobile</th>
//                         <th>Bank</th>
//                         <th>Deposited By</th>
//                         <th>Ref</th>
//                         <th>Date</th>
//                         <th>End Date</th>
//                         <th>Package</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredPayments.map((payment) => (
//                         <tr key={payment.id}>
//                           <td>{payment.email}</td>
//                           <td>{payment.mobileNumber}</td>
//                           <td>{payment.bankName}</td>
//                           <td>{payment.depositedBy}</td>
//                           <td>{payment.transactionReferenceNumber}</td>
//                           <td>{formatDate(payment.timestamp)}</td>
//                           <td>{formatDate(payment.endDate)}</td>
//                           <td>{payment.package}</td>
//                           <td>{payment.paymentStatus}</td>
//                           <td>
//                             <Button variant="warning" size="sm" onClick={() => handleStatusUpdateClick(payment)}>
//                               Update
//                             </Button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </Card.Body>
//             </Card>
//         )}

//         <Modal show={showStatusModal} onHide={handleCloseStatusModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>Update Payment Status</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group controlId="paymentStatus">
//                 <Form.Label>Status</Form.Label>
//                 <Form.Select
//                   value={selectedPayment ? selectedPayment.paymentStatus : ""}
//                   onChange={(e) => {
//                     setSelectedPayment((prev) => ({
//                       ...prev,
//                       paymentStatus: e.target.value,
//                     }));
//                   }}
//                 >
//                   {paymentStatuses.map((status) => (
//                     <option key={status} value={status}>
//                       {status}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleCloseStatusModal}>
//               Cancel
//             </Button>
//             <Button variant="primary" onClick={handleSave}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal>
//         </div>
//       </Container>
//       </div>
//     </div>




//   );
// };

// export default PaymentConfirmationPage;


import React, { useState, useEffect } from "react";
import SideNav from "./SideNav";
import CountdownLoader from "./CountdownLoader"; // Import CountdownLoader
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase"; // Import your Firestore instance
import "./UserWebManagement.css"; // Add a CSS file for additional styling
import { Card, Modal, Button, Form, Container, Row, Col } from "react-bootstrap";

const PaymentConfirmationPage = () => {
  const [payments, setPayments] = useState([]);
  // const [showEditModal, setShowEditModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [emailFilter, setEmailFilter] = useState("");
  const [mobileFilter, setMobileFilter] = useState("");
  const [depositedByFilter, setDepositedByFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");  
  const [paidCount, setPaidCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  // const [expiredCount, setExpiredCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const paymentStatuses = ["PAID", "PENDING", "EXPIRED", "UNPAID","REJECT"]; // Define payment statuses

  useEffect(() => {
    
    const fetchPayments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "payments"));
        const today = new Date();

        let paid = 0;
        let pending = 0;
        // let expired = 0;

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

            if (payment.paymentStatus === "PENDING") {
              pending += 1;
              await updateDoc(doc(db, "payments", payment.id), {
                paymentStatus: "PENDING",
              });
            } else if (payment.paymentStatus === "UNPAID") {
              pending += 1;
              await updateDoc(doc(db, "payments", payment.id), {
                paymentStatus: "UNPAID",
              });
            }
            
            else if (payment.paymentStatus === "REJECT") {
              pending += 1;
              await updateDoc(doc(db, "payments", payment.id), {
                paymentStatus: "REJECT",
              });
            } else if (endDate < today) {
            //  expired += 1;
              await updateDoc(doc(db, "payments", payment.id), {
                paymentStatus: "EXPIRED",
              });
            } else if (endDate >= today) {
              paid += 1;
              await updateDoc(doc(db, "payments", payment.id), {
                paymentStatus: "PAID",
              });
            }

            return payment;
          })
        );

        setPaidCount(paid);
        setPendingCount(pending);
        // setExpiredCount(expired);
        setPayments(paymentData);
      } catch (error) {
        console.error("Error fetching payments: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []); // Only run on mount

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    if (timestamp.toDate) {
      return timestamp.toDate().toISOString().split("T")[0];
    }
    return new Date(timestamp).toISOString().split("T")[0];
  };

  const [filteredPayments, setFilteredPayments] = useState(payments);

  useEffect(() => {
    const newFilteredPayments = payments.filter((payment) => {
      return (
        (statusFilter === "" || payment.paymentStatus === statusFilter) && 
        (!emailFilter || payment.email.toLowerCase().includes(emailFilter.toLowerCase())) && 
        (!mobileFilter || payment.mobileNumber.includes(mobileFilter)) && 
        (!depositedByFilter || payment.depositedBy.toLowerCase().includes(depositedByFilter.toLowerCase()))
      );
    });
    setFilteredPayments(newFilteredPayments);
  }, [payments, statusFilter, emailFilter, mobileFilter, depositedByFilter]);

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleStatusUpdateClick = (payment) => {
    setSelectedPayment(payment);
    setShowStatusModal(true);
  };

  // const handleCloseEditModal = () => {
  //   setShowEditModal(false);
  //   setSelectedPayment(null);
  // };

  const handleCloseStatusModal = () => {
    setShowStatusModal(false);
    setSelectedPayment(null);
  };

  const handleSave = async () => {
    if (selectedPayment) {
      try {
        // Update the status in Firestore
        await updatePaymentStatus(selectedPayment.id, selectedPayment.paymentStatus);
  
        // Refresh payments data to reflect the change
        setPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment.id === selectedPayment.id
              ? { ...payment, paymentStatus: selectedPayment.paymentStatus }
              : payment
          )
        );
  
        handleCloseStatusModal(); // Close the modal after saving
      } catch (error) {
        console.error("Error updating payment status: ", error);
      }
    }
  };
  
  // Update Firestore payment status
  const updatePaymentStatus = async (id, status) => {
    try {
      const paymentDocRef = doc(db, "payments", id);
      await updateDoc(paymentDocRef, {
        paymentStatus: status,
      });
    } catch (error) {
      console.error("Failed to update document:", error);
    }
  };
  
  
  // Conditional rendering moved to return statement
  return (



    <div className="d-flex">
      {/* Side Navigation */}
      <div className="sidebar-wrapper">
        <SideNav />
      </div>
      {/* Main Content */}
      <div className="main-content flex-grow-1">
      <Container className="mt-6">
        <div className="content-wrapper">
          {loading ? (
            <CountdownLoader />
          ) : (
            <Card className="border-0 rounded-0">
              <Card.Header as="h5" className="bg-primary text-white font-weight-bold text-center py-3">
                <h2 className="mb-0">Payment Confirmation Details</h2>
              </Card.Header>
              <Card.Body className="px-3 px-md-4">
                <Row className="mb-4 g-3">
                  <Col md={6} lg={3}>
                    <Form.Group>
                      <Form.Label><strong>Email:</strong></Form.Label>
                      <Form.Control
                        type="text"
                        value={emailFilter}
                        onChange={(e) => setEmailFilter(e.target.value)}
                        placeholder="Filter by Email"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={3}>
                    <Form.Group>
                      <Form.Label><strong>Mobile Number:</strong></Form.Label>
                      <Form.Control
                        type="text"
                        value={mobileFilter}
                        onChange={(e) => setMobileFilter(e.target.value)}
                        placeholder="Filter by Mobile Number"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={3}>
                    <Form.Group>
                      <Form.Label><strong>Deposited By:</strong></Form.Label>
                      <Form.Control
                        type="text"
                        value={depositedByFilter}
                        onChange={(e) => setDepositedByFilter(e.target.value)}
                        placeholder="Filter by Deposited By"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={3}>
                    <Form.Group>
                      <Form.Label><strong>Payment Status</strong></Form.Label>
                      <Form.Select
                        value={statusFilter}
                        onChange={handleStatusFilterChange}
                      >
                        <option value="">All Statuses</option>
                        {paymentStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row className="mb-4 bg-light py-3 rounded">
                  <Col xs={4} className="text-center"><strong>Total Paid:</strong> {paidCount}</Col>
                  <Col xs={4} className="text-center"><strong>Total Pending:</strong> {pendingCount}</Col>
{/*                   
                  <Col xs={4} className="text-center"><strong>Total Expired:</strong> {expiredCount}</Col> */}
                </Row>
                
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead className="thead-light">
                      <tr>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Bank</th>
                        <th>Deposited By</th>
                        <th>Ref</th>
                        {/* <th>Date</th> */}
                        <th>End Date</th>
                        <th>Package</th>
                        <th>Status</th>
                        <th>Actions</th>
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
                          {/* <td>{formatDate(payment.date)}</td> */}
                          <td>{formatDate(payment.endDate)}</td>
                          <td>{payment.packageMonth}</td>
                          <td>{payment.paymentStatus}</td>
                          <td>
                            <Button variant="warning" size="sm" onClick={() => handleStatusUpdateClick(payment)}>
                              Update
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
        )}

        <Modal show={showStatusModal} onHide={handleCloseStatusModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Payment Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="paymentStatus">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={selectedPayment ? selectedPayment.paymentStatus : ""}
                  onChange={(e) => {
                    setSelectedPayment((prev) => ({
                      ...prev,
                      paymentStatus: e.target.value,
                    }));
                  }}
                >
                  {paymentStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseStatusModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
      </Container>
      </div>
    </div>




  );
};

export default PaymentConfirmationPage;