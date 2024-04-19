import { useQuery } from "@tanstack/react-query";

import { getIntents } from "@/api/intents";
import { getCookie } from "react-use-cookie";

const useFetchIntents = () => {
  return useQuery({
    queryKey: ["intents"],
    queryFn: async () => {
      const token = getCookie("ucnian_guidebot_token");
      return getIntents(token);
    },
  });
};

export default useFetchIntents;
