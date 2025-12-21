import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddService = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddService = (e) => {
    e.preventDefault();
    const form = e.target;

    const serviceData = {
      service_name: form.service_name.value,
      service_image: form.service_image.value,
      service_category: form.service_category.value,
      cost: parseFloat(form.cost.value),
      unit: form.unit.value,
      service_area: form.service_area.value,
      description: form.description.value,
      ratings: 5.0,
      user_email: user?.email,
      user_name: user?.displayName,
    };

    axios
      .post("http://localhost:5000/services", serviceData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Service Added Successfully!");
          form.reset();
          navigate("/services");
        }
      })
      .catch((error) => {
        toast.error("Failed to add service!");
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white p-12 rounded-3xl shadow-2xl border border-gray-200">
        <h2 className="text-4xl font-bold text-secondary text-center mb-12">
          Add a New Service
        </h2>

        <form
          onSubmit={handleAddService}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Service Name */}
          <div className="form-control">
            <label className="label font-semibold text-lg">Service Name</label>
            <input
              type="text"
              name="service_name"
              placeholder="e.g. Neon Light Party"
              className="input input-bordered w-full focus:border-primary focus:ring-2 focus:ring-primary text-lg"
              required
            />
          </div>

          {/* Service Image */}
          <div className="form-control">
            <label className="label font-semibold text-lg">
              Service Image URL
            </label>
            <input
              type="text"
              name="service_image"
              placeholder="https://image-link.com"
              className="input input-bordered w-full focus:border-primary focus:ring-2 focus:ring-primary text-lg"
              required
            />
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="label font-semibold text-lg">Category</label>
            <select
              name="service_category"
              className="select select-bordered w-full focus:border-primary focus:ring-2 focus:ring-primary text-lg"
              required
            >
              <option value="home">Home Decor</option>
              <option value="wedding">Wedding</option>
              <option value="office">Office</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          {/* Cost */}
          <div className="form-control">
            <label className="label font-semibold text-lg">Cost</label>
            <input
              type="number"
              name="cost"
              placeholder="15000"
              className="input input-bordered w-full focus:border-primary focus:ring-2 focus:ring-primary text-lg"
              required
            />
          </div>

          {/* Unit */}
          <div className="form-control">
            <label className="label font-semibold text-lg">Unit</label>
            <input
              type="text"
              name="unit"
              placeholder="per event / per sqft"
              className="input input-bordered w-full focus:border-primary focus:ring-2 focus:ring-primary text-lg"
              required
            />
          </div>

          {/* Service Area */}
          <div className="form-control">
            <label className="label font-semibold text-lg">Service Area</label>
            <input
              type="text"
              name="service_area"
              placeholder="e.g. Gulshan, Dhaka"
              className="input input-bordered w-full focus:border-primary focus:ring-2 focus:ring-primary text-lg"
              required
            />
          </div>

          {/* Description */}
          <div className="form-control md:col-span-2">
            <label className="label font-semibold text-lg">Description</label>
            <textarea
              name="description"
              className="textarea textarea-bordered h-36 w-full focus:border-primary focus:ring-2 focus:ring-primary text-lg"
              placeholder="Details about your service..."
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button className="btn btn-primary w-full md:col-span-2 rounded-full text-white text-lg font-semibold hover:scale-105 transition-transform shadow-lg">
            Add Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
