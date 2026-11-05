import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router";

const ProtectedRoute = () => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect them to the login page
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
