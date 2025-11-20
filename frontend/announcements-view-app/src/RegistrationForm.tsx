"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { registerUser } from "./services/auth";
import type { RegistrationFormData } from "./types/RegistrationFormData";

export const registrationSchema = z.object({
  name: z.string().min(2, "Имя должно быть минимум 2 символа"),
  email: z.string(),
  password: z.string().min(6, "Пароль должен быть минимум 6 символов"),
});

 
export function RegistrationForm() {
     const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
    },  })
 function onSubmit(values: z.infer<typeof registrationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};