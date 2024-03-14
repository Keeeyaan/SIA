import { Dispatch } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useAddIntentResponse from "@/hooks/useAddIntentResponse";

const PatternValidationSchema = z.object({
  response: z.string().min(1, "Pattern is required").max(256).trim(),
  tag: z.string().min(1, "Tag is required").max(128).trim(),
});

const AddResponseForm = ({
  tag,
  setDialogOpen,
}: {
  tag: string;
  setDialogOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof PatternValidationSchema>>({
    resolver: zodResolver(PatternValidationSchema),
    defaultValues: {
      response: "",
      tag: tag,
    },
  });
  const { mutate: addResponse, isPending } = useAddIntentResponse();

  function onSubmit(values: z.infer<typeof PatternValidationSchema>) {
    addResponse({ tag: values.tag, data: { response: values.response } });
    setDialogOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag</FormLabel>
              <FormControl>
                <Input placeholder="Tag" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="response"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Response</FormLabel>
              <FormControl>
                <Input placeholder="Response" {...field} />
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

export default AddResponseForm;
