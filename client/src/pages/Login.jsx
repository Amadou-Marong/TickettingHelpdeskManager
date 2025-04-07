import { useState } from "react";
import { LogIn, Mail, Lock } from "lucide-react";
// import Input from "../components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/Form";

import Button from "../components/ui/Button";
import Label from "../components/ui/Label";
import { Input } from "../components/ui/input";
import AnimatedTransition from "../common/AnimatedTransition";
import { useAuth } from "../contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card";
// import { Link } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = async (data) => {
    const success = await login(data.email, data.password);

    if (success) {
      navigate("/dashboard");
    }
  }

  return (
    <AnimatedTransition>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        {/* <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl"> */}
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            {/* <h2 className="text-2xl font-bold text-gray-700">Login</h2>
            <p className="text-gray-400 text-sm font-semibold">
              Enter your email and password to access your account
            </p> */}
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="name@example.com" {...field} />
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
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-600">
              <span>Don't have an account? </span>
              <Link 
                to="/register" 
                className="text-primary hover:underline"
              >
                Sign up
              </Link>
            </div>
            <div className="text-xs text-center text-muted-foreground">
              <p>Test Accounts:</p>
              <p>Admin: admin@example.com / admin123</p>
              <p>Manager: manager@example.com / manager123</p>
              <p>Employee: employee@example.com / employee123</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </AnimatedTransition>
  );
};

export default Login;
