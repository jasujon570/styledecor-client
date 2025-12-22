import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main.jsx";
import DashboardLayout from "../Layout/DashboardLayout.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import AdminRoute from "./AdminRoute.jsx";
import DecoratorRoute from "./DecoratorRoute.jsx";
import Home from "../Pages/Home/Home.jsx";
import Services from "../Pages/Services/Services.jsx";
import ServiceDetails from "../Pages/Services/ServiceDetails.jsx";
import About from "../Pages/About/About.jsx";
import Contact from "../Pages/Contact/Contact.jsx";
import Login from "../Pages/Login/Login.jsx";
import Register from "../Pages/Register/Register.jsx";
import ErrorPage from "../Pages/ErrorPage/ErrorPage.jsx";
import PaymentPage from "../Pages/Payment/PaymentPage.jsx";
import Profile from "../Pages/Dashboard/Profile.jsx";
import MyBookings from "../Pages/Dashboard/MyBookings.jsx";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory.jsx";
import ManageBookings from "../Pages/Dashboard/admin/ManageBookings.jsx";
import ManageServices from "../Pages/Dashboard/admin/ManageServices.jsx";
import ManageDecorators from "../Pages/Dashboard/admin/ManageDecorators.jsx";
import RevenueMonitoring from "../Pages/Dashboard/admin/RevenueMonitoring.jsx";
import AssignedProjects from "../Pages/Dashboard/decorator/AssignedProjects.jsx";
import UpdateStatus from "../Pages/Dashboard/decorator/UpdateStatus.jsx";
import EarningsSummary from "../Pages/Dashboard/decorator/EarningsSummary.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "service/:id", element: <ServiceDetails /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "payment",
        element: (
          <ProtectedRoutes>
            <PaymentPage />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoutes>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    children: [
      { path: "profile", element: <Profile /> },
      { path: "my-bookings", element: <MyBookings /> },
      { path: "payment-history", element: <PaymentHistory /> },

      {
        path: "admin",
        children: [
          {
            path: "manage-bookings",
            element: (
              <AdminRoute>
                <ManageBookings />
              </AdminRoute>
            ),
          },
          {
            path: "manage-services",
            element: (
              <AdminRoute>
                <ManageServices />
              </AdminRoute>
            ),
          },
          {
            path: "manage-decorators",
            element: (
              <AdminRoute>
                <ManageDecorators />
              </AdminRoute>
            ),
          },
          {
            path: "revenue-monitoring",
            element: (
              <AdminRoute>
                <RevenueMonitoring />
              </AdminRoute>
            ),
          },
        ],
      },

      {
        path: "decorator",
        children: [
          {
            path: "assigned-projects",
            element: (
              <DecoratorRoute>
                <AssignedProjects />
              </DecoratorRoute>
            ),
          },
          {
            path: "update-status",
            element: (
              <DecoratorRoute>
                <UpdateStatus />
              </DecoratorRoute>
            ),
          },
          {
            path: "earnings-summary",
            element: (
              <DecoratorRoute>
                <EarningsSummary />
              </DecoratorRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
