import { NavLink, Link } from "react-router-dom";
import {
  FaUser,
  FaTools,
  FaCalendarCheck,
  FaChartBar,
  FaHome,
  FaUsers,
  FaList,
} from "react-icons/fa";
import useRole from "../hooks/useRole";
import LoadingSpinner from "./LoadingSpinner";

const DashboardSidebar = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  const adminLinks = (
    <>
      <li>
        <NavLink to="/dashboard/manage-bookings">
          <FaList /> Manage All Bookings
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-services">
          <FaTools /> Manage Services
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-decorators">
          <FaUsers /> Manage Decorators
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/revenue-monitoring">
          <FaChartBar /> Revenue Monitoring
        </NavLink>
      </li>
    </>
  );

  const decoratorLinks = (
    <>
      <li>
        <NavLink to="/dashboard/assigned-projects">
          <FaCalendarCheck /> My Assigned Projects
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/update-status">
          <FaTools /> Update Project Status
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/earnings-summary">
          <FaChartBar /> Earnings Summary
        </NavLink>
      </li>
    </>
  );

  const userLinks = (
    <>
      <li>
        <NavLink to="/dashboard/my-bookings">
          <FaList /> My Bookings
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/payment-history">
          <FaChartBar /> Payment History
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/profile">
          <FaUser /> My Profile
        </NavLink>
      </li>
    </>
  );

  let links;
  if (role === "admin") {
    links = adminLinks;
  } else if (role === "decorator") {
    links = decoratorLinks;
  } else {
    links = userLinks;
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center lg:hidden p-4">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button mb-4"
        >
          Open Dashboard Menu
        </label>
      </div>

      <div className="drawer-side z-20">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-100 min-h-full w-80 p-4 text-base-content">
          <div className="text-xl font-bold p-4 border-b mb-4">
            <Link to="/dashboard" className="capitalize">
              {role} Dashboard
            </Link>
          </div>

          {links}

          <div className="divider">Main Site</div>

          <li>
            <Link to="/">
              <FaHome /> Go Home
            </Link>
          </li>
          <li>
            <Link to="/services">
              <FaTools /> Services
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebar;
