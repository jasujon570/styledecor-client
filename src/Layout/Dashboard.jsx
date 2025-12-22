import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import DashboardSidebar from "../Shared/DashboardSidebar";
import LoadingSpinner from "../Shared/LoadingSpinner";

const Dashboard = () => {
  const { loading, userRole } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  const role = userRole || "user";

  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex">
        <DashboardSidebar role={role} />
        <div className="flex-1 p-4 md:p-8">
          <div className="bg-base-100 rounded-lg shadow-lg min-h-[calc(100vh-100px)] p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
