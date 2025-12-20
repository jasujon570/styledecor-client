import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MapSection from "../components/MapSection";
import ServiceCard from "../components/ServiceCard";
import axios from "axios";

const Home = () => {
  const [services, setServices] = useState([]);

  console.log("Motion library is active:", typeof motion);

  useEffect(() => {
    axios
      .get("http://localhost:5000/services")
      .then((res) => {
        setServices(res.data.slice(0, 6));
      })
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  return (
    <div className="overflow-x-hidden">
   
      <section className="relative min-h-[80vh] flex items-center justify-center bg-secondary overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center relative z-10 py-20">
        
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-white"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Elevate Your <span className="text-primary italic">Events</span>{" "}
              <br />
              with StyleDecor
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-lg italic">
              "Modern appointment management for local decoration companies."
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="md:w-1/2 mt-12 md:mt-0"
          >
            <div className="rounded-2xl overflow-hidden border-8 border-white/10 shadow-2xl">
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
            <h2 className="text-4xl font-bold text-secondary uppercase tracking-widest">
              Our Popular Services
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <MapSection />
    </div>
  );
};

export default Home;
