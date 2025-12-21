import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const { _id, service_name, service_image, cost, unit, description } = service;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={service_image}
          alt={service_name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>

        <span className="absolute bottom-4 left-4 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold shadow">
          ৳ {cost} <span className="text-xs opacity-90">/{unit}</span>
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-secondary mb-2">
          {service_name}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {description}
        </p>

        <Link
          to={`/services/${_id}`}
          className="inline-block w-full text-center py-3 rounded-full font-semibold 
          bg-secondary text-white transition-all duration-300 
          hover:bg-primary hover:shadow-lg"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
