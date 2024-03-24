import { useQuery } from "@tanstack/react-query";

import { getAllAdmins } from "@/api/accounts";

const useFetchAdmins = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: getAllAdmins,
  });
};

export default useFetchAdmins;
