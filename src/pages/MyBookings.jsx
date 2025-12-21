import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = `http://localhost:5000/bookings?email=${user?.email}`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [url]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel booking!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/bookings/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire(
              "Cancelled!",
              "Your booking has been cancelled.",
              "success"
            );
            setBookings(bookings.filter((b) => b._id !== id));
          }
        });
      }
    });
  };

  if (loading)
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen">
      <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-10 text-center">
        My Bookings ({bookings.length})
      </h2>

      {bookings.length === 0 ? (
        <div className="text-center py-20 text-gray-400 font-medium text-lg md:text-xl">
          You have no bookings yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full bg-white rounded-2xl shadow-xl text-lg md:text-xl">
            <thead className="bg-primary text-white rounded-t-2xl text-lg md:text-xl">
              <tr>
                <th>Service</th>
                <th>Date</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-14 h-14 md:w-16 md:h-16">
                          <img
                            src={booking.service_image}
                            alt={booking.service_name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-secondary text-lg md:text-xl">
                          {booking.service_name}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="text-gray-600 text-lg md:text-xl">
                    {booking.date}
                  </td>

                  <td className="font-bold text-primary text-lg md:text-xl">
                    ${booking.price}
                  </td>

                  <td>
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-center font-semibold text-sm md:text-base ${
                        booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status.toUpperCase()}
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="btn btn-sm md:btn-md btn-error text-white rounded-full flex items-center gap-2 hover:bg-red-600 transition-colors"
                    >
                      <FaTrash className="text-white" /> Cancel
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
