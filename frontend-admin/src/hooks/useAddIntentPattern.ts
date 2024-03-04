import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { addIntentPattern } from "@/api/intents";

export const useAddIntentPattern = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["pattern"],
    mutationFn: addIntentPattern,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["pt&rp"],
      });
      toast({
        title: "Intent Pattern Added!",
        description: data.detail,
      });
    },
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: "Opps.. Error on add. Try again!",
        description: error.response.data.message || error.message,
      });
    },
  });
};

export default useAddIntentPattern;
