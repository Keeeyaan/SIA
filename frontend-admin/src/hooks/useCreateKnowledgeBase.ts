import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { createKnowledgeBase } from "@/api/kbs";

export const useCreateKnowledgeBase = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["model"],
    mutationFn: createKnowledgeBase,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["kbs"],
      });
      toast({
        title: "Knowledge Base Created!",
        description: "Knowledge Base successfully created!",
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

export default useCreateKnowledgeBase;
