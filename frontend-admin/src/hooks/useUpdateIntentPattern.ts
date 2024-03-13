import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { updateIntentPattern } from "@/api/intents";

export const useUpdateIntentPattern = () => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["pattern"],
    mutationFn: updateIntentPattern,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["pt&rp"],
      });
      toast({
        title: "Pattern updated!",
        description: data.detail,
      });
    },
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: "Opps.. Error on update. Try again!",
        description: error.response.data.detail || error.message,
      });
    },
  });
};
