import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import QuickAddTransaction from "../components/Dashboard/QuickAddTransaction";
import ChartsOverview from "../components/Dashboard/ChartsOverview";

const Dashboard = () => {
    // Static data for now
    const balance = 5430.50;
    const totalIncome = 8500.00;
    const totalExpense = 3069.50;

    return (
        <Container className="py-5">
            <Row className="mb-4">
                <Col>
                    <h2 className="fw-bold" style={{ color: "var(--text-primary)" }}>Dashboard</h2>
                    <p style={{ color: "var(--text-secondary)" }}>Welcome back! Here's your financial overview.</p>
                </Col>
            </Row>

            {/* Summary Cards */}
            <Row className="mb-4">
                <Col md={4} className="mb-3 mb-md-0">
                    <Card className="text-center shadow-sm border-0" style={{ background: "linear-gradient(135deg, rgba(0, 196, 159, 0.1) 0%, rgba(0, 196, 159, 0) 100%)", backdropFilter: "blur(10px)", borderLeft: "4px solid #00C49F" }}>
                        <Card.Body>
                            <Card.Title style={{ color: "var(--text-secondary)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>Total Balance</Card.Title>
                            <Card.Text className="fs-1 fw-bold" style={{ color: "var(--text-primary)" }}>
                                ${balance.toFixed(2)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-3 mb-md-0">
                    <Card className="text-center shadow-sm border-0" style={{ background: "linear-gradient(135deg, rgba(0, 136, 254, 0.1) 0%, rgba(0, 136, 254, 0) 100%)", backdropFilter: "blur(10px)", borderLeft: "4px solid #0088FE" }}>
                        <Card.Body>
                            <Card.Title style={{ color: "var(--text-secondary)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>Total Income</Card.Title>
                            <Card.Text className="fs-2 fw-semibold" style={{ color: "var(--text-primary)" }}>
                                ${totalIncome.toFixed(2)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center shadow-sm border-0" style={{ background: "linear-gradient(135deg, rgba(255, 128, 66, 0.1) 0%, rgba(255, 128, 66, 0) 100%)", backdropFilter: "blur(10px)", borderLeft: "4px solid #FF8042" }}>
                        <Card.Body>
                            <Card.Title style={{ color: "var(--text-secondary)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>Total Expenses</Card.Title>
                            <Card.Text className="fs-2 fw-semibold" style={{ color: "var(--text-primary)" }}>
                                ${totalExpense.toFixed(2)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                {/* Main Charts Area */}
                <Col lg={8} className="mb-4 mb-lg-0">
                    <ChartsOverview />
                </Col>

                {/* Quick Add Sidebar */}
                <Col lg={4}>
                    <QuickAddTransaction />
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
