import { useForm, type Control, type FieldPath } from "react-hook-form";
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
import type { LoginInput } from "@/types/types";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";
import { useNavigate } from "react-router";
function SignupForm() {
  // 1. Define your form.
  const navigate = useNavigate();
  const { signup } = useAuthStore();
  const [errors, setErrors] = useState<string>("");
  const form = useForm({
    defaultValues: {
      name: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: LoginInput) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const res = await signup(values);
    console.log(res);
    if ("id" in res) {
      navigate("/");
    } else {
      setErrors(res.error);
    }
  };

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
                name="name"
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
              {errors ? <p className="text-red-500">{errors}</p> : null}
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
  name: FieldPath<LoginInput>;
  label: string;
  placeholder?: string;
  description?: string;
  inputType?: string;
  formControl: Control<LoginInput>;
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
