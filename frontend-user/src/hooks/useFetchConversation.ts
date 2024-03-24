import { useQuery } from "@tanstack/react-query";

import { getConversation } from "@/api/conversation";
import { getCookie } from "react-use-cookie";

const useFetchConversation = () => {
  return useQuery({
    queryKey: ["conversation"],
    queryFn: () => {
      const token = getCookie("ucnian_guidebot_token")
      return getConversation(token)
    },
  });
};

export default useFetchConversation;
