import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import {
  FaTasks,
  FaUser,
  FaMapMarkerAlt,
  FaCalendarCheck,
} from "react-icons/fa";
import Swal from "sweetalert2";

const AssignedProjects = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: projects = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assignedProjects", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings/assigned-projects/${user.email}`
      );
      return res.data;
    },
  });

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/bookings/update-status/${id}`, {
        status: newStatus,
      });
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: `Status: ${newStatus}`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-secondary mb-8 flex items-center gap-2">
        <FaTasks /> Assigned Projects ({projects.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="card bg-base-100 shadow-xl border-l-8 border-secondary p-6"
          >
            <div className="flex justify-between">
              <h3 className="text-xl font-bold">{project.serviceName}</h3>
              <span
                className={`badge badge-lg ${
                  project.status === "completed"
                    ? "badge-success"
                    : "badge-warning"
                }`}
              >
                {project.status || "pending"}
              </span>
            </div>
            <div className="mt-4 space-y-1 text-sm">
              <p>
                <FaMapMarkerAlt className="inline mr-2 text-primary" />{" "}
                <strong>Location:</strong> {project.location || "N/A"}
              </p>
              <p>
                <FaUser className="inline mr-2 text-accent" />{" "}
                <strong>Client:</strong> {project.userEmail}
              </p>
            </div>
            <div className="mt-6">
              <label className="label-text font-bold block mb-2">
                Change Status:
              </label>
              <select
                defaultValue={project.status || "pending"}
                onChange={(e) =>
                  handleStatusUpdate(project._id, e.target.value)
                }
                className="select select-bordered select-secondary w-full"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
      {projects.length === 0 && (
        <p className="text-center text-gray-400 mt-20">No projects found.</p>
      )}
    </section>
  );
};

export default AssignedProjects;
