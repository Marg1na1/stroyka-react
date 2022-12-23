import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthrState {
    isAuth: boolean
}

const initialState: AuthrState = {
    isAuth: false,
}

export const isAuthSlice = createSlice({
    name: 'isAuth',
    initialState,
    reducers: {
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
    },
})


export const { setIsAuth } = isAuthSlice.actions

export default isAuthSlice.reducer