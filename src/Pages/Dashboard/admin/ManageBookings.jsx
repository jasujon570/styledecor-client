import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import { FaUserEdit, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: bookings = [],
    isLoading: isBookingsLoading,
    refetch,
  } = useQuery({
    queryKey: ["manage-all-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

  const { data: decorators = [] } = useQuery({
    queryKey: ["all-decorators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorators");
      return res.data;
    },
  });

  const handleAssignDecorator = async (bookingId, decorator) => {
    if (!decorator) return;

    try {
      const res = await axiosSecure.patch(
        `/bookings/assign-decorator/${bookingId}`,
        {
          decoratorEmail: decorator.email,
          decoratorName: decorator.name,
        }
      );

      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Decorator Assigned!",
          text: `Project assigned to ${decorator.name}`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire("Error", "Could not assign decorator", "error");
    }
  };

  if (isBookingsLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-secondary flex items-center gap-2">
          <FaUserEdit /> Manage All Bookings ({bookings.length})
        </h2>
      </div>

      <div className="overflow-x-auto bg-white rounded-3xl shadow-xl border">
        <table className="table w-full">
          <thead className="bg-secondary text-white">
            <tr className="text-center">
              <th>#</th>
              <th>Service & User</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Assign Decorator</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={booking._id}
                className="hover:bg-gray-50 text-center border-b"
              >
                <th>{index + 1}</th>
                <td className="text-left">
                  <div className="font-bold text-primary">
                    {booking.serviceName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {booking.userEmail}
                  </div>
                </td>
                <td className="font-bold italic">৳{booking.price}</td>
                <td>
                  {booking.paymentStatus === "paid" ? (
                    <span className="badge badge-success gap-1 text-white py-3 px-4">
                      <FaCheckCircle /> Paid
                    </span>
                  ) : (
                    <span className="badge badge-warning gap-1 py-3 px-4">
                      <FaHourglassHalf /> Unpaid
                    </span>
                  )}
                </td>
                <td>
                  <span
                    className={`capitalize font-semibold ${
                      booking.status === "completed"
                        ? "text-success"
                        : booking.status === "assigned"
                        ? "text-info"
                        : "text-orange-400"
                    }`}
                  >
                    {booking.status || "Pending"}
                  </span>
                </td>
                <td>
                  <div className="form-control w-full max-w-xs mx-auto">
                    {booking.decoratorEmail ? (
                      <div className="text-xs">
                        <p className="font-bold text-gray-700">
                          {booking.decoratorName}
                        </p>
                        <button
                          onClick={() =>
                            handleAssignDecorator(booking._id, null)
                          }
                          className="text-primary hover:underline"
                        >
                          Change
                        </button>
                      </div>
                    ) : (
                      <select
                        onChange={(e) => {
                          const decorator = decorators.find(
                            (d) => d.email === e.target.value
                          );
                          handleAssignDecorator(booking._id, decorator);
                        }}
                        className="select select-bordered select-sm w-full focus:ring-2 focus:ring-primary"
                        defaultValue=""
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
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bookings.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-gray-400">
            No bookings found in the database.
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
