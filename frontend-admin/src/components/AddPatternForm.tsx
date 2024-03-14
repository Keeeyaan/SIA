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
import useAddIntentPattern from "@/hooks/useAddIntentPattern";

const PatternValidationSchema = z.object({
  pattern: z.string().min(1, "Pattern is required").max(256).trim(),
  tag: z.string().min(1, "Tag is required").max(128).trim(),
});

const AddPatternForm = ({
  tag,
  setDialogOpen,
}: {
  tag: string;
  setDialogOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof PatternValidationSchema>>({
    resolver: zodResolver(PatternValidationSchema),
    defaultValues: {
      pattern: "",
      tag: tag,
    },
  });
  const { mutate: addPattern, isPending } = useAddIntentPattern();

  function onSubmit(values: z.infer<typeof PatternValidationSchema>) {
    addPattern({ tag: values.tag, data: { pattern: values.pattern } });
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
          name="pattern"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pattern</FormLabel>
              <FormControl>
                <Input placeholder="Pattern" {...field} />
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

export default AddPatternForm;
