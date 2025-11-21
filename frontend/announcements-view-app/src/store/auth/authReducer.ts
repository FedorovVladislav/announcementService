import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ILoginRequest} from "@/types/auth/ILoginRequest.ts";

export interface AuthState {
    isLogIn: boolean
    userName: string | null
    password: string | null
}

const initialState: AuthState = {
    isLogIn: false,
    password: null,
    userName: null
}

export const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (): AuthState => (initialState),
        loginSuccess: (state, action: PayloadAction<ILoginRequest>): AuthState => ({
            isLogIn: true,
            userName: action.payload.username,
            password: action.payload.password
        }),
        logoutSuccess: (): AuthState => initialState,
    },
})

export const {loginStart, loginSuccess, logoutSuccess} = authReducer.actions
export default authReducer.reducer