import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { Link } from "react-router-dom";

const Services = () => {
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/services").then((res) => {
      setAllServices(res.data);
      setLoading(false);
    });
  }, []);

  const filteredServices = useMemo(() => {
    return allServices.filter((s) =>
      s.service_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allServices, searchTerm]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="py-12 container mx-auto px-4">
      <div className="mb-10 flex justify-center">
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-full max-w-md shadow-md"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <div
            key={service._id}
            className="card bg-base-100 shadow-xl border-t-4 border-primary"
          >
            <figure className="h-60">
              <img
                src={service.service_image}
                alt={service.service_name}
                className="object-cover w-full h-full"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{service.service_name}</h3>
              <p className="font-bold text-accent">
                ৳{service.cost} / {service.unit}
              </p>
              <div className="card-actions justify-end">
                <Link
                  to={`/service/${service._id}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
