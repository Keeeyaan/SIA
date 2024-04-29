import { Dispatch, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import useCreateKnowledgeBase from "@/hooks/useCreateKnowledgeBase";

const KnowledgeBaseValidationSchema = z.object({
  version: z.string().min(1, "Version is required!").max(128).trim(),
});

const CreateKnowledgeBaseForm = ({
  setDialogOpen,
  setCreateIsPending,
}: {
  setDialogOpen: Dispatch<React.SetStateAction<boolean>>;
  setCreateIsPending: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof KnowledgeBaseValidationSchema>>({
    resolver: zodResolver(KnowledgeBaseValidationSchema),
    defaultValues: {},
  });

  const {
    mutate: createKnowledgeBase,
    isPending,
    isSuccess,
    isError,
  } = useCreateKnowledgeBase();

  function onSubmit(values: z.infer<typeof KnowledgeBaseValidationSchema>) {
    createKnowledgeBase(values);
  }

  useEffect(() => {
    if (isSuccess || isError) {
      setDialogOpen(false);
    }
    setCreateIsPending(isPending);
  }, [isPending, setCreateIsPending, isSuccess, setDialogOpen, isError]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="version"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Version</FormLabel>
              <FormControl>
                <Input placeholder="1.0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {isPending ? <Loader2 className=" animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateKnowledgeBaseForm;
