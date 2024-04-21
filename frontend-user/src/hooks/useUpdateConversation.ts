import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";

import { updateConversation } from "@/api/conversation";
import { useStore } from "@/store";

export const useUpdateConversation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { inquiry, setInquiry } = useStore();

  return useMutation({
    mutationKey: ["conversation"],
    mutationFn: updateConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversation"],
      });
      setInquiry("");
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

export default useUpdateConversation;
