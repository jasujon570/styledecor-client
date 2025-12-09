// client/src/pages/ServiceDetails/ServiceDetails.jsx (সম্পূর্ণ ফাইল)

import { useParams } from "react-router-dom";
import useServiceDetails from "../../hooks/useServiceDetails";
import { FaUser, FaTag, FaDollarSign, FaEnvelope } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookingModal from "../../components/BookingModal";
import Swal from "sweetalert2";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, loading] = useServiceDetails(id);
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!service._id) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl text-error">Service Not Found (ID: {id})</h1>
      </div>
    );
  }

  const handleBookNow = () => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "You must log in to book this service.",
        icon: "warning",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
          // navigate('/login', { state: { from: location } });
        }
      });
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className="py-10">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className="lg:w-1/2">
          <img
            src={service.packageImage}
            alt={service.service_name}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body lg:w-1/2 p-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {service.service_name}
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {service.description}
          </p>

          <div className="space-y-3 mb-6">
            <p className="flex items-center text-2xl font-semibold text-secondary">
              <FaDollarSign className="mr-3" /> Cost: {service.cost} BDT{" "}
              <span className="text-lg font-normal">({service.unit})</span>
            </p>
            <p className="flex items-center text-lg text-neutral">
              <FaTag className="mr-3" /> Category: {service.service_category}
            </p>
            <p className="flex items-center text-md text-gray-500">
              <FaUser className="mr-3" /> Created By: {service.createdByEmail}
            </p>
          </div>

          <div className="card-actions justify-end mt-8">
            <button
              onClick={handleBookNow}
              className="btn btn-primary btn-lg"
              disabled={!user}
            >
              {user ? "Book Now & Pay" : "Login to Book"}
            </button>
          </div>
        </div>
      </div>

      <BookingModal
        service={service}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ServiceDetails;
