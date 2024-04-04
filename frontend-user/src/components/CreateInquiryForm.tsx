import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Send } from "lucide-react";

import useCreateInquiry from "@/hooks/useCreateInquiry";
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

const InquirySchema = z.object({
  inquiry: z.string().min(1, "Email is required").email().trim(),
});

const CreateInquiryForm = () => {
  const { mutate: createInquiry, isPending } = useCreateInquiry();

  const form = useForm<z.infer<typeof InquirySchema>>({
    resolver: zodResolver(InquirySchema),
    defaultValues: {
      inquiry: "",
    },
  });

  function onSubmit(values: z.infer<typeof InquirySchema>) {
    // createInquiry(values);
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-center items-center w-full gap-4"
      >
        <FormField
          control={form.control}
          name="inquiry"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Ask any question here"
                  className="p-6 rounded-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="rounded-full" variant="outline">
          {isPending ? (
            <Loader2 className=" animate-spin" />
          ) : (
            <Send size={18} />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateInquiryForm;
