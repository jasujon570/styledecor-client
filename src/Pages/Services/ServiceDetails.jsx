import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { useState } from "react";
import BookingModal from "./BookingModal";
import useAuth from "../../hooks/useAuth";

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);

  const { data: service = {}, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/services/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-10 rounded-3xl shadow-2xl border">
        <img
          src={service.service_image}
          className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
          alt=""
        />
        <div className="space-y-6">
          <h1 className="text-5xl font-black text-gray-800">
            {service.service_name}
          </h1>
          <div className="badge badge-secondary p-4">
            {service.service_category}
          </div>
          <p className="text-3xl font-bold text-primary">
            Price: ৳{service.cost}{" "}
            <span className="text-sm font-normal text-gray-400">
              ({service.unit})
            </span>
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            {service.description}
          </p>
          <div className="bg-gray-50 p-4 rounded-xl border border-dashed">
            <p className="font-bold">Area Coverage: {service.service_area}</p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="btn btn-primary btn-lg w-full"
          >
            Book This Service
          </button>
        </div>
      </div>

      <BookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        service={service}
        user={user}
      />
    </div>
  );
};

export default ServiceDetails;
