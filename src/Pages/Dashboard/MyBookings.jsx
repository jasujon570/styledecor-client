import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { FaDollarSign, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: bookings = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myBookings", user?.uid],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings/my-bookings");
      return res.data;
    },
  });

  const handleCancelBooking = async (booking) => {
    if (booking.paymentStatus !== "Pending") {
      toast.error("Only unpaid bookings can be cancelled.");
      return;
    }

    if (
      !window.confirm(
        `Are you sure you want to cancel the booking for ${booking.serviceName}?`
      )
    ) {
      return;
    }

    try {
      await axiosSecure.put(`/bookings/cancel/${booking._id}`);
      toast.success(`${booking.serviceName} booking cancelled.`);
      refetch();
    } catch (error) {
      console.error("Cancel error:", error);
      const apiMessage =
        error?.response?.data?.message || error?.response?.data?.error;
      toast.error(apiMessage || "Could not cancel booking.");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-error mb-2">
          Failed to load bookings
        </h2>
        <p className="opacity-80">
          {error?.response?.data?.message || error?.message}
        </p>
      </div>
    );
  }

  return (
    <section className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-primary mb-8">
        My Bookings ({bookings.length})
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Service Name</th>
              <th>Cost</th>
              <th>Booking Date</th>
              <th>Service Status</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <th>{index + 1}</th>
                <td className="font-semibold">{booking.serviceName}</td>
                <td>
                  <FaDollarSign className="inline" />{" "}
                  {booking.cost.toLocaleString()}
                </td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${
                      booking.serviceStatus === "Assigned"
                        ? "badge-info"
                        : booking.serviceStatus === "In-Progress"
                        ? "badge-warning"
                        : booking.serviceStatus === "Completed"
                        ? "badge-success"
                        : booking.serviceStatus === "Cancelled"
                        ? "badge-error"
                        : "badge-neutral"
                    }`}
                  >
                    {booking.serviceStatus}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      booking.paymentStatus === "Paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {booking.paymentStatus}
                  </span>
                </td>
                <td>
                  {booking.paymentStatus === "Pending" && (
                    <button
                      onClick={() => handleCancelBooking(booking)}
                      className="btn btn-error btn-sm text-white"
                    >
                      <FaTrash /> Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bookings.length === 0 && (
        <p className="text-center mt-12 text-xl text-gray-500">
          You have no active bookings yet.
        </p>
      )}
    </section>
  );
};

export default MyBookings;
