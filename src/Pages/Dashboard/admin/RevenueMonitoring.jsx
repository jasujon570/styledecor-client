import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { FaChartBar, FaWallet } from "react-icons/fa";

const RevenueMonitoring = () => {
  const axiosSecure = useAxiosSecure();

  const { data: allBookings = [], isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const chartData = allBookings.reduce((acc, booking) => {
    const existing = acc.find((item) => item.name === booking.serviceName);
    if (existing) {
      existing.bookings += 1;
    } else {
      acc.push({ name: booking.serviceName, bookings: 1 });
    }
    return acc;
  }, []);

  const totalRevenue = allBookings
    .filter((b) => b.paymentStatus === "paid")
    .reduce((sum, b) => sum + (parseFloat(b.price) || 0), 0);

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <section className="p-4 md:p-8 min-h-screen">
      <h2 className="text-3xl font-bold text-secondary mb-8 flex items-center gap-2">
        <FaChartBar /> Revenue & Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="stat bg-white shadow-xl rounded-2xl border-l-8 border-primary">
          <div className="stat-figure text-primary text-3xl">
            <FaWallet />
          </div>
          <div className="stat-title font-bold text-gray-500">
            Total Revenue (Paid)
          </div>
          <div className="stat-value text-primary text-2xl">
            {totalRevenue.toLocaleString()} BDT
          </div>
        </div>

        <div className="stat bg-white shadow-xl rounded-2xl border-l-8 border-secondary">
          <div className="stat-figure text-secondary text-3xl">
            <FaChartBar />
          </div>
          <div className="stat-title font-bold text-gray-500">
            Total Bookings
          </div>
          <div className="stat-value text-secondary text-2xl">
            {allBookings.length}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-xl border">
        <h3 className="text-xl font-bold mb-6 text-center text-gray-600 italic">
          Service Demand Chart (Number of services booked)
        </h3>
        <div className="h-100 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} />
              <YAxis />
              <Tooltip cursor={{ fill: "#f3f4f6" }} />
              <Legend />
              <Bar
                dataKey="bookings"
                name="Number of Bookings"
                radius={[10, 10, 0, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default RevenueMonitoring;
