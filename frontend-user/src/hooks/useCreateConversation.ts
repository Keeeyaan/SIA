import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";

import { createConversation } from "@/api/conversation";
import { setCookie } from "react-use-cookie";
import { useStore } from "@/store";

export const useCreateConversation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { setInquiry } = useStore();

  const mutation = useMutation({
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

      setInquiry("");
    },
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: "Oops! Error in sending request. Please try again.",
        description: error.response.data.detail || error.message,
      });
    },
  });

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    isPending: mutation.status === "pending",
    error: mutation.error,
  };
};

export default useCreateConversation;
