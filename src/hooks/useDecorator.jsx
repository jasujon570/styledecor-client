
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useDecorator = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: isDecorator, isPending: isDecoratorLoading } = useQuery({
    queryKey: [user?.email, "isDecorator"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      if (!user?.email) return false;
      const res = await axiosSecure.get(`/users/decorator/${user.email}`);
      return res.data?.decorator;
    },
  });

  return [isDecorator, isDecoratorLoading];
};

export default useDecorator;
