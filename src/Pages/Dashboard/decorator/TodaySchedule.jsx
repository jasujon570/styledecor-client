import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import { FaClock, FaCalendarDay } from "react-icons/fa";

const TodaySchedule = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: schedule = [], isLoading } = useQuery({
    queryKey: ["today-schedule", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings/decorator/today?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8 text-secondary flex items-center gap-3">
        <FaCalendarDay /> Today's Work Schedule
      </h2>

      {schedule.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedule.map((item) => (
            <div
              key={item._id}
              className="card bg-base-100 shadow-xl border-t-4 border-accent"
            >
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h3 className="card-title text-lg">{item.serviceName}</h3>
                  <div className="badge badge-accent text-white">Today</div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  <FaClock className="inline mr-2" />
                  Time: {item.preferredTime || "Check Details"}
                </p>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs font-bold text-gray-500">
                    Client Location:
                  </p>
                  <p className="text-sm">{item.location || "N/A"}</p>
                </div>
                <div className="card-actions justify-end mt-4">
                  <div className="badge badge-outline">{item.status}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-xl text-gray-400 font-medium">
            No projects scheduled for today!
          </p>
        </div>
      )}
    </div>
  );
};

export default TodaySchedule;
