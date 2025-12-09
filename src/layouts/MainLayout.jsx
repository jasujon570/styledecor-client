import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
