import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, type Control, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
    <div className={cn("flex flex-col gap-6 w-1/3", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <LoginFormField
                name="username"
                label="Username"
                placeholder="John Doe"
                inputType="text"
                formControl={form.control}
              />
              <LoginFormField
                name="password"
                label="Password"
                inputType="password"
                formControl={form.control}
              />
              <Button className="w-full" type="submit">
                Log in
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

type LoginFormFieldProps = {
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder?: string;
  description?: string;
  inputType?: string;
  formControl: Control<z.infer<typeof formSchema>>;
};
const LoginFormField: React.FC<LoginFormFieldProps> = ({
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
