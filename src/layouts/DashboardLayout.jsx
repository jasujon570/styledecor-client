import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import {
  FaHome,
  FaUsers,
  FaTasks,
  FaClipboardList,
  FaTools,
  FaSignOutAlt,
} from "react-icons/fa";

const DashboardLayout = () => {
  const { userRole, logOut } = useContext(AuthContext);

  const isAdmin = userRole === "admin";
  const isDecorator = userRole === "decorator";
  const isUser = userRole === "user";

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((err) => console.error(err));
  };

  const navLinks = (
    <>
      <li className="menu-title text-primary">
        {isAdmin
          ? "Admin Panel"
          : isDecorator
          ? "Decorator Panel"
          : "User Panel"}
      </li>

      <li>
        <NavLink to="/dashboard/home">
          <FaHome /> Dashboard Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-bookings">
          <FaClipboardList /> My Bookings
        </NavLink>
      </li>

      <div className="divider"></div>

      {isDecorator && (
        <>
          <li>
            <NavLink to="/dashboard/assigned-tasks">
              <FaTasks /> Assigned Tasks
            </NavLink>
          </li>
          <div className="divider"></div>
        </>
      )}

      {isAdmin && (
        <>
          <li>
            <NavLink to="/dashboard/manage-services">
              <FaTools /> Manage Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manage-users">
              <FaUsers /> Manage Users
            </NavLink>
          </li>
          <div className="divider"></div>
        </>
      )}

      <li className="menu-title">Main Navigation</li>
      <li>
        <NavLink to="/">
          <FaHome /> Go to Home
        </NavLink>
      </li>
      <li>
        <a onClick={handleLogout} className="text-error">
          <FaSignOutAlt /> Logout
        </a>
      </li>
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col p-4 bg-base-200">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden mb-4"
        >
          Open Dashboard Menu
        </label>
        <div className="text-2xl font-bold mb-4">
          Welcome to Your Dashboard!
        </div>
        <Outlet />
      </div>

      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content shadow-xl">
          {navLinks}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
