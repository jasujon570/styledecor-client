import { NavLink } from "react-router-dom";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../Shared/LoadingSpinner";
import {
  FaUser,
  FaListUl,
  FaHistory,
  FaHome,
  FaUsersCog,
  FaTools,
  FaFolderPlus,
  FaChartPie,
} from "react-icons/fa";

const DashboardSidebar = () => {

  const [role, isRoleLoading] = useRole();

  
  if (isRoleLoading) {
    return (
      <div className="p-4 bg-gray-100 h-full">
        <LoadingSpinner />
      </div>
    );
  }

 
  const currentRole = role?.toLowerCase();

  return (
    <div className="flex flex-col h-full p-4 bg-gray-100 text-gray-800">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-primary">
        Dashboard
      </h2>

      <div className="flex-1 space-y-2 text-sm font-semibold">
   
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg ${
              isActive ? "bg-primary text-white" : "hover:bg-gray-200"
            }`
          }
        >
          <FaUser className="mr-2" /> My Profile
        </NavLink>

   
        {currentRole === "admin" && (
          <div className="mt-6 border-t pt-4 animate-fadeIn">
            <p className="text-xs uppercase text-gray-500 mb-2 px-2">
              Admin Panel
            </p>
            <NavLink
              to="/dashboard/admin/manage-bookings"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? "bg-secondary text-white" : "hover:bg-gray-200"
                }`
              }
            >
              <FaListUl className="mr-2" /> Manage Bookings
            </NavLink>
            <NavLink
              to="/dashboard/admin/manage-services"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? "bg-secondary text-white" : "hover:bg-gray-200"
                }`
              }
            >
              <FaFolderPlus className="mr-2" /> Manage Services
            </NavLink>
            <NavLink
              to="/dashboard/admin/manage-decorators"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? "bg-secondary text-white" : "hover:bg-gray-200"
                }`
              }
            >
              <FaUsersCog className="mr-2" /> Manage Decorators
            </NavLink>
            <NavLink
              to="/dashboard/admin/revenue-monitoring"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? "bg-secondary text-white" : "hover:bg-gray-200"
                }`
              }
            >
              <FaChartPie className="mr-2" /> Revenue Monitoring
            </NavLink>
          </div>
        )}

        
        {currentRole === "decorator" && (
          <div className="mt-6 border-t pt-4 animate-fadeIn">
            <p className="text-xs uppercase text-gray-500 mb-2 px-2">
              Decorator Panel
            </p>
            <NavLink
              to="/dashboard/decorator/assigned-projects"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? "bg-accent text-white" : "hover:bg-gray-200"
                }`
              }
            >
              <FaTools className="mr-2" /> Assigned Projects
            </NavLink>
            <NavLink
              to="/dashboard/decorator/earnings-summary"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? "bg-accent text-white" : "hover:bg-gray-200"
                }`
              }
            >
              <FaHistory className="mr-2" /> Earnings Summary
            </NavLink>
          </div>
        )}

        
        {currentRole === "user" && (
          <div className="mt-4">
            <NavLink
              to="/dashboard/my-bookings"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? "bg-info text-white" : "hover:bg-gray-200"
                }`
              }
            >
              <FaListUl className="mr-2" /> My Bookings
            </NavLink>
            <NavLink
              to="/dashboard/payment-history"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? "bg-info text-white" : "hover:bg-gray-200"
                }`
              }
            >
              <FaHistory className="mr-2" /> Payment History
            </NavLink>
          </div>
        )}
      </div>

      <div className="border-t pt-4">
        <NavLink
          to="/"
          className="flex items-center p-2 hover:bg-gray-200 rounded-lg text-primary font-bold"
        >
          <FaHome className="mr-2" /> Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default DashboardSidebar;
