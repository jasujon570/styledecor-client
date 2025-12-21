import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
        >
          Services
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/bookings"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : ""
              }
            >
              My Bookings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-service"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : ""
              }
            >
              Add Service
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/manage-services"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : ""
              }
            >
              Manage Services
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-8 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="text-2xl font-bold text-secondary">
          <span className="text-primary">Style</span>Decor
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-medium">
          {navLinks}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold">{user?.displayName}</p>
            </div>
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar border-2 border-primary"
            >
              <div className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  src={
                    user?.photoURL ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="profile"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button
                  onClick={handleLogOut}
                  className="text-red-500 font-bold"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary rounded-full px-8">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
