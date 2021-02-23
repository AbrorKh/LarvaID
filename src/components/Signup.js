import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { firestore } from "../firebase";

export default function Signup() {
  const emailRef = useRef();
  const nameRef = useRef();
  const occupationRef = useRef();
  const experienceRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser, getCurrentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  var nameToStore = "";
  var emailToStore = "";
  var occupationToStore = "";
  var experienceToStore = "";

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match⚠️");
    }
    nameToStore = nameRef.current.value;
    emailToStore = emailRef.current.value;
    occupationToStore = occupationRef.current.value;
    experienceToStore = experienceRef.current.value;
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value).then(
        () => {
          firestore.collection("users").doc(emailRef.current.value).set({
            name: nameToStore,
            email: emailToStore,
            occupation: occupationToStore,
            experience: experienceToStore,
            currentKey: 81,
          });
          history.push("/");
        }
      );
    } catch (e) {
      console.log(e);
      setError("Failed to create an account😞");
    }
    setLoading(false);
  }

  return (
    <>
      <Container
        className="align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <br />
        <br />
        <br />
        <br />
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Register</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="name">
                <Form.Label>Username</Form.Label>
                <Form.Control ref={nameRef} required />
              </Form.Group>
              <Form.Group id="occupation">
                <Form.Label>Occupation</Form.Label>
                <Form.Control ref={occupationRef} required />
              </Form.Group>
              <Form.Group id="experience">
                <Form.Label>Experience Level</Form.Label>
                <Form.Control ref={experienceRef} required />
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
