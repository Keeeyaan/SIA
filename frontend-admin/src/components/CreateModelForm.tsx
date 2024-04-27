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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IGetKnowledgeBaseResponse } from "@/api/kbs";
import useCreateModel from "@/hooks/useCreateModel";

const PatternValidationSchema = z.object({
  kbs_version: z.string().min(1, "Version is   required").max(128).trim(),
});

const CreateModelForm = ({
  kbs,
  isLoading,
  setDialogOpen,
  setCreateIsPending,
}: {
  kbs?: IGetKnowledgeBaseResponse[];
  isLoading: boolean;
  setDialogOpen: Dispatch<React.SetStateAction<boolean>>;
  setCreateIsPending: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof PatternValidationSchema>>({
    resolver: zodResolver(PatternValidationSchema),
    defaultValues: {},
  });

  const {
    mutate: createModel,
    isPending,
    isSuccess,
    isError,
  } = useCreateModel();

  function onSubmit(values: z.infer<typeof PatternValidationSchema>) {
    createModel(values);
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
          name="kbs_version"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Knowledge Base Version</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a knowledge base version" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isLoading ? (
                      <p>Loading...</p>
                    ) : (
                      kbs?.map((data) => (
                        <SelectItem key={data._id} value={data.version}>
                          {data.version}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
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

export default CreateModelForm;
