import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";
import logo from "../../../images/Group 1329.png";
import useAuth from "../../../hooks/useAuth";
import "./Navigation.css";
const Navigation = () => {
  const history = useHistory();
  const {
    currentUser: { displayName, photoURL },
    userName,
    admin,
    handleLogout,
  } = useAuth();
  return (
    <Navbar bg="light" expand="lg">
      <div className="container-fluid ">
        <NavLink className="nav-link logo w-25" to="/">
          <Navbar.Brand className="d-flex align-items-center fw-bold w-75">
            <img className="me-3 img-fluid " src={logo} alt="logoImg" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="w-100">
          <Nav
            className="ms-auto my-2 my-lg-0 d-flex align-items-center "
            navbarScroll
          >
            <NavLink className="nav-link fw-bold me-2" to="/home">
              Home
            </NavLink>
            <NavLink
              className="nav-link fw-bold me-2"
              to={`/registeredEvents/myEvents`}
            >
              My Events
            </NavLink>
            {admin && (
              <>
                <NavLink className="nav-link fw-bold me-2" to="/addEvent">
                  Add Event
                </NavLink>
                <NavLink className="nav-link fw-bold me-2" to="/manageEvents">
                  Manage All Events
                </NavLink>
                <NavLink className="nav-link fw-bold me-2" to="/admin">
                  Registered Events
                </NavLink>
                <NavLink className="nav-link fw-bold me-2" to="/makeAdmin">
                  Make Admin
                </NavLink>
              </>
            )}
            {photoURL && (
              <img
                style={{ width: "40px", borderRadius: "50%" }}
                src={photoURL}
                loading="lazy"
                alt="img"
              />
            )}
            {(displayName || userName) && (
              <span className="fw-bold me-2 px-1 py-2">
                {displayName || userName}
              </span>
            )}
            {!(displayName || userName) ? (
              <Link to="/login">
                <Button className="shadow-none" variant="primary">
                  Login
                </Button>
              </Link>
            ) : (
              <button
                onClick={() => [handleLogout(), history.push("/")]}
                type="button"
                className="btn btn-primary shadow-none rounded-pill py-2 px-3"
              >
                Log out
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Navigation;
