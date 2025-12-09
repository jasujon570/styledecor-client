    import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: bookings = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["myBookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/user/${user.email}`);
      return res.data;
    },
  });

  if (loading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-base-100 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-neutral mb-6">
        My Service Bookings ({bookings.length})
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center py-10 text-xl text-gray-500">
          You haven't booked any services yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200">
                <th>#</th>
                <th>Service Name</th>
                <th>Cost</th>
                <th>Booking Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <th>{index + 1}</th>
                  <td>{booking.serviceName}</td>
                  <td>{booking.cost} BDT</td>
                  <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        booking.status === "confirmed"
                          ? "badge-success"
                          : booking.status === "pending"
                          ? "badge-warning"
                          : "badge-error"
                      } text-white`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline btn-error">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
