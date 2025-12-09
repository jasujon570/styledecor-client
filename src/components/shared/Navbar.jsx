import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Navbar = () => {
  const { user, logOut, userRole, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/services">Services</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>

      {user && (
        <li>
          <NavLink to="/dashboard/home">Dashboard</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>

        <NavLink
          to="/"
          className="btn btn-ghost normal-case text-xl font-bold text-primary"
        >
          Style<span className="text-secondary">Decor</span>
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      <div className="navbar-end">
        {loading ? (
          <span className="loading loading-spinner text-primary"></span>
        ) : user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div
                className="w-10 rounded-full border-2 border-primary tooltip"
                data-tip={user.displayName || user.email}
              >
                <img
                  src={
                    user.photoURL ||
                    "https://i.ibb.co/C0L0W9B/default-avatar.png"
                  }
                  alt="User Avatar"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="font-bold px-4 py-2 text-primary">
                {user.displayName || user.email}
              </li>
              <li className="px-4 text-xs italic text-secondary">
                Role: {userRole || "user"}
              </li>
              <li>
                <NavLink to="/dashboard/home">Dashboard</NavLink>
              </li>
              <div className="divider my-0"></div>
              <li>
                <a onClick={handleLogout} className="text-error">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink to="/login" className="btn btn-primary btn-sm md:btn-md">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
