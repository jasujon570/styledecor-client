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
import LoadingSpinner from "../Shared/LoadingSpinner.jsx";
import { useEffect } from "react";

const DashboardLayout = () => {
  const { loading, userRole, user } = useAuth();

  useEffect(() => {
    document.title = "StyleDecor | Dashboard";
  }, []);
  if (loading || (user && !userRole)) {
    return <LoadingSpinner />;
  }

  const getNavLinks = () => {
    if (userRole === "admin") {
      return (
        <>
          <li className="menu-title">Admin Dashboard</li>
          <li>
            <NavLink to="profile">
              <FaUser /> Admin Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="admin/manage-bookings">
              <FaList /> Manage Bookings
            </NavLink>
          </li>
          <li>
            <NavLink to="admin/manage-services">
              <FaList /> Manage Services
            </NavLink>
          </li>
          <li>
            <NavLink to="admin/manage-decorators">
              <FaUsers /> Manage Decorators
            </NavLink>
          </li>
          <li>
            <NavLink to="admin/revenue-monitoring">
              <FaChartLine /> Revenue Monitoring
            </NavLink>
          </li>
        </>
      );
    }
    if (userRole === "decorator") {
      return (
        <>
          <li className="menu-title">Decorator Panel</li>
          <li>
            <NavLink to="profile">
              <FaUser /> My Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="decorator/assigned-projects">
              <FaTasks /> Assigned Projects
            </NavLink>
          </li>
          <li>
            <NavLink to="decorator/update-status">
              <FaList /> Update Status
            </NavLink>
          </li>
          <li>
            <NavLink to="decorator/earnings-summary">
              <FaRegMoneyBillAlt /> Earnings Summary
            </NavLink>
          </li>
        </>
      );
    }
    return (
      <>
        <li className="menu-title">User Dashboard</li>
        <li>
          <NavLink to="profile">
            <FaUser /> My Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="my-bookings">
            <FaList /> My Bookings
          </NavLink>
        </li>
        <li>
          <NavLink to="payment-history">
            <FaHistory /> Payment History
          </NavLink>
        </li>
      </>
    );
  };

  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-base-200 shadow-xl hidden lg:block">
        <ul className="menu p-4">
          <h2 className="text-2xl font-bold text-primary mb-4 border-b pb-2">
            Dashboard
          </h2>
          {getNavLinks()}
          <div className="divider my-4"></div>
          <li>
            <Link to="/">
              <FaList /> Home
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-6 lg:p-10 bg-base-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
