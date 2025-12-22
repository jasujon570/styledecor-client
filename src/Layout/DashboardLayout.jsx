import { Outlet, NavLink, Link } from "react-router-dom";
import {
  FaUser,
  FaHistory,
  FaList,
  FaUsers,
  FaChartLine,
  FaTasks,
  FaRegMoneyBillAlt,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../Shared/LoadingSpinner.jsx";
import { useEffect } from "react";

const DashboardLayout = () => {
  const { loading, user } = useAuth();

  const [role, isRoleLoading] = useRole();

  useEffect(() => {
    document.title = "StyleDecor | Dashboard";
  }, []);

  if (loading || isRoleLoading) {
    return <LoadingSpinner />;
  }

  const getNavLinks = () => {
    if (role === "admin") {
      return (
        <>
          <li className="menu-title text-gray-500 text-xs font-bold uppercase mt-4 px-4">
            Admin Dashboard
          </li>
          <li>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive ? "bg-primary text-white" : ""
              }
            >
              <FaUser /> Admin Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="admin/manage-bookings"
              className={({ isActive }) =>
                isActive ? "bg-primary text-white" : ""
              }
            >
              <FaList /> Manage Bookings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="admin/manage-services"
              className={({ isActive }) =>
                isActive ? "bg-primary text-white" : ""
              }
            >
              <FaList /> Manage Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="admin/manage-decorators"
              className={({ isActive }) =>
                isActive ? "bg-primary text-white" : ""
              }
            >
              <FaUsers /> Manage Decorators
            </NavLink>
          </li>
          <li>
            <NavLink
              to="admin/revenue-monitoring"
              className={({ isActive }) =>
                isActive ? "bg-primary text-white" : ""
              }
            >
              <FaChartLine /> Revenue Monitoring
            </NavLink>
          </li>
        </>
      );
    }

    if (role === "decorator") {
      return (
        <>
          <li className="menu-title text-gray-500 text-xs font-bold uppercase mt-4 px-4">
            Decorator Panel
          </li>
          <li>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive ? "bg-primary text-white" : ""
              }
            >
              <FaUser /> My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="decorator/assigned-projects"
              className={({ isActive }) =>
                isActive ? "bg-primary text-white" : ""
              }
            >
              <FaTasks /> Assigned Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="decorator/update-status"
              className={({ isActive }) =>
                isActive ? "bg-primary text-white" : ""
              }
            >
              <FaList /> Update Status
            </NavLink>
          </li>
          <li>
            <NavLink
              to="decorator/earnings-summary"
              className={({ isActive }) =>
                isActive ? "bg-primary text-white" : ""
              }
            >
              <FaRegMoneyBillAlt /> Earnings Summary
            </NavLink>
          </li>
        </>
      );
    }

    return (
      <>
        <li className="menu-title text-gray-500 text-xs font-bold uppercase mt-4 px-4">
          User Dashboard
        </li>
        <li>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              isActive ? "bg-primary text-white" : ""
            }
          >
            <FaUser /> My Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="my-bookings"
            className={({ isActive }) =>
              isActive ? "bg-primary text-white" : ""
            }
          >
            <FaList /> My Bookings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="payment-history"
            className={({ isActive }) =>
              isActive ? "bg-primary text-white" : ""
            }
          >
            <FaHistory /> Payment History
          </NavLink>
        </li>
      </>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-base-100">
      <div className="w-full lg:w-64 bg-base-200 shadow-xl lg:min-h-screen">
        <ul className="menu p-4 space-y-1">
          <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-2 px-2">
            StyleDecor
          </h2>
          {getNavLinks()}
          <div className="divider my-4"></div>
          <li>
            <Link to="/" className="hover:bg-gray-300">
              <FaList /> Home
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-6 lg:p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
