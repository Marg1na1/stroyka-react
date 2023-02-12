import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
    isAuth: boolean
}

const initialState: AuthState = {
    isAuth: true,
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


export const { setIsAuth } = isAuthSlice.actions;

export default isAuthSlice.reducer;