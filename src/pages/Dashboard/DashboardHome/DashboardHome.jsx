import { Navigate } from "react-router";
import useUserRole from "../../../hooks/useUserRole";
import Spinner from "../../Shared/Spinner/Spinner";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) return <Spinner />;

  // Redirect to the correct profile based on role
  if (role === "admin") return <Navigate to="/dashboard/adminProfile" replace />;
  if (role === "user") return <Navigate to="/dashboard/userProfile" replace />;

  return null; 
};

export default DashboardHome;
