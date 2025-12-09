import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";

const Dashboard = () => <div>Dashboard Home</div>;
const MyBookings = () => <div>My Bookings</div>;
const AdminHome = () => <div>Admin Home</div>;
const ManageServices = () => <div>Manage Services</div>;
const ManageUsers = () => <div>Manage Users/Decorators</div>;

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
        element: <Dashboard />,
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
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
