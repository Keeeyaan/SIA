import { useQuery } from "@tanstack/react-query";

import { getVersions } from "@/api/versions";

const useFetchVersions = () => {
  return useQuery({
    queryKey: ["versions"],
    queryFn: getVersions,
  });
};

export default useFetchVersions;
