import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPhoneAlt } from "react-icons/fa";

function Navbar() {
  const currentUser = useSelector((state) => state.auth.user);

  const tok = useSelector((state) => state.auth.token);
  const authenticated = useSelector((state) => state.auth.authenticated);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Fabricare
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center"
                  href="tel:+18558003972"
                >
                  <FaPhoneAlt className="me-1" /> +1 855-800-3972
                </a>
              </li>

              {authenticated ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/dashboard">
                    Hello, {currentUser.name}
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
