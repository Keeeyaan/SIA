import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { deleteIntentPattern } from "@/api/intents";

export const useDeleteIntentPattern = () => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["pattern"],
    mutationFn: deleteIntentPattern,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["pt&rp"],
      });
      toast({
        title: "Pattern deleted!",
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
