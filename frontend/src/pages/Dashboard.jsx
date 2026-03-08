import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import QuickAddTransaction from "../components/Dashboard/QuickAddTransaction";
import ChartsOverview from "../components/Dashboard/ChartsOverview";
import { useState } from "react";
const initialTransactions = [];
const Dashboard = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  // Static data for now
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalBalance: 0,
    lineData: [],
    pieData: [],
  });
  // Add new transaction
  const handleAddTransaction = async (newTx) => {
    // TODO: call add transaction api
    // POSTimport.meta.env.VITE_ROOT_URL +  /api/v1/transactions
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        import.meta.env.VITE_ROOT_URL + "/api/v1/transactions",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            authorization: token,
          },
          body: JSON.stringify(newTx),
        },
      );
      const data = await response.json();
      console.log("Add Transaction Response:", data);
      if (data.status == "success") {
        const addedTransaction = data.transaction;
        const updated = [...transactions, addedTransaction];

        setTransactions(updated);
        fetchSummary();
      }
    } catch (error) {
      console.log("Error adding transaction:", error);
    }
  };

  const fetchSummary = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        import.meta.env.VITE_ROOT_URL + "/api/v1/dashboard",
        {
          method: "GET",
          headers: {
            authorization: token,
          },
        },
      );
      const data = await response.json();
      if (response.ok) {
        console.log("103", data);
        setSummary(data.summary);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold" style={{ color: "var(--text-primary)" }}>
            Dashboard
          </h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Welcome back! Here's your financial overview.
          </p>
        </Col>
      </Row>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={4} className="mb-3 mb-md-0">
          <Card
            className="text-center shadow-sm border-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 196, 159, 0.1) 0%, rgba(0, 196, 159, 0) 100%)",
              backdropFilter: "blur(10px)",
              borderLeft: "4px solid #00C49F",
            }}
          >
            <Card.Body>
              <Card.Title
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Total Balance
              </Card.Title>
              <Card.Text
                className="fs-1 fw-bold"
                style={{ color: "var(--text-primary)" }}
              >
                ${summary.totalBalance.toFixed(2)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3 mb-md-0">
          <Card
            className="text-center shadow-sm border-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 136, 254, 0.1) 0%, rgba(0, 136, 254, 0) 100%)",
              backdropFilter: "blur(10px)",
              borderLeft: "4px solid #0088FE",
            }}
          >
            <Card.Body>
              <Card.Title
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Total Income
              </Card.Title>
              <Card.Text
                className="fs-2 fw-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                ${summary.totalIncome.toFixed(2)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="text-center shadow-sm border-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 128, 66, 0.1) 0%, rgba(255, 128, 66, 0) 100%)",
              backdropFilter: "blur(10px)",
              borderLeft: "4px solid #FF8042",
            }}
          >
            <Card.Body>
              <Card.Title
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Total Expenses
              </Card.Title>
              <Card.Text
                className="fs-2 fw-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                ${summary.totalExpense.toFixed(2)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Main Charts Area */}
        <Col lg={8} className="mb-4 mb-lg-0">
          <ChartsOverview
            lineData={summary.lineData}
            pieData={summary.pieData}
          />
        </Col>

        {/* Quick Add Sidebar */}
        <Col lg={4}>
          <QuickAddTransaction handleAddTransaction={handleAddTransaction} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
