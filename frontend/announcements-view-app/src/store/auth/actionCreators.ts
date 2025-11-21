import {Dispatch} from "@reduxjs/toolkit"
import api from "@/api/"
import {ILoginRequest} from "@/types/auth/ILoginRequest.ts"
import {loginStart, loginSuccess, logoutSuccess,} from "./authReducer"
import {NavigateFunction} from "react-router";
import {IRegistrationRequest} from "@/types/auth/IRegistrationRequest.ts";
import type {AppDispatch} from "@/store";

const isCheckAuth = true
const loginUser = (data: ILoginRequest, navigate: NavigateFunction) => (async (dispatch: AppDispatch): Promise<void> => {
        console.log("loginUser")
        console.log(data)
        try {

            if (isCheckAuth) {
                console.log("start action crators")
                dispatch(loginStart())
                const res = await api.auth.login(data)
                console.log(res.status + " status")
                console.log(res.headers + " header")
                console.log(res.data.accessToken + " token")
                dispatch(loginSuccess(res))
            } else {
                dispatch(loginSuccess(data))
            }
            navigate("/testPage")
        } catch (e: unknown) {
            console.error(e)
        }
    }
)

export const logoutUser = (navigate: NavigateFunction) => async (dispatch: AppDispatch): Promise<void> => {
    try {
        console.log("logoutUser")
        //await api.auth.logout()
        dispatch(logoutSuccess())
        navigate("/signIn")
    } catch (e) {
        console.error(e)
    }
}

export const registrationUser = (data: IRegistrationRequest, navigate: NavigateFunction) => async (dispatch: Dispatch): Promise<void> => {
    try {
        if (isCheckAuth) {
            console.log("start registration")
            dispatch(loginStart())
            await api.auth.registration(data)
            navigate("/signIn")
        } else {
            navigate("/signIn")
        }
    } catch (e: unknown) {
        console.error(e)
    }
}
export default loginUser;