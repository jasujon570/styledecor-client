import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { FaStar, FaTools, FaCheckCircle } from "react-icons/fa";

const TopDecoratorsSection = () => {
  const [decorators, setDecorators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/mockDecorators.json")
      .then((res) => {
        setDecorators(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching decorators:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="py-16 bg-base-100">
      <h2 className="text-4xl font-bold text-center mb-10 text-secondary">
        Meet Our Top Decorators
      </h2>
      <p className="text-center mb-12 text-lg text-gray-600">
        Highly rated professionals ready to transform your space.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {decorators.map((decorator) => (
          <div
            key={decorator.id}
            className="card bg-white shadow-xl hover:shadow-2xl transition duration-300"
          >
            <figure className="px-10 pt-10">
              <div className="avatar">
                <div className="w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={decorator.image} alt={decorator.name} />
                </div>
              </div>
            </figure>
            <div className="card-body items-center text-center">
              <h3 className="card-title text-2xl">{decorator.name}</h3>
              <div className="flex items-center space-x-2 text-warning">
                <FaStar />
                <span className="font-bold">{decorator.rating} Rating</span>
                <FaCheckCircle className="text-primary" />
              </div>
              <p className="text-sm mt-2 flex items-center gap-2">
                <FaTools className="text-accent" />
                <span className="font-semibold text-gray-700">
                  {decorator.specialty}
                </span>
              </p>
              <div className="badge badge-lg badge-outline mt-3">
                {decorator.projects}+ Projects Completed
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDecoratorsSection;
