import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TErrorObj = {
    errorCode: number | string;
    errorMessage: string;
    isError: boolean;
}

export interface IErrorState {
    data: TErrorObj
}

const initialState: IErrorState = {
    data: {
        errorCode: 100,
        errorMessage: '',
        isError: false
    }

}

export const errorSlice = createSlice({
    name: 'errorSlice',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<TErrorObj>) => {
            state.data = action.payload
        },
        toggleError: (state, action: PayloadAction<boolean>) => {
            state.data.isError = action.payload
        },
    },
})


export const { setError, toggleError } = errorSlice.actions;

export default errorSlice.reducer;