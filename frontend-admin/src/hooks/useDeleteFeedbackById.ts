import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { deleteFeedbackById } from "@/api/feedback";

export const useDeleteFeedbackById = () => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["feedbacks"],
    mutationFn: deleteFeedbackById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["feedbacks"],
      });
      toast({
        title: "Feedback deleted!",
        description: data.detail,
      });
    },
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: "Opps.. Error on delete. Try again!",
        description: error.response.data.detail || error.message,
      });
    },
  });
};
