import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";

const ManageServices = () => {
  const { user } = useContext(AuthContext);
  const [myServices, setMyServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/my-services?email=${user?.email}`)
        .then((res) => {
          setMyServices(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This service will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/services/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Service removed.", "success");
            setMyServices(myServices.filter((s) => s._id !== id));
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
    <div className="container mx-auto py-12 px-4 min-h-screen">
      <h2 className="text-4xl font-bold text-secondary text-center mb-10">
        Manage My Services
      </h2>

      {myServices.length === 0 ? (
        <div className="text-center text-gray-500 font-medium text-lg py-20">
          You have no services added yet.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
          <table className="table table-zebra w-full text-lg md:text-xl">
            <thead className="bg-primary text-white text-lg md:text-xl">
              <tr>
                <th>Service</th>
                <th>Cost</th>
                <th>Area</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myServices.map((service) => (
                <tr
                  key={service._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="font-semibold">{service.service_name}</td>
                  <td className="text-primary font-bold">${service.cost}</td>
                  <td>{service.service_area}</td>
                  <td>
                    <span
                      className={`badge text-sm md:text-base ${
                        service.status === "active"
                          ? "badge-success"
                          : service.status === "inactive"
                          ? "badge-warning"
                          : "badge-ghost"
                      }`}
                    >
                      {service.status ? service.status.toUpperCase() : "N/A"}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    <Link
                      to={`/update-service/${service._id}`}
                      className="btn btn-sm btn-primary flex items-center gap-1 hover:scale-105 transition-transform"
                    >
                      <FaEdit /> Update
                    </Link>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="btn btn-sm btn-error flex items-center gap-1 hover:scale-105 transition-transform"
                    >
                      <FaTrash /> Delete
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

export default ManageServices;
