import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import toast from "react-hot-toast";
import { FaTasks, FaUserCheck } from "react-icons/fa";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: bookings = [],
    isLoading: bLoading,
    refetch,
  } = useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings/all");
      return res.data;
    },
  });

  const { data: decorators = [] } = useQuery({
    queryKey: ["allDecorators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data.filter((user) => user.role === "decorator");
    },
  });

  const handleAssign = async (bookingId, decorator) => {
    try {
      const res = await axiosSecure.patch(
        `/bookings/assign-decorator/${bookingId}`,
        {
          decoratorEmail: decorator.email,
          decoratorName: decorator.displayName || decorator.name,
        }
      );
      if (res.data.modifiedCount > 0) {
        toast.success("Decorator Assigned Successfully!");
        refetch();
      }
    } catch (error) {
      toast.error("Assignment Failed!");
    }
  };

  if (bLoading) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <FaTasks /> Manage All Bookings
      </h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow-xl">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>Service</th>
              <th>Customer</th>
              <th>Payment</th>
              <th>Assign Decorator</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.serviceName}</td>
                <td>{booking.userEmail}</td>
                <td>
                  <span
                    className={`badge ${
                      booking.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-error text-white"
                    }`}
                  >
                    {booking.paymentStatus || "unpaid"}
                  </span>
                </td>
                <td>
                  {booking.paymentStatus === "paid" ? (
                    <select
                      defaultValue={booking.decoratorEmail || ""}
                      onChange={(e) => {
                        const selected = decorators.find(
                          (d) => d.email === e.target.value
                        );
                        handleAssign(booking._id, selected);
                      }}
                      className="select select-bordered select-xs w-full max-w-xs"
                    >
                      <option value="" disabled>
                        Select Decorator
                      </option>
                      {decorators.map((d) => (
                        <option key={d._id} value={d.email}>
                          {d.displayName || d.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-xs italic text-gray-400">
                      Wait for Payment
                    </span>
                  )}
                </td>
                <td>
                  <span className="badge badge-outline">
                    {booking.status || "pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
