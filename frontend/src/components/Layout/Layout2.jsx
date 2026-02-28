import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout2 = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Footer />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Header />
    </div>
  );
};

export default Layout2;
