import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUserShield, FaTools, FaTrash } from "react-icons/fa";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data.users;
    },
  });

  const handleMakeRole = (user, newRole) => {
    axiosSecure
      .patch(`/users/role/${user._id}`, { role: newRole })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire("Success!", `${user.name} is now a ${newRole}.`, "success");
        }
      });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete user ${user.name}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "User has been deleted.", "success");
          }
        });
      }
    });
  };

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
        Manage All Users ({users.length})
      </h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "admin"
                        ? "badge-primary"
                        : user.role === "decorator"
                        ? "badge-secondary"
                        : "badge-ghost"
                    } text-white`}
                  >
                    {user.role}
                  </span>
                </td>
                <td>
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-sm btn-ghost"
                    >
                      <FaTools /> Roles
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      {user.role !== "admin" && (
                        <li>
                          <a onClick={() => handleMakeRole(user, "admin")}>
                            Make Admin <FaUserShield />
                          </a>
                        </li>
                      )}
                      {user.role !== "decorator" && (
                        <li>
                          <a onClick={() => handleMakeRole(user, "decorator")}>
                            Make Decorator
                          </a>
                        </li>
                      )}
                      {user.role !== "user" && (
                        <li>
                          <a onClick={() => handleMakeRole(user, "user")}>
                            Make User
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-sm btn-error ml-2 text-white"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
