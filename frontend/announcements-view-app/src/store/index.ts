import {configureStore} from "@reduxjs/toolkit";
import authReducer from "@/store/auth/authReducer.ts";
import variablesReducer from "@/store/variables/variablesReducer.ts";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        variables: variablesReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
