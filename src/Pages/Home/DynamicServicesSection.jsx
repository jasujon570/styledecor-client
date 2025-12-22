import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { Link } from "react-router-dom";

const DynamicServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    axios
      .get("https://styledecor-server-psi.vercel.app/services")
      .then((res) => {
        setServices(res.data.slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-10 text-primary">
        Featured Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <div
            key={service._id}
            className="card bg-base-100 shadow-xl border border-gray-100"
          >
            <figure className="h-52 overflow-hidden">
              <img
                src={service.service_image}
                alt={service.service_name}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body p-5">
              <h3 className="card-title text-xl font-bold">
                {service.service_name}
              </h3>
              <p className="text-gray-600 text-sm my-2">
                {service.description?.substring(0, 60)}...
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-primary">
                  ৳{service.cost}
                </span>
                
                <Link
                  to={`/service/${service._id}`}
                  className="btn btn-sm btn-primary"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DynamicServicesSection;
