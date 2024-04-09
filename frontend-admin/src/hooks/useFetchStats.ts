import { getStats } from "@/api/stat";

import { useQuery } from "@tanstack/react-query";

const useFetchStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
  });
};

export default useFetchStats;
