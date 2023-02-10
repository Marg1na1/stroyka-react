import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface errorState {
    errorCode: number;
    errorMessage: string;
}

const initialState = {
    queue: 'll'
}

export const errorSlice = createSlice({
    name: 'errorSlice',
    initialState,
    reducers: {
        // setIsAuth: (state, action: PayloadAction<boolean>) => {

        // },
    },
})


export const { } = errorSlice.actions;

export default errorSlice.reducer;