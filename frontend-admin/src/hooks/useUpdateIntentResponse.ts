import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { updateIntentResponse } from "@/api/intents";

export const useUpdateIntentResponse = () => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["response"],
    mutationFn: updateIntentResponse,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["pt&rp"],
      });
      toast({
        title: "Response updated!",
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
