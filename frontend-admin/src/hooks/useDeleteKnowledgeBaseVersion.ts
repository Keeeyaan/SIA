import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { deleteKnowledgeBase } from "@/api/kbs";

export const useDeleteKnowledgeBase = () => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["response"],
    mutationFn: deleteKnowledgeBase,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["kbs"],
      });
      toast({
        title: "Version deleted!",
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
