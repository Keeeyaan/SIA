import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { deleteIntentResponse } from "@/api/intents";

export const useDeleteIntentResponse = () => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["response"],
    mutationFn: deleteIntentResponse,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["pt&rp"],
      });
      toast({
        title: "Response deleted!",
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
