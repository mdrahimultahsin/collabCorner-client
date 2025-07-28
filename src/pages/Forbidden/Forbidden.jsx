import React from "react";
import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-center p-6">
      <FaLock className="text-6xl text-error mb-4" />
      <h1 className="text-4xl font-bold text-error mb-2">403 - Forbidden</h1>
      <p className="text-lg mb-6 text-base-content">
        You don’t have permission to access this page.
      </p>
      <Link to="/" className="btn btn-primary">
        Go Back Home
      </Link>
    </div>
  );
};

export default Forbidden;
