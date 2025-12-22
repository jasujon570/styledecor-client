import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/history/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">My Payment History</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="table w-full text-center">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Amount (BDT)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, idx) => (
              <tr key={p._id}>
                <th>{idx + 1}</th>
                <td className="font-mono text-xs">{p.transactionId}</td>
                <td className="font-bold text-success">{p.price}</td>
                <td>
                  {new Date(p.paymentDate || p.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {payments.length === 0 && (
        <p className="text-center mt-10">No transactions found.</p>
      )}
    </div>
  );
};
export default PaymentHistory;
