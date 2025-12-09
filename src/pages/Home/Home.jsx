import useServices from "../../hooks/useServices";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  const [services, loading] = useServices();

  const topServices = services.slice(0, 6);

  return (
    <div className="py-10">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-primary">
          Your Space, Redefined
        </h1>
        <p className="text-xl mt-4 max-w-2xl mx-auto text-gray-600">
          We offer professional decoration services for homes and ceremonies
          with tailored packages to meet your needs.
        </p>
        <Link to="/services" className="btn btn-secondary mt-6">
          Book Decoration Service <FaArrowRight />
        </Link>
      </header>

      <section className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-neutral">
          Featured Decoration Packages
        </h2>

        {loading ? (
          <div className="text-center">
            <span className="loading loading-dots loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topServices.map((service) => (
              <div
                key={service._id}
                className="card w-full bg-base-100 shadow-xl image-full transform transition duration-500 hover:scale-[1.02]"
              >
                <figure>
                  <img
                    src={service.packageImage}
                    alt={service.service_name}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body justify-end">
                  <h2 className="card-title text-white text-3xl">
                    {service.service_name}
                  </h2>
                  <p className="text-gray-200">
                    Category: {service.service_category}
                  </p>
                  <p className="text-lg font-semibold text-accent">
                    Cost: {service.cost} BDT {service.unit}
                  </p>
                  <div className="card-actions justify-start mt-4">
                    <Link
                      to={`/service/${service._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="my-20">
        <h2 className="text-4xl font-bold text-center mb-8 text-neutral">
          Our Service Coverage Map
        </h2>

        <div className="bg-gray-200 h-64 flex items-center justify-center rounded-lg">
          <p className="text-neutral">
            Map Component Placeholder (React Leaflet)
          </p>
        </div>
      </section>

      <section className="my-20">
        <h2 className="text-4xl font-bold text-center mb-8 text-neutral">
          Meet Our Top Decorators
        </h2>
        <div className="bg-base-100 p-8 flex items-center justify-center rounded-lg shadow-xl">
          <p className="text-neutral">Top Decorators Section Placeholder</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
