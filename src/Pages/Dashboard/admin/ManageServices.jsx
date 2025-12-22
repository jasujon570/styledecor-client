import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import { FaEdit, FaTrash, FaPlusCircle, FaTools } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const ManageServices = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: services = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allServicesAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const handleAddService = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newService = {
      service_name: form.service_name.value,
      cost: Number(form.cost.value),
      unit: form.unit.value,
      service_category: form.service_category.value,
      description: form.description.value,
      image: form.image.value,
      createdByEmail: user?.email,
    };

    try {
      const res = await axiosSecure.post("/services", newService);
      if (res.data.insertedId) {
        toast.success("New Service Added!");
        form.reset();
        document.getElementById("add_service_modal").close();
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Check your data and try again."
      );
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await axiosSecure.delete(`/services/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Service deleted.");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete.");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-error flex items-center gap-2">
          <FaTools /> Manage Services ({services.length})
        </h2>
        <button
          className="btn btn-primary"
          onClick={() =>
            document.getElementById("add_service_modal").showModal()
          }
        >
          <FaPlusCircle /> Add Service
        </button>
      </div>

      <dialog id="add_service_modal" className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <form
            onSubmit={handleAddService}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="service_name"
              placeholder="Service Name"
              className="input input-bordered"
              required
            />
            <input
              type="number"
              name="cost"
              placeholder="Cost"
              className="input input-bordered"
              required
            />
            <input
              type="text"
              name="unit"
              placeholder="Unit (e.g. sqft)"
              className="input input-bordered"
              required
            />
            <select
              name="service_category"
              className="select select-bordered"
              required
            >
              <option value="wedding">Wedding</option>
              <option value="office">Office</option>
              <option value="home">Home</option>
            </select>
            <input
              type="url"
              name="image"
              placeholder="Image URL"
              className="input input-bordered md:col-span-2"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              className="textarea textarea-bordered md:col-span-2"
              required
            ></textarea>
            <div className="modal-action md:col-span-2">
              <button type="submit" className="btn btn-success text-white">
                Save
              </button>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  document.getElementById("add_service_modal").close()
                }
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Details</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                <td>
                  <img
                    src={service.image}
                    className="w-12 h-12 rounded object-cover"
                    alt=""
                  />
                </td>
                <td>
                  <div className="font-bold">{service.service_name}</div>
                </td>
                <td>{service.cost} BDT</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleDeleteService(service._id)}
                    className="btn btn-error btn-xs text-white"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageServices;
