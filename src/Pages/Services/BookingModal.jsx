import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCalendarCheck, FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BookingModal = ({ isOpen, onClose, service, user }) => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  if (!isOpen || !service || !user) return null;

  const onSubmit = (data) => {
    const toastId = toast.loading("Creating your booking...");

    const bookingData = {
      serviceId: service._id || service.id,
      serviceName: service.service_name,
      price: service.cost,
      unit: service.unit,
      bookingDate: data.bookingDate,
      location: data.location,
      userEmail: user?.email,
      userName: user?.displayName,
      paymentStatus: "unpaid",
      status: "pending",
    };

    axiosSecure
      .post("/bookings", bookingData)
      .then((res) => {
        const bookingId = res?.data?.insertedId || res?.data?.bookingId;

        if (res.data) {
          toast.success("Booking created! Redirecting to payment...", {
            id: toastId,
          });

          onClose();
          reset();

          navigate(`/dashboard/payment/${bookingId}`, {
            state: {
              booking: {
                _id: bookingId,
                ...bookingData,
              },
            },
          });
        }
      })
      .catch((error) => {
        console.error("Create Booking Error:", error);
        const apiMessage =
          error?.response?.data?.message || "Failed to create booking.";
        toast.error(apiMessage, { id: toastId });
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-9999 p-4 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl max-w-lg w-full relative shadow-2xl animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-error transition-colors"
        >
          <FaTimes size={22} />
        </button>

        <h3 className="font-bold text-2xl text-primary flex items-center gap-2 mb-4">
          <FaCalendarCheck className="text-accent" /> Confirm Booking
        </h3>

        <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="font-bold text-lg text-gray-800">
            {service?.service_name}
          </p>
          <p className="text-primary font-bold text-xl mt-1">
            {service?.cost?.toLocaleString()} BDT{" "}
            <span className="text-sm font-normal text-gray-500">
              / {service?.unit}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label-text mb-1 font-semibold text-gray-600">
                Your Name
              </label>
              <input
                type="text"
                defaultValue={user?.displayName}
                disabled
                className="input input-bordered w-full bg-gray-50 text-gray-500"
              />
            </div>
            <div className="form-control">
              <label className="label-text mb-1 font-semibold text-gray-600">
                Your Email
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                disabled
                className="input input-bordered w-full bg-gray-50 text-gray-500"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label-text mb-1 font-semibold text-gray-700">
              Preferred Date
            </label>
            <input
              type="date"
              className={`input input-bordered w-full ${
                errors.bookingDate ? "border-error" : ""
              }`}
              {...register("bookingDate", {
                required: "Please select a booking date",
              })}
            />

            {errors.bookingDate && (
              <span className="text-error text-xs mt-1 font-medium">
                {errors.bookingDate.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label-text mb-1 font-semibold text-gray-700">
              Service Address
            </label>
            <textarea
              className={`textarea textarea-bordered w-full h-24 ${
                errors.location ? "border-error" : ""
              }`}
              placeholder="e.g. House 12, Road 5, Sector 7, Uttara, Dhaka"
              {...register("location", {
                required: "Address is required",
                minLength: { value: 10, message: "Address is too short" },
              })}
            />
            {errors.location && (
              <span className="text-error text-xs mt-1 font-medium">
                {errors.location.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-4 text-white font-bold text-lg"
          >
            Confirm & Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
