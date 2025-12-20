import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold border-b-2 border-primary"
              : "hover:text-primary"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold border-b-2 border-primary"
              : "hover:text-primary"
          }
        >
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold border-b-2 border-primary"
              : "hover:text-primary"
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold border-b-2 border-primary"
              : "hover:text-primary"
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 border-b border-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tighter flex items-center gap-2"
        >
          <span className="text-primary">Style</span>Decor
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6 font-medium">
          {navLinks}
        </ul>
      </div>
      <div className="navbar-end gap-2">
        <Link
          to="/login"
          className="btn btn-primary btn-sm md:btn-md rounded-full px-6"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
