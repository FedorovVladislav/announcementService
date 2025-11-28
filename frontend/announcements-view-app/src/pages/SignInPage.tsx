import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useAppDispatch} from "@/hook/AppDispatch.ts";
import {loginUser} from "@/store/auth/actionCreators";
import {FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label.tsx";
import type {ILoginRequest} from "@/types/auth/ILoginRequest.ts";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
});

const SignIn = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    });

    const onSubmit = (values: ILoginRequest): void => {
        dispatch(loginUser(values, navigate));
        console.log(values);
    };

    const goToRegistration = (): void => {
        navigate("/registration");
    };

    return (
        <div className="flex justify-center h-screen flex-col items-center space-y-6">
            <div className="flex flex-col h-full justify-center items-center space-y-6 min-w-96">
                <Label className='text-xl my-2'>Авторизация</Label>
                <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2 w-full">
                        <div>
                            <Input
                                id="username"
                                type="text"
                                autoComplete="username"
                                required
                                placeholder="Имя пользователя"
                                {...register("username")}
                            />
                            {errors.username && <FormMessage>{errors.username.message}</FormMessage>}
                        </div>
                        <Input id="password"
                               type="password"
                               autoComplete="current-password"
                               required
                               placeholder="Пароль"
                               {...register("password")}
                        />
                        {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
                    </div>
                    <Button className="w-full text-gray-500" type="submit">Вход</Button>
                    <Button className="w-full text-gray-500" onClick={goToRegistration}>Регистрация</Button>
                </form>
            </div>
        </div>
    );
}
export default SignIn