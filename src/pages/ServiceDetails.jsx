import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { FaStar, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const ServiceDetails = () => {
  const service = useLoaderData();
  const {
    _id,
    service_name,
    service_image,
    description,
    cost,
    unit,
    service_area,
    ratings,
  } = service;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBookService = (e) => {
    e.preventDefault();
    const form = e.target;
    const date = form.date.value;
    const instruction = form.instruction.value;

    const booking = {
      customerName: user?.displayName,
      email: user?.email,
      date,
      instruction,
      service_name,
      service_id: _id,
      service_image,
      price: cost,
      status: "pending",
    };

    axios
      .post("http://localhost:5000/bookings", booking)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Service Booked Successfully!");
          document.getElementById("booking_modal").close();
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 bg-white p-10 rounded-3xl shadow-2xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 relative rounded-3xl overflow-hidden shadow-xl"
          >
            <img
              src={service_image}
              alt={service_name}
              className="w-full h-112.5 object-cover rounded-3xl transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-5 left-5 bg-primary/90 text-white px-4 py-2 rounded-full font-semibold shadow-lg flex items-center gap-2">
              <FaMapMarkerAlt />
              <span>{service_area}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 flex flex-col justify-between"
          >
            <div>
              <h1 className="text-5xl font-extrabold text-secondary mb-6">
                {service_name}
              </h1>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                {description}
              </p>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaMapMarkerAlt className="text-primary" />
                  <span>{service_area}</span>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <span className="font-bold text-secondary">{ratings}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-extrabold text-primary">
                  ${cost}
                </span>
                <span className="text-gray-500 font-medium">/ {unit}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document.getElementById("booking_modal").showModal()
              }
              className="btn btn-primary btn-lg rounded-full text-white shadow-2xl py-4 px-8 font-semibold text-xl transition-transform"
            >
              Book This Service Now
            </motion.button>
          </motion.div>
        </div>

        <dialog
          id="booking_modal"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box rounded-2xl p-8 bg-white shadow-2xl">
            <h3 className="font-bold text-2xl text-secondary mb-2">
              Confirm Booking: {service_name}
            </h3>
            <p className="text-gray-500 mb-6">
              Service Price:{" "}
              <span className="font-semibold text-primary">${cost}</span>
            </p>

            <form
              onSubmit={handleBookService}
              method="dialog"
              className="space-y-4"
            >
              <input
                type="text"
                defaultValue={user?.displayName}
                readOnly
                className="input input-bordered w-full bg-gray-100"
                placeholder="Name"
              />

              <input
                type="email"
                defaultValue={user?.email}
                readOnly
                className="input input-bordered w-full bg-gray-100"
                placeholder="Email"
              />

              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-primary text-lg" />
                <input
                  type="date"
                  name="date"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <textarea
                name="instruction"
                className="textarea textarea-bordered w-full h-24"
                placeholder="e.g. House 15, Road 3, Block B, Uttara, Dhaka"
              ></textarea>

              <div className="modal-action flex justify-end gap-3">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() =>
                    document.getElementById("booking_modal").close()
                  }
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary text-white">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ServiceDetails;
