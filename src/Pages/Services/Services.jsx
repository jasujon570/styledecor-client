import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { FaSearch, FaFilter, FaTools } from "react-icons/fa";
import { Link } from "react-router-dom";

const Services = () => {
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceType, setServiceType] = useState("all");

  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(999999);

  const serviceCategories = [
    "all",
    "home",
    "wedding",
    "office",
    "seminar",
    "meeting",
    "ceremony",
  ];

  useEffect(() => {
    axios
      .get("/mockServices.json")
      .then((res) => {
        setAllServices(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false);
      });
  }, []);

  const filteredServices = useMemo(() => {
    let currentServices = allServices;

    if (serviceType !== "all") {
      currentServices = currentServices.filter(
        (service) => service.service_category === serviceType
      );
    }

    currentServices = currentServices.filter((service) => {
      const cost = service.cost;
      return cost >= minBudget && cost <= maxBudget;
    });

    if (searchTerm) {
      currentServices = currentServices.filter((service) =>
        service.service_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return currentServices;
  }, [allServices, searchTerm, serviceType, minBudget, maxBudget]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="py-12">
      <h1 className="text-5xl font-extrabold text-center mb-10 text-primary">
        Explore All Decoration Services
      </h1>

      <div className="bg-base-200 p-6 rounded-lg shadow-inner mb-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <FaSearch /> Search by Service Name
              </span>
            </label>
            <input
              type="text"
              placeholder="e.g. Wedding, Home Interior"
              className="input input-bordered w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <FaFilter /> Service Type
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            >
              {serviceCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Min Budget (BDT)</span>
            </label>
            <input
              type="number"
              placeholder="Min Budget"
              className="input input-bordered w-full"
              value={minBudget === 0 ? "" : minBudget}
              onChange={(e) => setMinBudget(Number(e.target.value) || 0)}
              min="0"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Max Budget (BDT)</span>
            </label>
            <input
              type="number"
              placeholder="Max Budget"
              className="input input-bordered w-full"
              value={maxBudget === 999999 ? "" : maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value) || 999999)}
              min="0"
            />
          </div>
        </div>
      </div>

      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="card bg-base-100 shadow-xl border-t-4 border-primary transition duration-300 hover:scale-[1.02]"
            >
              <figure className="h-60">
                <img
                  src={
                    service.image ||
                    "https://daisyui.com/images/stock/photo-1606107555195-ed6e29d6b2c2.jpg"
                  }
                  alt={service.service_name}
                  className="h-full w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-2xl mb-2">
                  {service.service_name}
                  <div className="badge badge-secondary">
                    {service.service_category.toUpperCase()}
                  </div>
                </h3>
                <p className="text-lg font-semibold text-accent flex items-center gap-1">
                  <FaTools className="text-sm" />
                  {service.cost.toLocaleString()} BDT / {service.unit}
                </p>
                <p className="text-gray-500 mt-2">
                  {service.description.substring(0, 100)}...
                </p>

                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/service/${service.id}`}
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-base-100 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-error">No Services Found</h2>
          <p className="mt-4 text-lg">
            Try adjusting your filters or search terms.
          </p>
        </div>
      )}
    </div>
  );
};

export default Services;
