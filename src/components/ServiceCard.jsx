import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

const ServiceCard = ({ service }) => {
  const {
    _id,
    service_name,
    service_image,
    cost,
    unit,
    service_area,
    ratings,
    description,
  } = service;

  return (
    <motion.div
      whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.3 }}
      className="card bg-white shadow-md border border-gray-100 rounded-3xl overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300"
    >
      <figure className="relative h-56 overflow-hidden rounded-t-3xl">
        <img
          src={service_image}
          alt={service_name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full font-semibold text-sm shadow-lg flex items-center gap-1">
          <FaMapMarkerAlt className="text-white" />
          {service_area}
        </div>
      </figure>

      <div className="card-body p-6 flex flex-col grow">
        <div className="flex justify-between items-start mb-2">
          <h2 className="card-title text-secondary text-xl font-bold leading-tight hover:text-primary transition-colors">
            {service_name}
          </h2>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
            <FaStar className="text-yellow-500 text-sm" />
            <span className="text-secondary font-semibold text-sm">
              {ratings}
            </span>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-4 line-clamp-3">{description}</p>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold text-primary">
              ${cost}
            </span>
            <span className="text-gray-400 text-xs font-medium">/{unit}</span>
          </div>

          <Link
            to={`/service/${_id}`}
            className="btn btn-primary btn-sm rounded-full px-6 py-2 text-white shadow-lg hover:shadow-primary/40 transition-all duration-300 font-semibold"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
