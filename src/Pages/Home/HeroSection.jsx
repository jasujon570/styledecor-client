import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

const HeroSection = () => {
  return (
    <div
      className="hero min-h-[70vh] bg-cover bg-center rounded-box shadow-xl mb-16"
      style={{
        backgroundImage: "url(https://i.ibb.co.com/5XtXH1d6/bg.jpg)",
      }}
    >
      <div className="hero-overlay rounded-box"></div>

      <motion.div
        className="hero-content text-center text-neutral-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-3xl">
          <motion.h1
            className="mb-5 text-6xl font-extrabold text-white"
            variants={itemVariants}
          >
            Your Dream Space, Styled Perfectly.
          </motion.h1>
          <motion.p
            className="mb-8 text-xl text-gray-200"
            variants={itemVariants}
          >
            Smart Home & Ceremony Decoration Booking System. Check decorator
            availability, book on-site services, and track project status in
            real-time.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              to="/services"
              className="btn btn-primary btn-lg shadow-xl hover:scale-105 transition duration-300"
            >
              Book Decoration Service
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
