import useServices from "../../hooks/useServices";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaSearch, FaFilter, FaRedo } from "react-icons/fa";

const Services = () => {
  const [services, loading, refetch] = useServices();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    minCost: "",
    maxCost: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();

    console.log("Searching for:", searchQuery);
  };

  const handleFilter = () => {
    console.log("Filtering with:", filters);
  };

  const handleReset = () => {
    setSearchQuery("");
    setFilters({ category: "", minCost: "", maxCost: "" });

    refetch();
  };

  return (
    <div className="py-10">
      <h1 className="text-5xl font-bold text-center mb-12 text-primary">
        All Decoration Services
      </h1>

      <div className="bg-base-100 p-6 rounded-xl shadow-lg mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <form onSubmit={handleSearch} className="md:col-span-2">
            <label className="label">
              <span className="label-text flex items-center">
                <FaSearch className="mr-2" /> Search by Name
              </span>
            </label>
            <div className="join w-full">
              <input
                type="text"
                placeholder="Service name..."
                className="input input-bordered join-item w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn btn-primary join-item">
                Search
              </button>
            </div>
          </form>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Category Filter</span>
            </label>
            <select
              className="select select-bordered"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            >
              <option value="">All Categories</option>
              <option value="home">Home</option>
              <option value="wedding">Wedding</option>
              <option value="office">Office</option>
              <option value="seminar">Seminar</option>
            </select>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleFilter}
              className="btn btn-secondary flex-grow flex items-center"
            >
              <FaFilter /> Filter
            </button>
            <button
              onClick={handleReset}
              className="btn btn-ghost flex items-center"
            >
              <FaRedo /> Reset
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service._id}
              className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition duration-300"
            >
              <figure className="h-64">
                <img
                  src={service.packageImage}
                  alt={service.service_name}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl text-neutral">
                  {service.service_name}
                </h2>
                <p className="text-lg font-semibold text-secondary">
                  Cost: {service.cost} BDT{" "}
                  <span className="font-normal text-sm text-gray-500">
                    ({service.unit})
                  </span>
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {service.description}
                </p>
                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/service/${service._id}`}
                    className="btn btn-primary"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {services.length === 0 && !loading && (
        <p className="text-center text-xl text-error py-10">
          No services found matching your criteria.
        </p>
      )}
    </div>
  );
};

export default Services;
