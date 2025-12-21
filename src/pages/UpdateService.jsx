import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateService = () => {
  const service = useLoaderData();
  const {
    _id,
    service_name,
    service_image,
    service_category,
    cost,
    unit,
    service_area,
    description,
  } = service;
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      service_name: form.service_name.value,
      service_image: form.service_image.value,
      service_category: form.service_category.value,
      cost: parseFloat(form.cost.value),
      unit: form.unit.value,
      service_area: form.service_area.value,
      description: form.description.value,
    };

    axios
      .put(`http://localhost:5000/services/${_id}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Service Updated Successfully!");
          navigate("/manage-services");
        }
      })
      .catch((error) => toast.error("Update failed!"));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white p-12 rounded-3xl shadow-2xl border border-gray-200">
        <h2 className="text-4xl font-bold text-secondary text-center mb-12">
          Update Service
        </h2>

        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="form-control">
            <label className="label font-semibold text-lg">Service Name</label>
            <input
              type="text"
              name="service_name"
              defaultValue={service_name}
              className="input input-bordered w-full text-lg focus:border-primary focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-lg">
              Service Image URL
            </label>
            <input
              type="text"
              name="service_image"
              defaultValue={service_image}
              className="input input-bordered w-full text-lg focus:border-primary focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-lg">Category</label>
            <select
              name="service_category"
              defaultValue={service_category}
              className="select select-bordered w-full text-lg focus:border-primary focus:ring-2 focus:ring-primary"
              required
            >
              <option value="home">Home Decor</option>
              <option value="wedding">Wedding</option>
              <option value="office">Office</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label font-semibold text-lg">Cost</label>
            <input
              type="number"
              name="cost"
              defaultValue={cost}
              className="input input-bordered w-full text-lg focus:border-primary focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-lg">Unit</label>
            <input
              type="text"
              name="unit"
              defaultValue={unit}
              className="input input-bordered w-full text-lg focus:border-primary focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-lg">Service Area</label>
            <input
              type="text"
              name="service_area"
              defaultValue={service_area}
              className="input input-bordered w-full text-lg focus:border-primary focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="form-control md:col-span-2">
            <label className="label font-semibold text-lg">Description</label>
            <textarea
              name="description"
              defaultValue={description}
              className="textarea textarea-bordered h-36 w-full text-lg focus:border-primary focus:ring-2 focus:ring-primary"
              required
            ></textarea>
          </div>

          <button className="btn btn-primary w-full md:col-span-2 rounded-full text-white text-lg font-semibold hover:scale-105 transition-transform shadow-lg">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateService;
