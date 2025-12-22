import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import { FaCalendarDay } from "react-icons/fa";

const TodaySchedule = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["today-schedule", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings/assigned-projects/${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const todayDate = new Date().toISOString().split("T")[0];
  const schedule = projects.filter((p) => p.bookingDate?.startsWith(todayDate));

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8 text-secondary flex items-center gap-3">
        <FaCalendarDay /> Today's Schedule
      </h2>
      {schedule.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schedule.map((item) => (
            <div
              key={item._id}
              className="card bg-base-100 shadow-xl border-t-4 border-accent p-5"
            >
              <h3 className="font-bold text-lg">{item.serviceName}</h3>
              <p className="text-sm">Location: {item.location}</p>
              <div className="badge badge-accent mt-4">
                Status: {item.status}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-100 rounded-xl">
          No work scheduled for today.
        </div>
      )}
    </div>
  );
};

export default TodaySchedule;
