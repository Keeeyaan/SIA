import { useQuery } from "@tanstack/react-query";

import { getAllFeedbacks } from "@/api/feedback";

const useFetchFeedbacks = () => {
  return useQuery({
    queryKey: ["feedbacks"],
    queryFn: getAllFeedbacks,
    select: (data) => {
      const positiveCount = data.filter(
        (feedback) => feedback.sentiment === "Positive"
      ).length;
      const negativeCount = data.filter(
        (feedback) => feedback.sentiment === "Negative"
      ).length;
      const neutralCount = data.filter(
        (feedback) => feedback.sentiment === "Neutral"
      ).length;
      const totalCount = positiveCount + negativeCount + neutralCount;
      const neutralPercentage = (neutralCount / totalCount) * 100;
      const positivePercentage = (positiveCount / totalCount) * 100;
      const negativePercentage = (negativeCount / totalCount) * 100;

      const sentiment = {
        percentage: {
          neutral: neutralPercentage,
          positive: positivePercentage,
          negative: negativePercentage,
        },
        feedback: [
          { name: "Neutral", value: neutralCount },
          { name: "Positive", value: positiveCount },
          { name: "Negative", value: negativeCount },
        ],
      };
      const newData = { data, sentiment };
      return newData;
    },
  });
};

export default useFetchFeedbacks;
