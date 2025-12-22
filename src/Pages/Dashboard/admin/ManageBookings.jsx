import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import { FaUsers, FaCheckCircle, FaTools, FaTimesCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allBookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/bookings/status/${bookingId}`, {
        status: newStatus,
      });

      if (res.data.modifiedCount > 0) {
        toast.success(`Booking status updated to ${newStatus}.`);
        refetch();
      } else {
        toast.error("Failed to update status.");
      }
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Could not update booking status.");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-error mb-8 flex items-center gap-2">
        <FaTools /> Manage All Bookings ({allBookings.length})
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="table w-full">
          <thead className="bg-red-100 text-error">
            <tr>
              <th>Service</th>
              <th>Client</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allBookings.map((booking) => (
              <tr key={booking._id}>
                <td className="font-semibold">{booking.serviceName}</td>
                <td>
                  {booking.bookerName} ({booking.bookerEmail})
                </td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${
                      booking.status === "Assigned"
                        ? "badge-info"
                        : booking.status === "Confirmed"
                        ? "badge-warning"
                        : booking.status === "Completed"
                        ? "badge-success"
                        : "badge-neutral"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td>
                  {booking.status === "Confirmed" && (
                    <button
                      onClick={() =>
                        handleUpdateStatus(booking._id, "Completed")
                      }
                      className="btn btn-success btn-xs text-white mr-2"
                    >
                      <FaCheckCircle /> Complete
                    </button>
                  )}
                  {booking.status !== "Cancelled" && (
                    <button
                      onClick={() =>
                        handleUpdateStatus(booking._id, "Cancelled")
                      }
                      className="btn btn-error btn-xs text-white"
                    >
                      <FaTimesCircle /> Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {allBookings.length === 0 && (
        <p className="text-center mt-12 text-xl text-gray-500">
          No bookings available to manage.
        </p>
      )}
    </section>
  );
};

export default ManageBookings;
