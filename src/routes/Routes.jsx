import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";

import DashboardHome from "../pages/Dashboard/DashboardHome";
import MyBookings from "../pages/Dashboard/MyBookings";
import ManageServices from "../pages/Dashboard/ManageServices";
import ManageUsers from "../pages/Dashboard/ManageUsers";

const AssignedTasks = () => (
  <div className="p-6 bg-base-100 rounded-xl shadow-lg text-xl">
    Decorator Assigned Tasks Page
  </div>
);
const AdminHome = () => <DashboardHome />;

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/service/:id",
        element: <ServiceDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/contact",
        element: <div className="text-center py-20">Contact Page</div>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "home",
        element: <DashboardHome />,
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
      },

      {
        path: "assigned-tasks",
        element: <AssignedTasks />,
      },

      {
        path: "admin-home",
        element: <AdminHome />,
      },
      {
        path: "manage-services",
        element: <ManageServices />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
    ],
  },
]);

export default router;
