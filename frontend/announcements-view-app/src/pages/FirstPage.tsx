import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "@/hook/AppDispatch.ts";
import {registrationUser} from "@/store/auth/actionCreators.ts";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Passord must be at least 2 characters.",
    }),
    email: z.string().min(2, {
        message: "Passord must be at least 2 characters.",
    }),
});

export default function FirstPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            email: ""
        },
    });
    const dispatch = useAppDispatch();
    const navigation = useNavigate();

    function handlerClick(values: z.infer<typeof formSchema>) {
        dispatch(registrationUser({
            username: values.username,
            password: values.password,
            email: values.email
        }, navigation));
        console.log(values);
    }

    return (
        <>
            Экран первоначальных настроек
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handlerClick)}
                    className="space-y-6 min-w-80">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>User</FormLabel>
                                <FormControl>
                                    <Input placeholder="userName" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="password" type="password" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="passwordReply"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password reply</FormLabel>
                                <FormControl>
                                    <Input placeholder="Reply" type="password" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Registration</Button>
                </form>
            </Form>
        </>
    )
}