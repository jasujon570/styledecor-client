import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AllServices from "../pages/AllServices";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "services",
        element: <AllServices />,
      },
      {
        path: "services",
        element: (
          <div className="p-20 text-center text-2xl">
            Services Page (Coming Soon)
          </div>
        ),
      },
      {
        path: "about",
        element: (
          <div className="p-20 text-center text-2xl">
            About Us (Coming Soon)
          </div>
        ),
      },
      {
        path: "contact",
        element: (
          <div className="p-20 text-center text-2xl">
            Contact Page (Coming Soon)
          </div>
        ),
      },
      {
        path: "login",
        element: (
          <div className="p-20 text-center text-2xl font-bold">
            Login Page (Coming Soon)
          </div>
        ),
      },
    ],
  },
]);
