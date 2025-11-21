import {Dispatch} from "@reduxjs/toolkit"
import api from "@/api/"
import {ILoginRequest} from "@/types/auth/ILoginRequest.ts"
import {loginStart, loginSuccess, logoutSuccess,} from "./authReducer"
import {NavigateFunction} from "react-router/dist/lib/hooks";
import {IRegistrationRequest} from "@/types/auth/IRegistrationRequest.ts";

const isCheckAuth = false
const loginUser = (data: ILoginRequest, navigate: NavigateFunction) => (async (dispatch: Dispatch<any>): Promise<void> => {
        try {

            if (isCheckAuth) {
                console.log("start action crators")
                dispatch(loginStart())
                const res = await api.auth.login(data)
                console.log(res.status + " status")
                console.log(res.headers + " header")
                console.log(res.data.accessToken + " token")
                dispatch(loginSuccess(data))
            } else {
                dispatch(loginSuccess(data))
            }
            navigate("/status")
        } catch (e: any) {
            console.error(e)
        }
    }
)

export const logoutUser = (navigate: NavigateFunction) => async (dispatch: Dispatch<any>): Promise<void> => {
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
    } catch (e: any) {
        console.error(e)
    }
}
export default loginUser;