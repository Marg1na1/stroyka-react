import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ErrorModel {
    errorCode: number | string;
    errorMessage: string;
    isError: boolean;
}

const initialState: ErrorModel = {
    errorCode: 100,
    errorMessage: '',
    isError: false
}

export const errorSlice = createSlice({
    name: 'errorSlice',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<ErrorModel>) => {
            state.errorCode = action.payload.errorCode
            state.errorMessage = action.payload.errorMessage
            state.isError = action.payload.isError
        },
        toggleError: (state, action: PayloadAction<boolean>) => {
            state.isError = action.payload
        },
    },
})


export const { setError, toggleError } = errorSlice.actions;

export default errorSlice.reducer;