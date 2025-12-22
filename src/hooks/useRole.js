import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role = { userRole: "guest" },
    isLoading: isRoleLoading,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email,

    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/users/role/${user.email}`);
        return res.data;
      }
      return { userRole: "guest" };
    },
  });

  return [role.userRole, isRoleLoading, refetch];
};

export default useRole;
