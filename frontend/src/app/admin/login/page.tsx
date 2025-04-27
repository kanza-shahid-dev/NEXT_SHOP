"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function Admin() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = (data: { username: string; password: string }) => {
    const { username, password } = data;

    console.log(
      "username",
      username,
      password,
      process.env.NEXT_PUBLIC_adminUserName,
      process.env.NEXT_PUBLIC_adminPassword
    );
    if (
      username == process.env.NEXT_PUBLIC_adminUserName &&
      password == process.env.NEXT_PUBLIC_adminPassword
    ) {
      router.push("/admin/adminPanel");
    } else {
      toast.error("Invalid username or password");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, field: string) => {
    if (event.key === "Enter") {
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="mx-auto w-[250px] mt-50">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            rules={{ required: "Username is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoFocus
                    onKeyDown={(e) => handleKeyDown(e, "username")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-2">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    onKeyDown={(e) => handleKeyDown(e, "password")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-[100%] text-center mt-4 bg-black text-white px-4 py-2 rounded"
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Admin;
