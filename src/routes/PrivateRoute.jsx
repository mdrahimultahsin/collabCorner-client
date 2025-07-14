import React from "react";
import useAuth from "../hooks/useAuth";
import Spinner from "../pages/Shared/Spinner/Spinner";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({children}) => {
  const {user, loading} = useAuth();
  const location = useLocation()
  if (loading) {
    return Spinner;
  }
  if (user && user?.email) {
    return children;
  }
  return <Navigate to="/login" state={{from:location?.pathname}}/>;
};

export default PrivateRoute;
