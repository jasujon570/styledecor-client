import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MapSection from "../components/MapSection";
import ServiceCard from "../components/ServiceCard";
import axios from "axios";

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/services");
        setServices(response.data.slice(0, 6));
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch services. Please ensure backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <section className="relative min-h-[80vh] flex items-center justify-center bg-secondary overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center relative z-10 py-20">
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
              unique taste.
            </p>
            <div className="mt-10">
              <Link
                to="/services"
                className="btn btn-primary px-8 rounded-full text-lg shadow-lg"
              >
                Book Decoration Service
              </Link>
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
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary">
              Our Popular Services
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <p className="mt-4 text-gray-500 italic">Loading services...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 font-semibold">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-outline btn-sm mt-4"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          )}

          {!loading && !error && (
            <div className="text-center mt-16">
              <Link
                to="/services"
                className="btn btn-secondary px-10 rounded-full"
              >
                View All Services
              </Link>
            </div>
          )}
        </div>
      </section>

      <MapSection />
    </div>
  );
};

export default Home;
