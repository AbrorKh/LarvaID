import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {/* <h4>
            <strong>Name:</strong> {currentUser.uid}
          </h4> */}
          {/* <br /> */}
          <h4>
            <strong>Email:</strong> {currentUser.email}
          </h4>
          {/* <br /> */}
          {/* <h4>
            <strong>Occupation:</strong> {currentUser.occupation}
          </h4> */}
          {/* <br /> */}
          {/* <h4>
            <strong>Experience level:</strong> {currentUser.experience}
          </h4> */}

          {/* <br /> */}
          <Link to="/update-profile" className="btn btn-secondary w-30 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="outline-warning" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
