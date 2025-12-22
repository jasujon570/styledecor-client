import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: payments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payment/history");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2 text-error">
          Payment History
        </h1>
        <p className="opacity-80">
          {error?.response?.data?.message || error?.message}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Payment History</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Transaction</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, idx) => (
              <tr key={p._id}>
                <th>{idx + 1}</th>
                <td className="font-mono text-xs">{p.transactionId}</td>
                <td>{Number(p.price).toLocaleString()}</td>
                <td className="capitalize">{p.paymentMethod || "card"}</td>
                <td>
                  {p.paymentDate
                    ? new Date(p.paymentDate).toLocaleString()
                    : p.createdAt
                    ? new Date(p.createdAt).toLocaleString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {payments.length === 0 && (
        <p className="text-center mt-12 text-xl text-gray-500">
          No payment transactions yet.
        </p>
      )}
    </div>
  );
};

export default PaymentHistory;
