import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Custominputs from "../components/CustomInputs/Custominputs";
import useForm from "../hooks/useForm";

const Registration = () => {
  const navigate = useNavigate();
  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { formData, setFormData, handleChange } = useForm(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        },
      );

      const data = await response.json();

      console.log("Response Data:", data);

      if (response.ok) {
        alert("Registration successful");
        setFormData(initialState);
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const inputFields = [
    {
      label: "Username",
      icon: <i className="bi bi-person"></i>,
      type: "text",
      name: "username",
      placeholder: "John Doe",
      value: formData.username,
      onChange: handleChange,
      required: true,
    },
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
    {
      label: "Confirm Password",
      icon: <i className="bi bi-shield-lock"></i>,
      type: "password",
      name: "confirmPassword",
      placeholder: "*****",
      value: formData.confirmPassword,
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
                  Join Us
                </h2>
                <p className="text-secondary">
                  Create your account to start tracking
                </p>
              </div>

              <Form onSubmit={handleSubmit}>
                {inputFields.map((i, index) => (
                  <Custominputs key={index} {...i} />
                ))}

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-3 mb-4 rounded-3 fw-bold"
                >
                  Register
                </Button>

                <div className="text-center">
                  <p className="text-secondary small mb-0">
                    Already have an account?{" "}
                    <Link to="/login" className="fw-bold">
                      Login here
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

export default Registration;
