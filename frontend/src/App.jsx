import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import Auth from "./components/Auth/Auth";
import { useUser } from "./context/UserContext";

function App() {
  const { fetchUserDetail } = useUser();

  useEffect(() => {
    fetchUserDetail();
  }, []);
  return (
    <Router>
      <Routes>
        {/* Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Registration />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <Auth>
                <Dashboard />
              </Auth>
            }
          />
          <Route
            path="/transactions"
            element={
              <Auth>
                <Transactions />
              </Auth>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
