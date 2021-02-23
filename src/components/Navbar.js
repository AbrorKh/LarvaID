import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/mosquito1.svg";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function Navbar() {
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
    <nav className="site-nav family-sans navbar navbar-expand bg-secondary navbar-dark higher fixed-top">
      <div className="container-fluid">
        <div className="navbar-brand text-center">
          <Link to="/">
            <img src={logo} alt="logoimg" width="125" height="40" />
          </Link>
        </div>
        <div className="navbar-nav ml-auto">
          {currentUser && (
            <Link className="nav-item nav-link" to="/validated">
              Validated Images
            </Link>
          )}
          {currentUser && (
            <Link className="nav-item nav-link" to="/profile">
              Profile
            </Link>
          )}
          {currentUser && (
            <Link className="nav-item nav-link" to="/" onClick={handleLogout}>
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
