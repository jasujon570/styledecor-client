import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../Shared/LoadingSpinner.jsx";

const DecoratorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isRoleLoading] = useRole();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return <LoadingSpinner />;
  }

  if (user && role === "decorator") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default DecoratorRoute;
