import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import {
  FaUsers,
  FaCheckCircle,
  FaTools,
  FaTimesCircle,
  FaUserPlus,
} from "react-icons/fa";
import toast from "react-hot-toast";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();


  const {
    data: allBookings = [],
    isLoading: bookingLoading,
    refetch,
  } = useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

 
  const { data: decorators = [] } = useQuery({
    queryKey: ["all-decorators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/decorators");
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
      }
    } catch (error) {
      toast.error("Could not update status.");
    }
  };


  const handleAssign = async (bookingId, decoratorEmail) => {
    if (!decoratorEmail) return;
    try {
      const res = await axiosSecure.patch(`/bookings/assign/${bookingId}`, {
        decoratorEmail,
        status: "Assigned",
      });
      if (res.data.modifiedCount > 0) {
        toast.success("Decorator assigned successfully!");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to assign decorator.");
    }
  };

  if (bookingLoading) return <LoadingSpinner />;

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
              <th>Payment</th>
              <th>Assign Decorator</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allBookings.map((booking) => (
              <tr key={booking._id}>
                <td className="font-semibold">{booking.serviceName}</td>
                <td>
                  {booking.bookerName} <br />{" "}
                  <span className="text-xs text-gray-400">
                    {booking.bookerEmail}
                  </span>
                </td>

              
                <td>
                  <span
                    className={`badge ${
                      booking.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-error"
                    } text-white`}
                  >
                    {booking.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                  </span>
                </td>

              
                <td>
                  {booking.paymentStatus === "paid" ? (
                    <select
                      className="select select-bordered select-xs w-full max-w-xs"
                      onChange={(e) =>
                        handleAssign(booking._id, e.target.value)
                      }
                      defaultValue={booking.decoratorEmail || ""}
                    >
                      <option value="" disabled>
                        Select Decorator
                      </option>
                      {decorators.map((dec) => (
                        <option key={dec._id} value={dec.email}>
                          {dec.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-xs text-gray-400 italic">
                      Wait for payment
                    </span>
                  )}
                </td>

                <td>
                  <span
                    className={`badge ${
                      booking.status === "Assigned"
                        ? "badge-info"
                        : "badge-neutral"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>

                <td>
                  <div className="flex gap-2">
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageBookings;
