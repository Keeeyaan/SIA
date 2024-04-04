import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";

import { createFeedback } from "@/api/feedback";

export const useCreateFeedback = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["feedback"],
    mutationFn: createFeedback,
    onSuccess: () => {
      toast({ title: "Feedback Submitted!" });

      queryClient.invalidateQueries({
        queryKey: ["feedback"],
      });
    },
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: "Oops! Error in sending request. Please try again.",
        description: error.response.data.message || error.message,
      });
    },
  });
};

export default useCreateFeedback;
