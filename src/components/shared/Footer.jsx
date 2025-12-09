
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content mt-10">
      <aside>
        <div className="text-3xl font-bold text-primary">
          Style<span className="text-secondary">Decor</span>
        </div>
        <p>
          StyleDecor Industries Ltd.
          <br />
          Providing reliable services since 2023
        </p>
        <p className="text-sm opacity-50">
          © 2024 StyleDecor. All rights reserved.
        </p>
      </aside>
      <nav>
        <header className="footer-title">Services</header>
        <a className="link link-hover">Home Interior</a>
        <a className="link link-hover">Office Design</a>
        <a className="link link-hover">Commercial Space</a>
        <a className="link link-hover">Consultation</a>
      </nav>
      <nav>
        <header className="footer-title">Company</header>
        <NavLink to="/about" className="link link-hover">
          About Us
        </NavLink>
        <NavLink to="/contact" className="link link-hover">
          Contact
        </NavLink>
        <NavLink to="/login" className="link link-hover">
          Login
        </NavLink>
      </nav>
      <nav>
        <header className="footer-title">Legal</header>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
