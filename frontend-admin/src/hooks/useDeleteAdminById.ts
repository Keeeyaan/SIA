import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { deleteAdminById } from "@/api/accounts";

export const useDeleteAdminById = () => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["accounts"],
    mutationFn: deleteAdminById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
      toast({
        title: "Admin deleted!",
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
