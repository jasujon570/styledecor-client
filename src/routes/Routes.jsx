// client/src/routes/Routes.jsx (সম্পূর্ণ আপডেট)

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";

const DashboardHome = () => (
  <div className="text-xl">Welcome to Dashboard!</div>
);
const MyBookings = () => <div className="text-xl">My Bookings List</div>;
const AssignedTasks = () => (
  <div className="text-xl">Decorator Assigned Tasks</div>
);
const AdminHome = () => <div className="text-xl">Admin Overview</div>;
const ManageServices = () => (
  <div className="text-xl">Admin Manage Services</div>
);
const ManageUsers = () => <div className="text-xl">Admin Manage Users</div>;

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
