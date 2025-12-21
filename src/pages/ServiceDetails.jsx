import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const ServiceDetails = () => {
  const service = useLoaderData();
  const {
    service_name,
    service_image,
    description,
    cost,
    unit,
    service_area,
    ratings,
    duration,
  } = service;

  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 bg-white p-10 rounded-3xl shadow-2xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 relative rounded-3xl overflow-hidden shadow-xl"
          >
            <img
              src={service_image}
              alt={service_name}
              className="w-full h-112.5 object-cover rounded-3xl transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-5 left-5 bg-primary/90 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
              {service_area}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 flex flex-col justify-between"
          >
            <div>
              <h1 className="text-5xl font-extrabold text-secondary mb-6">
                {service_name}
              </h1>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                {description}
              </p>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaMapMarkerAlt className="text-primary" />
                  <span>{service_area}</span>
                </div>
                {duration && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaClock className="text-primary" />
                    <span>{duration}</span>
                  </div>
                )}
                <div className="ml-auto flex items-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <span className="font-bold text-secondary">{ratings}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-extrabold text-primary">
                  ${cost}
                </span>
                <span className="text-gray-500 font-medium">/ {unit}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary btn-lg rounded-full text-white shadow-2xl py-4 px-8 font-semibold text-xl transition-transform"
            >
              Book This Service Now
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-secondary mb-6">
            You Might Also Like
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetails;
