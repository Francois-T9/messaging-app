import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Control, type FieldPath } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});
function SignupForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="flex flex-col gap-6 w-1/3">
      <Card>
        <CardHeader>
          <CardTitle>Signup to chat</CardTitle>
          <CardDescription>Enter a username and password</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <SignupFormField
                name="username"
                label="Username"
                placeholder="John Doe"
                inputType="text"
                formControl={form.control}
              />
              <SignupFormField
                name="password"
                label="Password"
                inputType="password"
                formControl={form.control}
              />
              <Button className="w-full" type="submit">
                Create account
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

type SignupFormFieldProps = {
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder?: string;
  description?: string;
  inputType?: string;
  formControl: Control<z.infer<typeof formSchema>>;
};
const SignupFormField: React.FC<SignupFormFieldProps> = ({
  name,
  label,
  placeholder,
  description,
  inputType,
  formControl,
}) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={inputType || "text"}
              {...field}
            ></Input>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage></FormMessage>
        </FormItem>
      )}
    />
  );
};

export default SignupForm;
