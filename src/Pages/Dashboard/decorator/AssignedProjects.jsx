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
        `/bookings/decorator?email=${user.email}`
      );
      return res.data;
    },
  });

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/bookings/status/${id}`, {
        status: newStatus,
      });
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Status updated to ${newStatus}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Update failed", error);
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-secondary mb-8 flex items-center gap-2">
        <FaTasks /> My Assigned Projects ({projects.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="card bg-base-100 shadow-xl border-l-8 border-secondary"
          >
            <div className="card-body">
              <div className="flex justify-between items-start">
                <h3 className="card-title text-2xl text-secondary">
                  {project.serviceName}
                </h3>
                <div
                  className={`badge badge-lg ${
                    project.status === "completed"
                      ? "badge-success"
                      : project.status === "in-progress"
                      ? "badge-info"
                      : "badge-warning"
                  } capitalize`}
                >
                  {project.status}
                </div>
              </div>

              <p className="mt-4 text-gray-600 font-semibold">
                <FaCalendarCheck className="inline mr-2 text-primary" />
                Date: {new Date(project.bookingDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                <FaMapMarkerAlt className="inline mr-2 text-primary" />
                Location: {project.location}
              </p>

              <div className="divider">Client Info</div>
              <p className="text-gray-700">
                <FaUser className="inline mr-2 text-accent" />
                Client: {project.bookerName}
              </p>
              <p className="text-sm text-gray-500 ml-6">
                {project.bookerEmail}
              </p>

              <div className="card-actions justify-end mt-6 pt-4 border-t">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">
                      Change Work Status:
                    </span>
                  </label>
                  <select
                    defaultValue={project.status}
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
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center mt-20">
          <p className="text-xl text-gray-500">
            No projects assigned to you yet.
          </p>
        </div>
      )}
    </section>
  );
};

export default AssignedProjects;
