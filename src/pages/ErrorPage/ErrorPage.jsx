import React from "react";
import { Link } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-base-content px-4">
      <FaExclamationTriangle className="text-red-500 w-20 h-20 mb-6" />
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-secondary-content mb-6 text-center">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary text-white rounded hover:bg-primary/90 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
