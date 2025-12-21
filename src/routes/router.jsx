import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AllServices from "../pages/AllServices";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ServiceDetails from "../pages/ServiceDetails";
import PrivateRoute from "./PrivateRoute";
import MyBookings from "../pages/MyBookings";

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
        path: "service/:id",
        element: (
          <PrivateRoute>
            <ServiceDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/service/${params.id}`),
      },
      {
        path: "bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
