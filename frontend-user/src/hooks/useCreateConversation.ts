import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";

import { createConversation } from "@/api/conversation";
import { setCookie } from "react-use-cookie";

export const useCreateConversation = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ["conversation"],
    mutationFn: createConversation,
    onSuccess: (data) => {
      setCookie("ucnian_guidebot_token", data.data.token, {
        days:30,
        Secure: true
      })

      toast({ title: "Conversation Created." })

      queryClient.invalidateQueries({
        queryKey: ["conversation"],
      })
    },
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: "Oops! Error in sending request. Please try again.",
        description: error.response.data.message || error.message,
      });
    }
  })

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    isPending: mutation.status === "pending",
    error: mutation.error
  }
};

export default useCreateConversation;
