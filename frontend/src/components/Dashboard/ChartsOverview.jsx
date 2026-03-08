import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const pieData = [
  { name: "Housing", value: 1200 },
  { name: "Food", value: 450 },
  { name: "Transport", value: 200 },
  { name: "Entertainment", value: 150 },
  { name: "Utilities", value: 300 },
];

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#0088FE", "#FF6666"];

const ChartsOverview = ({ lineData }) => {
  return (
    <Card
      className="shadow-sm border-0 h-100"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Card.Body>
        <Card.Title className="mb-4" style={{ color: "var(--text-primary)" }}>
          Financial Overview
        </Card.Title>
        <Row>
          <Col md={6} className="mb-4 mb-md-0" style={{ height: "300px" }}>
            <h6
              className="text-center mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              Expense Breakdown
            </h6>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Col>
          <Col md={6} style={{ height: "300px" }}>
            <h6
              className="text-center mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              Income vs Expenses (6 Months)
            </h6>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(10, 25, 47, 0.9)",
                    borderColor: "rgba(255,255,255,0.1)",
                    color: "white",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#00C49F"
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#FF8042"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ChartsOverview;
