import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MapSection from "../components/MapSection";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center justify-center bg-secondary overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-white"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Elevate Your <span className="text-primary italic">Events</span>{" "}
              <br />
              with StyleDecor
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-lg">
              Premium home and ceremony decoration services tailored to your
              unique taste. From intimate gatherings to grand celebrations, we
              make it magical.
            </p>
            <div className="mt-10 flex gap-4">
              <Link
                to="/services"
                className="btn btn-primary px-8 rounded-full text-lg shadow-lg shadow-primary/30"
              >
                Book Decoration Service
              </Link>
              <button className="btn btn-outline text-white px-8 rounded-full border-2 hover:bg-white hover:text-secondary">
                View Gallery
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="md:w-1/2 mt-12 md:mt-0 relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden border-8 border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop"
                alt="Decoration"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent rounded-full -z-10 animate-pulse"></div>
          </motion.div>
        </div>
      </div>

    
      <MapSection />
    </div>
  );
};

export default Home;
