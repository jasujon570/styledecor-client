import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { Link } from "react-router-dom";

const DynamicServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/mockServices.json")
      .then((res) => {
        setServices(res.data.slice(0, 4));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-10 text-primary">
        Featured Decoration Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
          >
            <figure className="h-52 overflow-hidden">
              <img
                src={service.image}
                alt={service.service_name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </figure>

            <div className="card-body p-5">
              <div className="flex justify-between items-start">
                <h3 className="card-title text-xl font-bold">
                  {service.service_name}
                </h3>
                <div className="badge badge-secondary badge-outline text-xs capitalize">
                  {service.service_category}
                </div>
              </div>

              <p className="text-gray-600 text-sm my-2">
                {service.description.substring(0, 60)}...
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-primary">
                  ৳{service.cost}
                </span>
                <Link
                  to={`/services/${service.id}`}
                  className="btn btn-sm btn-primary text-white"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/services"
          className="btn btn-lg btn-outline btn-primary px-10"
        >
          View All Services
        </Link>
      </div>
    </section>
  );
};

export default DynamicServicesSection;
