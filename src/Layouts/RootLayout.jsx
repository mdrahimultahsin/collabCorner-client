import React from "react";
import Navbar from "../pages/Shared/Navbar/Navbar";
import {Outlet} from "react-router";
import Footer from "../pages/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="bg-base-200">
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
