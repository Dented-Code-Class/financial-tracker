import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

const QuickAddTransaction = () => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Adding transaction (static placeholder):", formData);
    // In a real app, this would hit an API endpoint or dispatch an action
    alert("Transaction added (static demo)");
    setFormData({
      description: "",
      amount: "",
      type: "expense",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <Card className="shadow-sm h-100 border-0" style={{ background: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(10px)" }}>
      <Card.Body>
        <Card.Title className="mb-4" style={{ color: "var(--text-primary)" }}>Quick Add</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--text-secondary)" }}>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="e.g. Groceries"
              value={formData.description}
              onChange={handleChange}
              required
              style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--text-secondary)" }}>Amount ($)</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              placeholder="0.00"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0.01"
              step="0.01"
              style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "var(--text-secondary)" }}>Type</Form.Label>
            <Form.Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <option value="expense" style={{ color: "black" }}>Expense</option>
              <option value="income" style={{ color: "black" }}>Income</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ color: "var(--text-secondary)" }}>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 rounded-pill fw-bold">
            Add Transaction
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default QuickAddTransaction;
