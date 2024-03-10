import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";

import { createInquiry } from "@/api/inquiries";

export const useCreateInquiry = () => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["inquiry"],
    mutationFn: createInquiry,
    onSuccess: (data) => {
      //   toast({
      //     title: "Inquiry Created!",
      //     description: data.detail,
      //   });
      console.log(data);
    },
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: "Opps.. Error on sending inquiry. Try again!",
        description: error.response.data.message || error.message,
      });
    },
  });
};

export default useCreateInquiry;
