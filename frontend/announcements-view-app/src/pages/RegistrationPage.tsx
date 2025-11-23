"use client"


import {z} from "zod";
import type {IRegistrationRequest} from "@/types/auth/IRegistrationRequest.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input"
import {registrationUser} from "@/store/auth/actionCreators.ts";
import {useAppDispatch} from "@/hook/AppDispatch.ts";
import {useNavigate} from "react-router-dom";

const formSchema = z.object<IRegistrationRequest>({
    username: z.string().min(4, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(4, {
        message: "Password must be at least 2 characters.",
    }),
    email : z.string()
});
export function Registration() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        dispatch(registrationUser(values, navigate));
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Имя пользователя</FormLabel>
                            <FormControl>
                                <Input placeholder="name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="string" placeholder="email@example.com" {...field} />
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
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>

    )
}

