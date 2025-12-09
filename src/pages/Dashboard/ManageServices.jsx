import useServices from "../../hooks/useServices";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const ManageServices = () => {
  const [services, loading, refetch] = useServices();
  const axiosSecure = useAxiosSecure();

  // ডিলিট হ্যান্ডলার
  const handleDelete = (service) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${service.service_name}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/services/${service._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "The service has been deleted.", "success");
            }
          })
          .catch((error) => {
            Swal.fire("Error", "Failed to delete service.", "error");
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-neutral">
          Manage All Services ({services.length})
        </h1>
        <button className="btn btn-primary">
          <FaPlus className="mr-2" /> Add New Service
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Image</th>
              <th>Service Name</th>
              <th>Category</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={service._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={service.packageImage}
                        alt={service.service_name}
                      />
                    </div>
                  </div>
                </td>
                <td>{service.service_name}</td>
                <td>{service.service_category}</td>
                <td>{service.cost} BDT</td>
                <td>
                  <div className="space-x-2">
                    <button className="btn btn-sm btn-info text-white">
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(service)}
                      className="btn btn-sm btn-error text-white"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageServices;
