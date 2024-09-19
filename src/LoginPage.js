import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import requestNotificationPermission from '../src/firebase/firebase.js'
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    }
  },[])
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Log in the user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      const user = userCredential.user;
      const userUID = user.uid;

      console.log("User UID:", userUID); // Log the user's UID

      // Fetch all users from the 'webUsers' collection
      const usersCollection = collection(db, "webUsers");
      const querySnapshot = await getDocs(usersCollection);
      console.log("querySnapshot:", querySnapshot.docs);
      // Filter the specific user using the logged-in user's UID
      let filteredUser = null;
      querySnapshot.docs.forEach((doc) => {
        const userData = doc.data();
        console.log("user data:", userData);
        // Compare each document's UID with the logged-in user's UID
        if (userData.uid === userUID) {
          filteredUser = { id: userData.uid, ...userData }; // Store the matched user data
          console.log("Filtered User:", filteredUser);
        }
      });

      // Check if user data is found
      if (filteredUser) {
        const role = filteredUser.role;
        console.log("User role:", role);

        // Store user session and role in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({ username: user.email, role })
        );

        // Redirect to dashboard
        // useEffect(() => {
     
        requestNotificationPermission(user.email);
        navigate("/dashboard");

        // }, []);
      } else {
        console.error("No user data found for UID:", userUID);
        setError("User data not found in the database");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid credentials or user not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <Card className="shadow-lg border-light">
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="border-primary"
                  />
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-primary"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mt-3"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
