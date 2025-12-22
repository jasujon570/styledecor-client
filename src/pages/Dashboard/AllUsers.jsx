import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaTrashAlt, FaUsers, FaTools, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/users", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axios
      .patch(
        `http://localhost:5000/users/admin/${user._id}`,
        { role: "admin" },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleMakeDecorator = (user) => {
    axios
      .patch(
        `http://localhost:5000/users/admin/${user._id}`,
        { role: "decorator" },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is now a Decorator!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between my-4">
        <h2 className="text-3xl font-bold">Manage All Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto rounded-t-2xl">
        <table className="table table-zebra w-full">
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin Role</th>
              <th>Decorator Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-sm bg-orange-500 text-white"
                    >
                      <FaUserShield className="text-xl" />
                    </button>
                  )}
                </td>
                <td>
                  {user.role === "decorator" ? (
                    "Decorator"
                  ) : (
                    <button
                      onClick={() => handleMakeDecorator(user)}
                      className="btn btn-sm bg-blue-500 text-white"
                    >
                      <FaTools className="text-xl" />
                    </button>
                  )}
                </td>
                <td>
                  <button className="btn btn-ghost btn-lg">
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
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

export default AllUsers;
