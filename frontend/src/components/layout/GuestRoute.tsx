import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const GuestRoute = () => {
  const { user, accessToken } = useAuth();

  if (user && accessToken) {
    return <Navigate to="/vault" replace />
  }

  return <Outlet />;
}

export default GuestRoute
