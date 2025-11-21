import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {ILoginResponce} from "@/types/auth/ILoginResponce.ts";

export interface AuthState {
    isLogIn: boolean
    accessToken: string | null
}

const initialState: AuthState = {
    isLogIn: false,
    accessToken: null,
}

export const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (): AuthState => (initialState),
        loginSuccess: (state, action: PayloadAction<ILoginResponce>): AuthState => ({
            isLogIn: true,
            accessToken: action.payload.accessToken,
        }),
        logoutSuccess: (): AuthState => initialState,
    },
})

export const {loginStart, loginSuccess, logoutSuccess} = authReducer.actions
export default authReducer.reducer