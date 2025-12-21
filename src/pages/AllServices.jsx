import { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";
import { motion } from "framer-motion";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/services");
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching all services:", error);
        setLoading(false);
      }
    };
    fetchAllServices();
  }, []);

  const filteredServices = services.filter(
    (service) =>
      service.service_name.toLowerCase().includes(search.toLowerCase()) ||
      service.service_category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-bold text-secondary">
              All Decoration Services
            </h1>
            <p className="text-gray-500 mt-2">
              Explore our {services.length} premium services
            </p>
          </motion.div>

          <div className="w-full md:w-96">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or category..."
                className="input input-bordered w-full pl-12 rounded-full focus:outline-primary"
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 absolute left-4 top-3 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl text-gray-400 font-medium">
              No services found matching your search.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllServices;
