import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { updateAdminById } from "@/api/accounts";

export const useUpdateAdmin = () => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["accounts"],
    mutationFn: updateAdminById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
      toast({
        title: "Admin updated!",
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
