import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <div className="text-center mt-20 text-4xl font-bold">
            Welcome to StyleDecor Home
          </div>
        ),
      },
      {
        path: "services",
        element: <div>Services Page</div>,
      },
      {
        path: "about",
        element: <div>About Us</div>,
      },
      {
        path: "contact",
        element: <div>Contact Page</div>,
      },
    ],
  },
]);
