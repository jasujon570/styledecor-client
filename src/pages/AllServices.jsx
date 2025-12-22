import { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:5000/services?search=${search}&sort=${sort}`
        );
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [search, sort]);

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 min-h-screen">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-secondary mb-4">
          All Decoration Services
        </h2>
        <p className="text-gray-500">
          Find the perfect decor for your next big event.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-12 justify-center items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        {/* Search */}
        <div className="form-control w-full max-w-md">
          <div className="input-group flex">
            <input
              type="text"
              placeholder="Search by service name..."
              className="input input-bordered w-full focus:outline-primary"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary ml-2">Search</button>
          </div>
        </div>

        {/* Sort */}
        <div className="form-control w-full max-w-xs">
          <select
            className="select select-bordered w-full focus:outline-primary"
            onChange={(e) => setSort(e.target.value)}
            value={sort}
          >
            <option value="">Sort by Price</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>

          {services.length === 0 && (
            <div className="text-center py-20">
              <img
                src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png"
                alt="Not Found"
                className="w-24 mx-auto mb-4 opacity-20"
              />
              <p className="text-gray-400 text-xl font-medium">
                No services found matching "{search}"
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllServices;
