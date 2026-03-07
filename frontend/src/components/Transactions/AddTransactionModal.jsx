import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddTransactionModal = ({ show, handleClose, handleAddTransaction }) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "expense",
    tDate: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.tDate) {
      alert("Please fill in all fields.");
      return;
    }

    const newTransaction = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    handleAddTransaction(newTransaction);
    // Reset form and close
    setFormData({
      description: "",
      amount: "",
      type: "expense",
      tDate: new Date().toISOString().split("T")[0],
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <div
        style={{
          background: "rgba(10, 25, 47, 0.95)",
          border: "1px solid rgba(100, 255, 218, 0.2)",
          borderRadius: "8px",
        }}
      >
        <Modal.Header
          closeButton
          closeVariant="white"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
        >
          <Modal.Title style={{ color: "var(--text-primary)" }}>
            Add Transaction
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "var(--text-secondary)" }}>
                Description
              </Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="e.g. Salary, Utilities, etc."
                value={formData.description}
                onChange={handleChange}
                required
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "var(--text-secondary)" }}>
                Amount ($)
              </Form.Label>
              <Form.Control
                type="number"
                name="amount"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
                required
                min="0.01"
                step="0.01"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "var(--text-secondary)" }}>
                Type
              </Form.Label>
              <Form.Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <option value="expense" style={{ color: "black" }}>
                  Expense
                </option>
                <option value="income" style={{ color: "black" }}>
                  Income
                </option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "var(--text-secondary)" }}>
                Date
              </Form.Label>
              <Form.Control
                type="date"
                name="tDate"
                value={formData.tDate}
                onChange={handleChange}
                required
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="px-4 fw-bold">
              Save Transaction
            </Button>
          </Modal.Footer>
        </Form>
      </div>
    </Modal>
  );
};

export default AddTransactionModal;
