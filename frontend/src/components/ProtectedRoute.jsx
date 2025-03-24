import { Navigate, Outlet } from "react-router";

import useUserContext from "../context/userContext.jsx";

const ProtectedRoute = () => {
  const { user } = useUserContext();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
