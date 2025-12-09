
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useServiceDetails = (id) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: service = {},
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["serviceDetails", id],
    queryFn: async () => {
      if (!id) return {};
      const res = await axiosPublic.get(`/services/${id}`);
      return res.data;
    },
  });

  return [service, loading, refetch];
};

export default useServiceDetails;
