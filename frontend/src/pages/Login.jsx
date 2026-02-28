import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // TODO: Add API call
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="glass-card border-0 hover-shadow rounded-4">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2
                  className="fw-bold fs-1 mb-2"
                  style={{ color: "var(--accent-primary)" }}
                >
                  Welcome Back
                </h2>
                <p className="text-secondary">
                  Please enter your details to sign in
                </p>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="email">
                  <Form.Label className="small text-secondary mb-2">
                    Email Address
                  </Form.Label>
                  <InputGroup className="overflow-hidden rounded-3">
                    <InputGroup.Text className="border-0">
                      <i className="bi bi-envelope"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      className="py-2 border-0"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Form.Label className="small text-secondary mb-0">
                      Password
                    </Form.Label>
                    <Link
                      to="/forgot-password"
                      className="small text-decoration-none"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <InputGroup className="overflow-hidden rounded-3">
                    <InputGroup.Text className="border-0">
                      <i className="bi bi-lock"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className="py-2 border-0"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-3 mb-4 rounded-3 fw-bold"
                >
                  Login
                </Button>

                <div className="text-center">
                  <p className="text-secondary small mb-0">
                    New to Finance Tracker?{" "}
                    <Link to="/register" className="fw-bold">
                      Create an account
                    </Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
