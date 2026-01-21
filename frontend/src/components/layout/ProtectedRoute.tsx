import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = () => {
  const { user, accessToken } = useAuth();

  if (user && accessToken) {
    return <Outlet />
  }

  return <Navigate to="/login" replace />
}

export default ProtectedRoute
