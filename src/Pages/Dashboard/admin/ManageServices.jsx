import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import { FaEdit, FaTrash, FaPlusCircle, FaTools } from "react-icons/fa";
import toast from "react-hot-toast";

const ManageServices = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: services = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allServicesAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services");
      return res.data;
    },
  });

  const handleDeleteService = async (service) => {
    if (
      !window.confirm(
        `Are you sure you want to delete the service: ${service.service_name}?`
      )
    ) {
      return;
    }

    try {
      const res = await axiosSecure.delete(`/services/${service._id}`);

      if (res.data.deletedCount > 0) {
        toast.success(`${service.service_name} deleted successfully.`);
        refetch();
      } else {
        toast.error("Failed to delete service.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Could not delete service.");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-error mb-8 flex items-center gap-2">
        <FaTools /> Manage Decoration Services ({services.length})
      </h2>

      <div className="flex justify-end mb-4">
        <button className="btn btn-primary">
          <FaPlusCircle /> Add New Service (Modal/Form Placeholder)
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={service.image} alt={service.service_name} />
                    </div>
                  </div>
                </td>
                <td className="font-semibold">{service.service_name}</td>
                <td>{service.service_category.toUpperCase()}</td>
                <td>
                  {service.cost.toLocaleString()} BDT / {service.unit}
                </td>
                <td>
                  <button className="btn btn-info btn-xs text-white mr-2">
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteService(service)}
                    className="btn btn-error btn-xs text-white"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {services.length === 0 && (
        <p className="text-center mt-12 text-xl text-gray-500">
          No services available to manage.
        </p>
      )}
    </section>
  );
};

export default ManageServices;
