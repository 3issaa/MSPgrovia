import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

export default function ProtectedRoute() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/Login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
