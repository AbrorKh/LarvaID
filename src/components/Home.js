import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import mosquito from "../assets/mosquito1.svg";
export default function Home() {
  const { currentUser } = useAuth();

  return (
    <Container
      className=" align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <br />
      <br />
      <br />
      <br />

      <h1 className="text-center">Larva ID</h1>
      <img
        src={mosquito}
        alt="mosquito"
        width="200"
        height="200"
        style={{
          position: "center",
          textAlign: "center",
          display: "block",
          justifyContent: "center",
          alignContent: "center",
          margin: "auto",
        }}
      />
      <br />
      <h3 className="text-center">
        Welcome! Thank you for contributing to the larva identification project.
        Please navigate to the dashboard with the link below.
      </h3>
      <br />
      <br />
      {currentUser && (
        <Link to="/dashboard">
          <Button variant="outline-primary" className="w-100">
            Dashboard
            <span role="img" aria-label="arrow">
              ➡️
            </span>
          </Button>
        </Link>
      )}
      <br />
      <br />
      {currentUser && (
        <Link to="/validated">
          <Button variant="outline-secondary" className="w-100">
            Go to see already validated images
            <span role="img" aria-label="arrow">
              ➡️
            </span>
          </Button>
        </Link>
      )}
      {!currentUser && (
        <Link to="/signup">
          <Button variant="outline-primary" className="w-100">
            Register
            <br />
            <span role="img" aria-label="reg">
              📝
            </span>
          </Button>
        </Link>
      )}
      <br />
      <br />

      {!currentUser && (
        <Link to="/signin">
          <Button variant="outline-info" className="w-100">
            Sign In
            <br />
            <span role="img" aria-label="reg">
              ➕
            </span>
          </Button>
        </Link>
      )}
    </Container>
  );
}
