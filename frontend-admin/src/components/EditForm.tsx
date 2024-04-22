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
import { useUpdateIntentPattern } from "@/hooks/useUpdateIntentPattern";
import { useUpdateIntentResponse } from "@/hooks/useUpdateIntentResponse";
import { Textarea } from "./ui/textarea";

const EditUserValidationSchema = z.object({
  data: z.string().min(1, "Input required!"),
});

const EditForm = ({
  type,
  item,
  tag,
  id,
  setIsEditDialogOpen,
}: {
  type: string;
  item: string;
  tag: string;
  id: number;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof EditUserValidationSchema>>({
    resolver: zodResolver(EditUserValidationSchema),
    defaultValues: {
      data: item,
    },
  });

  const { mutate: updatePattern, isPending: isPendingPattern } =
    useUpdateIntentPattern();
  const { mutate: updateResponse, isPending: isPendingResponse } =
    useUpdateIntentResponse();

  function onSubmit(values: z.infer<typeof EditUserValidationSchema>) {
    if (type === "Pattern") {
      updatePattern({ tag, id, data: { pattern: values.data } });
    } else if (type === "Response") {
      updateResponse({ tag, id, data: { response: values.data } });
    } else {
      return;
    }
    setIsEditDialogOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="data"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{type || "Pattern"}</FormLabel>
              <FormControl>
                <Textarea rows={10} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {isPendingPattern || isPendingResponse ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EditForm;
