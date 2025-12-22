import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const UpdateStatus = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: projects = [], refetch } = useQuery({
    queryKey: ["update-status", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings/assigned-projects/${user.email}`
      );
      return res.data;
    },
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/bookings/update-status/${id}`, {
        status: newStatus,
      });
      if (res.data.modifiedCount > 0) {
        toast.success("Status Updated!");
        refetch();
      }
    } catch (err) {
      toast.error("Failed!");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-secondary mb-8">
        Update Status 🔄
      </h1>
      <table className="table w-full bg-white shadow rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th>Service</th>
            <th>Client</th>
            <th>Current Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p._id}>
              <td>{p.serviceName}</td>
              <td>{p.userEmail}</td>
              <td>
                <span className="badge badge-info">{p.status}</span>
              </td>
              <td>
                <select
                  className="select select-sm select-bordered"
                  onChange={(e) => handleStatusChange(p._id, e.target.value)}
                  defaultValue={p.status}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateStatus;
