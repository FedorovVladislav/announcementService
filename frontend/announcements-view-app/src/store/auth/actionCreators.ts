import api from "@/api/"
import type {ILoginRequest} from "@/types/auth/ILoginRequest.ts"
import {loginStart, loginSuccess, logoutSuccess,} from "./authReducer"
import type {NavigateFunction} from "react-router";
import type {IRegistrationRequest} from "@/types/auth/IRegistrationRequest.ts";
import type {AppDispatch} from "@/store";
import type {AxiosError} from "axios";

export const loginUser = (data: ILoginRequest, navigate: NavigateFunction) => (async (dispatch: AppDispatch): Promise<void> => {
        try {
            dispatch(loginStart())
            const res = await api.auth.login(data)
            dispatch(loginSuccess(res.data))
            navigate("/testPage")
        } catch (error: unknown) {
            if (error instanceof Error) {
                const axiosError = error as AxiosError<{ errorCode?: string; description?: string; message?: string }>;
                
                if (axiosError.response) {
                    const status = axiosError.response.status;
                    const errorData = axiosError.response.data;
                    
                    console.error("Login error:", {
                        status,
                        statusText: axiosError.response.statusText,
                        errorCode: errorData?.errorCode,
                        description: errorData?.description || errorData?.message,
                        fullError: errorData
                    });
                    
                    const errorMessage = errorData?.description || errorData?.message || `Ошибка входа: ${status}`;
                    alert(errorMessage);
                } else if (axiosError.request) {
                    console.error("Network error:", axiosError.message);
                    alert("Ошибка сети. Проверьте подключение к серверу.");
                } else {
                    console.error("Request setup error:", axiosError.message);
                    alert(`Ошибка запроса: ${axiosError.message}`);
                }
            } else {
                console.error("Unknown error:", error);
                alert("Произошла неизвестная ошибка");
            }
        }
    }
)

export const logoutUser = (navigate: NavigateFunction) => async (dispatch: AppDispatch): Promise<void> => {
    try {
        //await api.auth.logout()
        dispatch(logoutSuccess())
        navigate("/signIn")
    } catch (e) {
        console.error("Logout error:", e)
    }
}

export const registrationUser = (data: IRegistrationRequest, navigate: NavigateFunction) => async (): Promise<void> => {
    try {
        await api.auth.registration(data)
        navigate("/testPage")
    } catch (error: unknown) {
        if (error instanceof Error) {
            const axiosError = error as AxiosError<{ errorCode?: string; description?: string; message?: string }>;
            
            if (axiosError.response) {
                // Сервер ответил с ошибкой
                const status = axiosError.response.status;
                const errorData = axiosError.response.data;
                
                console.error("Registration error:", {
                    status,
                    statusText: axiosError.response.statusText,
                    errorCode: errorData?.errorCode,
                    description: errorData?.description || errorData?.message,
                    fullError: errorData
                });
                
                // Можно показать пользователю через alert или toast
                const errorMessage = errorData?.description || errorData?.message || `Ошибка регистрации: ${status}`;
                alert(errorMessage);
            } else if (axiosError.request) {
                // Запрос был отправлен, но ответа не получено
                console.error("Network error:", axiosError.message);
                alert("Ошибка сети. Проверьте подключение к серверу.");
            } else {
                // Что-то пошло не так при настройке запроса
                console.error("Request setup error:", axiosError.message);
                alert(`Ошибка запроса: ${axiosError.message}`);
            }
        } else {
            console.error("Unknown error:", error);
            alert("Произошла неизвестная ошибка");
        }
    }
}