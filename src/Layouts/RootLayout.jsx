import React from "react";
import Navbar from "../pages/Shared/Navbar/Navbar";
import {Outlet} from "react-router";

const RootLayout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
