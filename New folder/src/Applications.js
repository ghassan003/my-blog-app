
import React, { useEffect, useState } from "react";
import { useParams, useNavigate,  } from "react-router-dom";
import { getFirestore, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Container, Card, Button, Modal } from "react-bootstrap";
import SideNav from "./SideNav";
import CountdownLoader from "./CountdownLoader";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
import "./Applications.css";

const Applications = () => {
    const { jobId } = useParams();
   // const location = useLocation();
   // const { company, status, title } = location.state || {};
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userDetails, setUserDetails] = useState(null); // State to hold user details
    const [showModal, setShowModal] = useState(false); // Modal visibility
    const db = getFirestore();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const jobDocRef = doc(db, "appliedJobs", jobId);
                const userApplicationsCollection = collection(jobDocRef, "userId");
                const userApplicationsSnapshot = await getDocs(userApplicationsCollection);
                const applicationList = userApplicationsSnapshot.docs.map((doc) => ({
                    userId: doc.id,
                    ...doc.data(),
                }));

                setApplications(applicationList);
            } catch (error) {
                setError("Failed to load applications.");
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [jobId, db]);

    const handleViewUserDetails = async (userId) => {
        try {
            const userDocRef = doc(db, "users", userId);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                setUserDetails(userDoc.data());
                setShowModal(true);
            } else {
                console.error("No user data found for ID:", userId);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setUserDetails(null);
    };

    // // Function to generate PDF
    // const handleGeneratePDF = () => {
    //     if (!userDetails) return;

    //     const doc = new jsPDF();

    //     doc.setFontSize(12);
    //     doc.text("User Details", 20, 20);
    //     doc.text(`Full Name: ${userDetails.fullName}`, 20, 30);
    //     doc.text(`Phone Number: ${userDetails.phoneNumber}`, 20, 40);
    //     doc.text(`Email: ${userDetails.email}`, 20, 50);
    //     doc.text(`Batch: ${userDetails.batch}`, 20, 60);
    //     doc.text(`Profession: ${userDetails.profession}`, 20, 70);
    //     doc.text(`Education: ${userDetails.education}`, 20, 80);
    //     doc.text(`Address: ${userDetails.address}`, 20, 90);
    //     doc.text(`Field: ${userDetails.field}`, 20, 100);
    //     doc.text(`Experience: ${userDetails.experience}`, 20, 110);

    //     doc.save(`${userDetails.fullName}_Details.pdf`);
    // };

    
    // const handleGeneratePDF = () => {
    //     if (!userDetails) return;
    
    //     const doc = new jsPDF();
    
    //     // Title
    //     doc.setFontSize(16);
    //     doc.text("User Details", 14, 15);
    
    //     // Define the table columns and rows
    //     const columns = ["Field", "Details"];
    //     const rows = [
    //         ["Full Name", userDetails.fullName || ""],
    //         ["Phone Number", userDetails.phoneNumber || ""],
    //         ["Email", userDetails.email || ""],
    //         ["Batch", userDetails.batch || ""],
    //         ["Profession", userDetails.profession || ""],
    //         ["Education", userDetails.education || ""],
    //         ["Address", userDetails.address || ""],
    //         ["Field", userDetails.field || ""],
    //         ["Experience", userDetails.experience || ""]
    //     ];
    
    //     // Add the table to the PDF
    //     doc.autoTable({
    //         startY: 25,
    //         head: [columns],
    //         body: rows,
    //         theme: "striped",
    //         headStyles: { fillColor: [22, 160, 133] },
    //         margin: { left: 14, right: 14 }
    //     });
    
    //     // Save the PDF
    //     doc.save(`${userDetails.fullName}_Details.pdf`);
    // };
    


    if (loading) {
        return <CountdownLoader />;
    }

    if (error) {
        return <p className="text-center text-red-500 mt-8">{error}</p>;
    }

    return (
        <div className="d-flex">
            <div className="sidebar-wrapper">
                <SideNav />
            </div>
            <div className="main-content flex-grow-1">
                <Container className="mt-4">
                    <Card>
                        <Card.Header className="bg-primary text-white text-center">
                            <h3>Total Applications: {applications.length}</h3>
                        </Card.Header>
                        <Card.Body>
                            <div className="grid-container">
                                {applications.length === 0 ? (
                                    <p className="text-center" style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}>
                                        No Applicants Applied for the job. 😢
                                    </p>
                                ) : (
                                    applications.map((application) => (
                                        <Card key={application.userId} className="application-card">
                                            <Card.Body>
                                                <p><strong>Applicant Name:</strong> {application.userName}</p>
                                                <p><strong>Applicant Contact Number:</strong> {application.userPhoneNumber}</p>
                                                <p><strong>Applicant Email:</strong> {application.userEmail}</p>
                                                <p><strong>Application Date:</strong> {new Date(application.applicationDate).toLocaleDateString()}</p>
                                                <Button
                                                    variant="info"
                                                    onClick={() => handleViewUserDetails(application.userId)}
                                                >
                                                    View Details
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                    <Button
                        variant="primary"
                        onClick={() => navigate("/job-management")}
                        className="mb-3 mt-3"
                    >
                        Back to Job Management
                    </Button>
                </Container>

                {/* Modal for viewing user details */}
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>User Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {userDetails ? (
                            <div>
                                <p><strong>Full Name:</strong> {userDetails.fullName}</p>
                                <p><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
                                <p><strong>Email:</strong> {userDetails.email}</p>
                                <p><strong>Batch:</strong> {userDetails.batch}</p>
                                <p><strong>Profession:</strong> {userDetails.profession}</p>
                                <p><strong>Education:</strong> {userDetails.education}</p>
                                <p><strong>Address:</strong> {userDetails.address}</p>
                                <p><strong>Field:</strong> {userDetails.field}</p>
                                <p><strong>Experience:</strong> {userDetails.experience}</p>
                            </div>
                        ) : (
                            <p>No details available for this user.</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                        {/* <Button variant="primary" onClick={handleGeneratePDF}>
                            Generate PDF
                        </Button> */}
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Applications;



// import React, { useEffect, useState } from "react";
// import { getFirestore, collection, getDocs } from "firebase/firestore";
// import { Container, Card, Button, Modal } from "react-bootstrap";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import "./Applications.css";

// const Applications = () => {
//     const [applications, setApplications] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const db = getFirestore();

//     // Fetch all users data from the "users" collection
//     useEffect(() => {
//         const fetchAllUsers = async () => {
//             try {
//                 const usersCollection = collection(db, "users");
//                 const userSnapshot = await getDocs(usersCollection);
//                 const userList = userSnapshot.docs.map((doc) => ({
//                     userId: doc.id,
//                     ...doc.data(),
//                 }));
//                 setApplications(userList);
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             }
//         };

//         fetchAllUsers();
//     }, [db]);

//     // Generate a single PDF containing all users' data
//     const handleGenerateAllUsersPDF = () => {
//         const doc = new jsPDF();
//         doc.setFontSize(16);
//         doc.text("All Users Details", 14, 15);

//         const columns = [ "Full Name", "Phone Number", "Email", "Batch", "Profession", "Education", "Address", "Field", "Experience"];
//         const rows = applications.map((user) => [
//             // user.userId,
//             user.fullName || "",
//             user.phoneNumber || "",
//             user.email || "",
//             user.batch || "",
//             user.profession || "",
//             user.education || "",
//             user.address || "",
//             user.field || "",
//             user.experience || ""
//         ]);

//         doc.autoTable({
//             startY: 25,
//             head: [columns],
//             body: rows,
//             theme: "striped",
//             headStyles: { fillColor: [22, 160, 133] },
//             margin: { left: 14, right: 14 }
//         });

//         // Save the PDF
//         doc.save("All_Users_Details.pdf");
//     };

//     return (
//         <div className="d-flex">
//             <Container className="mt-4">
//                 <Card>
//                     <Card.Header className="bg-primary text-white text-center">
//                         <h3>Total Users: {applications.length}</h3>
//                     </Card.Header>
//                     <Card.Body>
//                         <div className="grid-container">
//                             {applications.map((user) => (
//                                 <Card key={user.userId} className="application-card">
//                                     <Card.Body>
//                                         <p><strong>Full Name:</strong> {user.fullName}</p>
//                                         <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
//                                         <p><strong>Email:</strong> {user.email}</p>
//                                     </Card.Body>
//                                 </Card>
//                             ))}
//                         </div>
//                     </Card.Body>
//                 </Card>
//                 <Button
//                     variant="primary"
//                     onClick={handleGenerateAllUsersPDF}
//                     className="mb-3 mt-3"
//                 >
//                     Generate PDF for All Users
//                 </Button>
//             </Container>
//         </div>
//     );
// };

// export default Applications;
