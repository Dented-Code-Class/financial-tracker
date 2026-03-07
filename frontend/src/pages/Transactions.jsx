import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Badge,
  Form,
} from "react-bootstrap";
import AddTransactionModal from "../components/Transactions/AddTransactionModal";

// Static Initial Data
const initialTransactions = [];

const Transactions = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Modal Handlers
  const handleOpenModal = () => setShowAddModal(true);
  const handleCloseModal = () => setShowAddModal(false);
  // Fetch all transactions

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
        handleCloseModal();
      }
    } catch (error) {
      console.log("Error adding transaction:", error);
    }
  };

  // Checkbox Handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(transactions.map((t) => t._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (e, _id) => {
    if (e.target.checked) {
      setSelectedIds((prev) => [...prev, _id]);
    } else {
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== _id));
    }
  };

  // Delete Selected
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedIds.length} transaction(s)?`,
      )
    ) {
      //   CALL DELET API
      const token = localStorage.getItem("token");
      const response = await fetch(
        import.meta.env.VITE_ROOT_URL + "/api/v1/transactions",
        {
          method: "DELETE",
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: selectedIds,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setTransactions((prev) =>
          prev.filter((t) => !selectedIds.includes(t._id)),
        );
        setSelectedIds([]); // clear selection
      } else {
        alert("DELETE FAILED");
      }
    }
  };

  //   TODO: call api to fetch transactionfrom backend api
  //import.meta.env.VITE_ROOT_URL +  /api/v1/transactions

  const fetchtransactions = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        import.meta.env.VITE_ROOT_URL + "/api/v1/transactions",
        {
          method: "GET",
          headers: {
            authorization: token,
          },
        },
      );
      const data = await response.json();
      if (response.ok) {
        setTransactions(data.transactions);
        console.log(103, data);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    fetchtransactions();
  }, []);

  return (
    <Container className="py-5">
      <Row className="mb-4 align-items-center">
        <Col md={6}>
          <h2 className="fw-bold m-0" style={{ color: "var(--text-primary)" }}>
            Transactions
          </h2>
          <p style={{ color: "var(--text-secondary)" }} className="mb-0 mt-1">
            Manage your income and expenses.
          </p>
        </Col>
        <Col md={6} className="text-md-end mt-3 mt-md-0">
          {selectedIds.length > 0 && (
            <Button
              variant="danger"
              className="me-3 px-4 shadow-sm"
              onClick={handleDeleteSelected}
            >
              <i className="bi bi-trash me-2"></i>Delete Selected (
              {selectedIds.length})
            </Button>
          )}
          <Button
            variant="primary"
            className="px-4 shadow-sm fw-bold rounded-pill"
            onClick={handleOpenModal}
          >
            <i className="bi bi-plus-lg me-2"></i>Add Transaction
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card
            className="shadow-sm border-0"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              overflow: "hidden",
            }}
          >
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table
                  hover
                  className="m-0 text-white"
                  style={{
                    "--bs-table-bg": "transparent",
                    "--bs-table-hover-bg": "rgba(255,255,255,0.05)",
                    "--bs-table-color": "var(--text-secondary)",
                  }}
                >
                  <thead
                    style={{
                      borderBottom: "2px solid rgba(100, 255, 218, 0.2)",
                    }}
                  >
                    <tr>
                      <th className="py-3 px-4" style={{ width: "50px" }}>
                        <Form.Check
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={
                            transactions.length > 0 &&
                            selectedIds.length === transactions.length
                          }
                          style={{ accentColor: "var(--accent-primary)" }}
                        />
                      </th>
                      <th
                        className="py-3"
                        style={{
                          color: "var(--text-primary)",
                          fontWeight: "600",
                        }}
                      >
                        Date
                      </th>
                      <th
                        className="py-3"
                        style={{
                          color: "var(--text-primary)",
                          fontWeight: "600",
                        }}
                      >
                        Description
                      </th>
                      <th
                        className="py-3"
                        style={{
                          color: "var(--text-primary)",
                          fontWeight: "600",
                        }}
                      >
                        Type
                      </th>
                      <th
                        className="py-3 text-end px-4"
                        style={{
                          color: "var(--text-primary)",
                          fontWeight: "600",
                        }}
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length > 0 ? (
                      transactions.map((tx) => (
                        <tr
                          key={tx._id}
                          style={{
                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                          }}
                        >
                          <td className="py-3 px-4">
                            <Form.Check
                              type="checkbox"
                              checked={selectedIds.includes(tx._id)}
                              onChange={(e) => handleSelectOne(e, tx._id)}
                            />
                          </td>
                          <td className="py-3">{tx.tDate.split("T")[0]}</td>
                          <td className="py-3">{tx.description}</td>
                          <td className="py-3">
                            <Badge
                              bg={tx.type === "income" ? "success" : "danger"}
                              className="px-3 py-2 rounded-pill"
                              style={{
                                backgroundColor:
                                  tx.type === "income"
                                    ? "rgba(0, 196, 159, 0.2) !important"
                                    : "rgba(255, 128, 66, 0.2) !important",
                                color:
                                  tx.type === "income" ? "#00C49F" : "#FF8042",
                                border:
                                  tx.type === "income"
                                    ? "1px solid rgba(0, 196, 159, 0.3)"
                                    : "1px solid rgba(255, 128, 66, 0.3)",
                              }}
                            >
                              {tx.type.charAt(0).toUpperCase() +
                                tx.type.slice(1)}
                            </Badge>
                          </td>
                          <td
                            className="py-3 text-end px-4 fw-bold"
                            style={{
                              color:
                                tx.type === "income"
                                  ? "#00C49F"
                                  : "var(--text-primary)",
                            }}
                          >
                            {tx.type === "income" ? "+" : "-"}$
                            {tx.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-5 text-muted">
                          No transactions found. Add one to get started!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Render the Add Modal */}
      <AddTransactionModal
        show={showAddModal}
        handleClose={handleCloseModal}
        handleAddTransaction={handleAddTransaction}
      />
    </Container>
  );
};

export default Transactions;
