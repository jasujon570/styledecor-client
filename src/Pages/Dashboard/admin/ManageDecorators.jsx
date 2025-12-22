import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import { FaUserShield, FaUserEdit, FaUsers } from "react-icons/fa";
import toast from "react-hot-toast";

const ManageDecorators = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");

      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const handleUpdateRole = async (user, newRole) => {
    try {
      const res = await axiosSecure.patch(`/users/update-role/${user._id}`, {
        role: newRole,
      });
      if (res.data.modifiedCount > 0) {
        toast.success(`${user.displayName} is now a ${newRole}!`);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update role.");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-2 text-primary">
        <FaUsers /> Manage Users & Decorators ({users.length})
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-xl">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.displayName || user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "admin"
                        ? "badge-secondary"
                        : user.role === "decorator"
                        ? "badge-accent"
                        : "badge-ghost"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </td>
                <td className="flex gap-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleUpdateRole(user, "admin")}
                      className="btn btn-xs btn-outline btn-secondary"
                      title="Make Admin"
                    >
                      <FaUserShield /> Admin
                    </button>
                  )}
                  {user.role !== "decorator" && (
                    <button
                      onClick={() => handleUpdateRole(user, "decorator")}
                      className="btn btn-xs btn-outline btn-accent"
                      title="Make Decorator"
                    >
                      <FaUserEdit /> Decorator
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDecorators;
