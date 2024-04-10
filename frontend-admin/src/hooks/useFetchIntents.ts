import { useQuery } from "@tanstack/react-query";

import { getIntents } from "@/api/intents";

const useFetchIntents = (filter?: boolean) => {
  return useQuery({
    queryKey: ["intents"],
    queryFn: getIntents,
    select: (data) => {
      const filteredData = data.filter((intent) => intent.frequency > 0);
      return filter ? filteredData : data;
    },
  });
};

export default useFetchIntents;
