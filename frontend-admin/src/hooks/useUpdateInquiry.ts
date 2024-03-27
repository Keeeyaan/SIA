import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { updateInquiry } from "@/api/inquiries";

export const useUpdateInquiry = () => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["inquiries"],
    mutationFn: updateInquiry,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["inquiries"],
      });
      toast({
        title: "Inquiry updated!",
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
