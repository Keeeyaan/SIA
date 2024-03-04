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
import useCreateIntent from "@/hooks/useCreateIntent";

const PatternValidationSchema = z.object({
  tag: z.string().min(1, "Tag is required").max(128).trim(),
});

const CreateIntentForm = ({
  setDialogOpen,
}: {
  setDialogOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof PatternValidationSchema>>({
    resolver: zodResolver(PatternValidationSchema),
    defaultValues: {
      tag: "",
    },
  });
  const { mutate: createIntent, isPending } = useCreateIntent();

  function onSubmit(values: z.infer<typeof PatternValidationSchema>) {
    createIntent(values);
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
        <Button className="w-full" type="submit">
          {isPending ? <Loader2 className=" animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateIntentForm;
