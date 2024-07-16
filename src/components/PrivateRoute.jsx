import { Navigate, Outlet } from "react-router-dom";
import { getAuthToken } from "../api/userApi";

const PrivateRoute = () => {
  const auth_token = getAuthToken();
  return auth_token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
