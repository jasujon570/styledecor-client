import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaMapMarkerAlt,
  FaTools,
} from "react-icons/fa";

import BookingModal from "./BookingModal";

const ServiceDetails = () => {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("/mockServices.json")
      .then((res) => {
        const foundService = res.data.find((s) => s.id === parseInt(id));
        setService(foundService);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching service details:", error);
        setLoading(false);
        toast.error("Service details not found.");
      });
  }, [id]);

  const handleBookNow = () => {
    if (!user) {
      toast.error("Please login to book a service.");
      navigate("/login", { state: { from: `/service/${id}` } });
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading || authLoading) {
    return <LoadingSpinner />;
  }

  if (!service) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold text-error">Service Not Found</h2>
      </div>
    );
  }

  return (
    <div className="py-12">
      <h1 className="text-5xl font-extrabold text-primary mb-6">
        {service.service_name}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <img
            src={service.image}
            alt={service.service_name}
            className="w-full h-100 object-cover rounded-xl shadow-lg mb-6"
          />
          <div className="bg-base-100 p-8 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold mb-4 text-secondary">
              Service Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {service.description}
            </p>

            <div className="mt-8 pt-6 border-t">
              <h3 className="text-2xl font-bold mb-3 text-primary">
                Service Info
              </h3>
              <div className="space-y-3">
                <p className="flex items-center gap-3 text-lg">
                  <FaDollarSign className="text-accent" />
                  Price:{" "}
                  <span className="font-bold">
                    {service.cost.toLocaleString()} BDT / {service.unit}
                  </span>
                </p>
                <p className="flex items-center gap-3 text-lg">
                  <FaTools className="text-accent" />
                  Category:{" "}
                  <span className="font-bold">
                    {service.service_category.toUpperCase()}
                  </span>
                </p>

                <p className="flex items-center gap-3 text-lg">
                  <FaCalendarAlt className="text-accent" />
                  Decorator:{" "}
                  <span className="font-bold">Team Alpha Design</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-base-100 p-6 rounded-xl shadow-lg border-t-4 border-accent">
            <h3 className="text-2xl font-bold mb-4 text-accent">
              Booking Status
            </h3>

            <div className="flex justify-center my-4">
              <button
                onClick={handleBookNow}
                className="btn btn-primary btn-lg w-full"
              >
                Book Now
              </button>
            </div>
            <p className="text-sm text-center text-gray-500">
              {user ? `Logged in as: ${user.email}` : "Login required to book."}
            </p>
          </div>

          <div className="bg-base-100 p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
              <FaMapMarkerAlt /> Service Location
            </h3>
            <div className="h-48 bg-base-200 rounded-lg flex items-center justify-center">
              <p className="text-sm">Mini Map Placeholder</p>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        service={service}
        user={user}
      />
    </div>
  );
};

export default ServiceDetails;
