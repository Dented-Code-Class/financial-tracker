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
import { Link, useNavigate } from "react-router-dom";
import Custominputs from "../components/CustomInputs/Custominputs";
import useForm from "../hooks/useForm";

const Login = () => {
  const navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
  };

  // const [formData, setFormData] = useState(initialState);

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const { formData, setFormData, handleChange } = useForm(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // TODO: Add API call
    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Login successful");
        setFormData(initialState);
        // store token at the local storage
        const token = data.token;
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const inputFields = [
    {
      label: "Email Address",
      icon: <i className="bi bi-envelope"></i>,
      type: "email",
      name: "email",
      placeholder: "name@example.com",
      value: formData.email,
      onChange: handleChange,
      required: true,
    },
    {
      label: "Password",
      icon: <i className="bi bi-lock"></i>,
      type: "password",
      name: "password",
      placeholder: "*****",
      value: formData.password,
      onChange: handleChange,
      required: true,
    },
  ];

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
                {inputFields.map((i) => (
                  <Custominputs {...i} />
                ))}

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-3 mb-4 rounded-3 fw-bold"
                >
                  Login
                </Button>

                <div className="text-center">
                  <p className="text-secondary small mb-0">
                    New to Finance Tracker?
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
