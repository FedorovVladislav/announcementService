import {configureStore} from "@reduxjs/toolkit";
import authReducer from "@/store/auth/authReducer.ts";
import settingsReducer from "@/store/data/settingsReducer.ts";
import variablesReducer from "@/store/variables/variablesReducer.ts";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        setting: settingsReducer,
        variables: variablesReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
