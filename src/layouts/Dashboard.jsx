import { NavLink, Outlet } from "react-router-dom";
import {
  FaAd,
  FaCalendar,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
  FaBook,
  FaTools,
} from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();

  
  const [isDecorator, setIsDecorator] = useState(false);
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/users/role/${user.email}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then((res) => setIsDecorator(res.data.role === "decorator"));
    }
  }, [user]);

  return (
    <div className="flex">
      
      <div className="w-64 min-h-screen bg-primary text-white p-5">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li className="font-bold text-xl mb-4">Admin Panel</li>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addService">
                  <FaUtensils /> Add Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageServices">
                  <FaList /> Manage Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageBookings">
                  <FaBook /> Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allUsers">
                  <FaUsers /> Manage Users
                </NavLink>
              </li>
            </>
          ) : isDecorator ? (
            <>
              <li className="font-bold text-xl mb-4">Decorator Panel</li>
              <li>
                <NavLink to="/dashboard/assignedProjects">
                  <FaTools /> My Projects
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/schedule">
                  <FaCalendar /> Today's Schedule
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="font-bold text-xl mb-4">User Panel</li>
              <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myBookings">
                  <FaCalendar /> My Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaList /> Payment History
                </NavLink>
              </li>
            </>
          )}
          
          <div className="divider bg-white h-px my-4"></div>
          <li>
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/services">
              <FaSearch /> Services
            </NavLink>
          </li>
        </ul>
      </div>
     
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
