import { Link, useRouteError } from "react-router-dom";
import Footer from "../../Shared/Footer";
import Navbar from "../../Shared/Navbar";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex grow items-center justify-center bg-base-200">
        <div className="text-center p-8 max-w-lg mx-auto">
          <h1 className="text-9xl font-extrabold text-primary mb-4">404</h1>
          <p className="text-2xl font-semibold mb-3">Oops! Page Not Found</p>
          <p className="text-gray-500 mb-6">
            The page you are looking for might have been removed or is
            temporarily unavailable.
          </p>
          <p className="text-red-500 font-mono mb-6">
            {error.statusText || error.message}
          </p>
          <Link to="/" className="btn btn-primary btn-lg">
            Go to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;
