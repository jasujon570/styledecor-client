import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Navbar />
      <div className="min-h-[calc(100vh-250px)]">
        <Outlet />
      </div>
      <div className="p-10 bg-secondary text-white text-center mt-10">
        Footer
      </div>
    </div>
  );
};

export default MainLayout;
