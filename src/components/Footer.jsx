import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="text-3xl font-bold">
            <span className="text-primary">Style</span>Decor
          </Link>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Transforming your spaces with elegance and creativity. Your dream
            decoration is just a click away.
          </p>
          <div className="flex gap-4 mt-6">
            <a
              href="#"
              className="hover:text-primary transition-colors text-2xl"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors text-2xl"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors text-2xl"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-6">Quick Links</h3>
          <ul className="space-y-3 text-gray-400">
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-white transition-colors"
              >
                All Services
              </Link>
            </li>
            <li>
              <Link
                to="/bookings"
                className="hover:text-white transition-colors"
              >
                My Bookings
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white transition-colors">
                Login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-6">Categories</h3>
          <ul className="space-y-3 text-gray-400">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Wedding Decor
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Office Setup
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Party Theme
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Home Interior
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-6">Contact Us</h3>
          <ul className="space-y-3 text-gray-400">
            <li>Dhaka, Bangladesh</li>
            <li>Email: info@styledecor.com</li>
            <li>Phone: +880 1234 567890</li>
            <li>Working Hours: 9 AM - 8 PM</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} StyleDecor. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
