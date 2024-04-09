import { Dispatch } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { Loader2 } from "lucide-react";

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

const AccountValidationSchema = z.object({
  email: z.string().min(1, "Email is required!").email().trim(),
  first_name: z.string().min(1, "First name is required!").max(128).trim(),
  last_name: z.string().min(1, "Last name is required!").max(128).trim(),
  password: z
    .string()
    .min(6, "Password must contain at least 6 character(s)")
    .max(128)
    .trim(),
});

const CreateAccountForm = ({
  setDialogOpen,
}: {
  setDialogOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof AccountValidationSchema>>({
    resolver: zodResolver(AccountValidationSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof AccountValidationSchema>) {
    console.log(values);
    setDialogOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
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
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {/* {isPending ? <Loader2 className=" animate-spin" /> : "Submit"} */}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateAccountForm;
