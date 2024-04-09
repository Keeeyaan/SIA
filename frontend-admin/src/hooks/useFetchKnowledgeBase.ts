import { useQuery } from "@tanstack/react-query";

import { getAllKnowledgeBase } from "@/api/kbs";

const useFetchKnowledgeBase = () => {
  return useQuery({
    queryKey: ["kbs"],
    queryFn: getAllKnowledgeBase,
  });
};

export default useFetchKnowledgeBase;
