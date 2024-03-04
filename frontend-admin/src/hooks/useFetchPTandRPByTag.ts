import { useQuery } from "@tanstack/react-query";

import { getPatternsAndResponsesByTag } from "@/api/intents";

const useFetchPTandRPByTag = (tag: string) => {
  return useQuery({
    queryKey: ["pt&rp", tag],
    queryFn: () => getPatternsAndResponsesByTag(tag),
    enabled: !!tag,
  });
};

export default useFetchPTandRPByTag;
