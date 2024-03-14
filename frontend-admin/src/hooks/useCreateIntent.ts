import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";

import { createIntent } from "@/api/intents";

export const useCreateIntent = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["intents"],
    mutationFn: createIntent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["intents"],
      });
      toast({
        title: "Intent Created!",
        description: data.detail,
      });
    },
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: "Opps.. Error on create. Try again!",
        description: error.response.data.message || error.message,
      });
    },
  });
};

export default useCreateIntent;
