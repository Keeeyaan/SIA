import { useQuery } from "@tanstack/react-query";

import { getIntents } from "@/api/intents";

const useFetchIntents = () => {
  return useQuery({
    queryKey: ["intents"],
    queryFn: getIntents,
  });
};

export default useFetchIntents;
