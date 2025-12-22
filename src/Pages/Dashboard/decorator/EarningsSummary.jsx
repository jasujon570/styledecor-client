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
        `/bookings/assigned-projects/${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;


  const totalEarnings = projects
    .filter((p) => p.paymentStatus === "paid")
    .reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);

  const pendingPayments = projects
    .filter((p) => p.paymentStatus !== "paid")
    .reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);

  return (
    <section className="p-8">
      <h2 className="text-3xl font-bold text-secondary mb-8 flex items-center gap-2">
        <FaWallet /> Earnings Summary
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="stat bg-green-50 border-green-500 border-l-4 shadow">
          <div className="stat-title">Total Earnings (Received)</div>
          <div className="stat-value text-green-600 font-bold">
            {totalEarnings} BDT
          </div>
        </div>
        <div className="stat bg-orange-50 border-orange-500 border-l-4 shadow">
          <div className="stat-title">Pending Amount</div>
          <div className="stat-value text-orange-600 font-bold">
            {pendingPayments} BDT
          </div>
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table w-full">
          <thead className="bg-secondary text-white">
            <tr>
              <th>#</th>
              <th>Service</th>
              <th>Amount</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, idx) => (
              <tr key={p._id}>
                <td>{idx + 1}</td>
                <td className="font-bold">{p.serviceName}</td>
                <td>{p.price} BDT</td>
                <td>
                  <span
                    className={`badge ${
                      p.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {p.paymentStatus || "unpaid"}
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
