import { useQuery } from "@tanstack/react-query";

import { getAllFeedbacks } from "@/api/feedback";

const useFetchFeedbacks = () => {
  return useQuery({
    queryKey: ["feedbacks"],
    queryFn: getAllFeedbacks,
  });
};

export default useFetchFeedbacks;
