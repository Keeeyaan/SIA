import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { deleteIntentByTag } from "@/api/intents";

export const useDeleteIntentByTag = () => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["intents"],
    mutationFn: deleteIntentByTag,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["intents"],
      });
      toast({
        title: "Intent deleted!",
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
