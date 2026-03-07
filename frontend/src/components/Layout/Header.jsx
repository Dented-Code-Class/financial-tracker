import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Header = () => {
  const { user, setUser } = useUser();

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className="shadow-sm py-3"
      style={{
        background: "rgba(10, 25, 47, 0.85)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(100, 255, 218, 0.1)",
      }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fs-3">
          <span className="fw-bold" style={{ color: "var(--accent-primary)" }}>
            Finance
          </span>
          <span style={{ color: "var(--text-primary)" }}>Tracker</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="border-0 shadow-none"
        >
          <i className="bi bi-list text-primary fs-2"></i>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* Logged in menu */}

            {user?._id ? (
              <>
                <Nav.Link as={NavLink} to="/dashboard" className="mx-2">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={NavLink} to="/transactions" className="mx-2">
                  Transactions
                </Nav.Link>
                <Button
                  onClick={() => {
                    //1. remove user from user context
                    setUser({});
                    //2. remove token from local storage
                    localStorage.removeItem("token");
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* Public menu */}
                <Nav.Link as={NavLink} to="/login" className="mx-2">
                  Login
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/register"
                  className="btn btn-primary ms-lg-3 px-4 rounded-pill"
                >
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
