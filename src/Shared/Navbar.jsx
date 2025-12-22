import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import {
  Home,
  LayoutDashboard,
  Phone,
  Info,
  Sparkles,
  LogOut,
} from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const isAdmin = true;

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Successfully logged out!"))
      .catch((error) => toast.error(error.message));
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/" className="flex items-center gap-2">
          <Home size={18} /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/services" className="flex items-center gap-2">
          <Sparkles size={18} /> Services
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className="flex items-center gap-2">
          <Info size={18} /> About
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className="flex items-center gap-2">
          <Phone size={18} /> Contact
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to={isAdmin ? "/dashboard/admin" : "/dashboard/user"}
            className="flex items-center gap-2"
          >
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-base-100/80 backdrop-blur border-b border-base-300">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              ☰
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 w-56 rounded-2xl bg-base-100 p-3 shadow">
              {navItems}
            </ul>
          </div>
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide text-primary"
          >
            Style<span className="text-secondary">Decor</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 font-medium">{navItems}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-circle avatar ring ring-primary ring-offset-2"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={user.photoURL || "https://i.ibb.co/2kR9J6N/avatar.png"}
                    alt="user"
                  />
                </div>
              </div>
              <ul className="menu menu-sm dropdown-content mt-3 w-56 rounded-2xl bg-base-100 p-3 shadow">
                <li className="menu-title">
                  <span>{user.displayName || "Profile"}</span>
                </li>
                <li>
                  <Link to="/dashboard/profile" className="justify-between">
                    Dashboard
                    <span className="badge badge-primary">
                      {isAdmin ? "Admin" : "User"}
                    </span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="text-error flex gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary rounded-full px-6">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
