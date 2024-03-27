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
import { IGetAllAdminsResponse } from "@/api/accounts";
import { useUpdateAdmin } from "@/hooks/useUpdateAdmin";

const EditAccountValidationSchema = z.object({
  first_name: z.string().min(1, "Inquiry is required!"),
  last_name: z.string().min(1, "Tag is required!"),
});

const EditAccountForm = ({
  account,
  setIsEditDialogOpen,
}: {
  account: IGetAllAdminsResponse;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { mutate: updateAdmin, isPending } = useUpdateAdmin();
  const form = useForm<z.infer<typeof EditAccountValidationSchema>>({
    resolver: zodResolver(EditAccountValidationSchema),
    defaultValues: {
      first_name: account.first_name,
      last_name: account.last_name,
    },
  });

  function onSubmit(values: z.infer<typeof EditAccountValidationSchema>) {
    updateAdmin({ id: account._id, data: values });
    setIsEditDialogOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
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

export default EditAccountForm;
