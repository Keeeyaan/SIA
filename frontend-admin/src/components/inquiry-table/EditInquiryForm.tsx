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
import { Input } from "@/components/ui/input";
import { IGetAllInquiriesResponse } from "@/api/inquiries";
import { useUpdateInquiry } from "@/hooks/useUpdateInquiry";

const EditUserValidationSchema = z.object({
  inquiry: z.string().min(1, "Inquiry is required!"),
  tag: z.string().min(1, "Tag is required!"),
});

const EditInquiryForm = ({
  inquiry,
  setIsEditDialogOpen,
}: {
  inquiry: IGetAllInquiriesResponse;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { mutate: updateInquiry, isPending } = useUpdateInquiry();

  const form = useForm<z.infer<typeof EditUserValidationSchema>>({
    resolver: zodResolver(EditUserValidationSchema),
    defaultValues: {
      inquiry: inquiry.inquiry,
      tag: inquiry.tag,
    },
  });

  function onSubmit(values: z.infer<typeof EditUserValidationSchema>) {
    updateInquiry({
      id: inquiry._id,
      data: { tag: values.tag, inquiry: values.inquiry },
    });
    setIsEditDialogOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="inquiry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inquiry</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {isPending ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default EditInquiryForm;
