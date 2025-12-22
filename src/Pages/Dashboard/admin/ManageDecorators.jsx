import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import { FaUserShield, FaUserPlus, FaUserTie } from "react-icons/fa";
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
      return res.data;
    },
  });

  const handleUpdateRole = async (user, newRole) => {
    try {
      const res = await axiosSecure.patch(`/users/role/${user._id}`, {
        role: newRole,
      });
      if (res.data.modifiedCount > 0) {
        toast.success(
          `${user.name || user.email}'s role updated to ${newRole}.`
        );
        refetch();
      }
    } catch (error) {
      toast.error("Could not update user role.");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-primary mb-8 flex items-center gap-2">
        <FaUserTie /> Manage Users & Decorators ({users.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="stats shadow bg-blue-100 text-blue-800">
          <div className="stat">
            <div className="stat-title text-blue-600 font-bold">
              Total Users
            </div>
            <div className="stat-value text-2xl">{users.length}</div>
          </div>
        </div>
        <div className="stats shadow bg-green-100 text-green-800">
          <div className="stat">
            <div className="stat-title text-green-600 font-bold">
              Decorators
            </div>
            <div className="stat-value text-2xl">
              {users.filter((u) => u.role === "decorator").length}
            </div>
          </div>
        </div>
        <div className="stats shadow bg-red-100 text-red-800">
          <div className="stat">
            <div className="stat-title text-red-600 font-bold">Admins</div>
            <div className="stat-value text-2xl">
              {users.filter((u) => u.role === "admin").length}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>User Info</th>
              <th>Current Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="font-bold">{user.name || "N/A"}</div>
                  <div className="text-sm opacity-50">{user.email}</div>
                </td>
                <td>
                  <span
                    className={`badge badge-md capitalize ${
                      user.role === "admin"
                        ? "badge-error"
                        : user.role === "decorator"
                        ? "badge-success"
                        : "badge-neutral"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </td>
                <td className="flex gap-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleUpdateRole(user, "admin")}
                      className="btn btn-error btn-xs text-white"
                    >
                      <FaUserShield /> Make Admin
                    </button>
                  )}
                  {user.role !== "decorator" && (
                    <button
                      onClick={() => handleUpdateRole(user, "decorator")}
                      className="btn btn-success btn-xs text-white"
                    >
                      <FaUserPlus /> Make Decorator
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageDecorators;
