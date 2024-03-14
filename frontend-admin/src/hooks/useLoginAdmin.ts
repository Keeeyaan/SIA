import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login } from "@/api/auth";
import { useToast } from "@/components/ui/use-toast";

export const useLoginAdmin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast({
        title: "Login Success",
        description: data.message,
      });
      localStorage.setItem("ucnian-token", data.access_token);
      navigate("/", { replace: true });
    },
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: "Opps.. Error on login. Try again!",
        description: error.response.data.detail || error.message,
      });
    },
  });
};
