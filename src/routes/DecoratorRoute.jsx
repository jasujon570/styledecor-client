import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../Shared/LoadingSpinner.jsx";

const DecoratorRoute = ({ children }) => {
  const { user, loading, userRole } = useAuth();
  const location = useLocation();

  if (loading || (user && !userRole)) {
    return <LoadingSpinner />;
  }

  if (user && userRole === "decorator") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default DecoratorRoute;

