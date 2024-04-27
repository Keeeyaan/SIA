import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { createModel } from "@/api/model";

export const useCreateModel = () => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["model"],
    mutationFn: createModel,
    onSuccess: (data) => {
      toast({
        title: "Model Created!",
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

export default useCreateModel;
