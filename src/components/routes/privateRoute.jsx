import { isLoggedIn } from "../../utils/localStorageUtils";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  if (!isLoggedIn()) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
