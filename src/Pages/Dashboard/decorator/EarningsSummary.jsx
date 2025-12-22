import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import { FaWallet, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";

const EarningsSummary = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["earnings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings/decorator?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const totalEarnings = projects
    .filter((p) => p.paymentStatus === "paid")
    .reduce((sum, project) => sum + parseFloat(project.price || 0), 0);

  const pendingPayments = projects
    .filter((p) => p.paymentStatus !== "paid")
    .reduce((sum, project) => sum + parseFloat(project.price || 0), 0);

  return (
    <section className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-secondary mb-8 flex items-center gap-2">
        <FaWallet /> Earnings Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="stat bg-green-100 border-l-4 border-green-500 shadow-md rounded-lg">
          <div className="stat-figure text-green-500 text-3xl">
            <FaCheckCircle />
          </div>
          <div className="stat-title text-gray-600">
            Total Earnings (Received)
          </div>
          <div className="stat-value text-green-600">${totalEarnings}</div>
        </div>

        <div className="stat bg-orange-100 border-l-4 border-orange-500 shadow-md rounded-lg">
          <div className="stat-figure text-orange-500 text-3xl">
            <FaHourglassHalf />
          </div>
          <div className="stat-title text-gray-600">Pending Amount</div>
          <div className="stat-value text-orange-600">${pendingPayments}</div>
        </div>
      </div>

      <div className="overflow-x-auto shadow-xl rounded-lg border">
        <table className="table w-full">
          <thead className="bg-secondary text-white text-lg">
            <tr>
              <th>#</th>
              <th>Service Name</th>
              <th>Client Email</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project._id} className="hover:bg-base-200">
                <th>{index + 1}</th>
                <td className="font-semibold">{project.serviceName}</td>
                <td>{project.bookerEmail}</td>
                <td className="font-bold">${project.price}</td>
                <td>
                  <span
                    className={`badge ${
                      project.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    } gap-1`}
                  >
                    {project.paymentStatus || "Unpaid"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default EarningsSummary;
