import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setCookie } from "react-use-cookie";

import { useToast } from "@/components/ui/use-toast";
import { createConversation } from "@/api/conversation";

export const useCreateConversation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["conversation"],
    mutationFn: createConversation,
    onSuccess: (data) => {
      setCookie("ucnian_guidebot_token", data.token, {
        days: 30,
        Secure: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["conversation"],
      });
    },
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: "Oops! Error in sending request. Please try again.",
        description: error.response.data.detail || error.message,
      });
    },
  });
};

export default useCreateConversation;
