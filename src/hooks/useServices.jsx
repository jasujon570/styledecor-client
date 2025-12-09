import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useServices = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: services = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axiosPublic.get("/services");
      return res.data.services;
    },
  });

  return [services, loading, refetch];
};

export default useServices;
