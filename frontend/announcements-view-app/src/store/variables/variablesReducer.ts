import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction} from '@reduxjs/toolkit'

export interface VariablesState {
    activeLink: string
}

const initialState: VariablesState = {
    activeLink: '/status',
}

export const variableReducer = createSlice({
    name: 'variables',
    initialState,
    reducers: {
        setActiveLink: (state, action: PayloadAction<string>) => {
            state.activeLink = action.payload
        },
    },
})

export const {setActiveLink} = variableReducer.actions
export default variableReducer.reducer