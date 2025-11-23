"use client"


import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input"
import {registrationUser} from "@/store/auth/actionCreators.ts";
import {useAppDispatch} from "@/hook/AppDispatch.ts";
import {useNavigate} from "react-router-dom";
import {ArrowLeft} from "lucide-react";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Имя пользователя должно содержать минимум 2 символа.",
    }),
    password: z.string().min(4, {
        message: "Пароль должен содержать минимум 4 символа.",
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

    const goBack = () => {
        navigate("/signIn");
    };

    return (
        <div className="flex justify-center h-screen flex-col items-center space-y-6">
            <div className="flex flex-col h-full justify-center items-center space-y-6 min-w-96">
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
                                <Input type="email" placeholder="email@example.com" {...field} />
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
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                onClick={goBack}
                                className="flex items-center gap-2 flex-1 text-gray-500"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Назад
                            </Button>
                            <Button className="flex-1 text-gray-500" type="submit">Регистрация</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

