import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import useDecorator from "../../hooks/useDecorator";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isDecorator, isDecoratorLoading] = useDecorator();

  if (isAdminLoading || isDecoratorLoading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  let roleText = "User";
  if (isAdmin) roleText = "Administrator";
  if (isDecorator) roleText = "Decorator";

  return (
    <div className="p-6 bg-base-100 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-neutral mb-2">
        Welcome Back, {user?.displayName || "User"}!
      </h1>
      <p className="text-xl text-secondary">Your Current Role: {roleText}</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-primary text-primary-content shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Bookings</h2>
            <p className="text-3xl font-bold">12</p>
          </div>
        </div>
        <div className="card bg-secondary text-secondary-content shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Pending Payments</h2>
            <p className="text-3xl font-bold">5</p>
          </div>
        </div>
        {isAdmin && (
          <div className="card bg-accent text-accent-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Total Users</h2>
              <p className="text-3xl font-bold">45</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
