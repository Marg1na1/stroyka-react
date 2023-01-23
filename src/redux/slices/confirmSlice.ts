import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ConfirmBody = {
    message: string;
    type: 'defined' | 'undefined' | 'error' | 'nothing'
}

interface ConfirmState {
    isOpen: boolean;
    body: ConfirmBody
}

const initialState: ConfirmState = {
    isOpen: false,
    body: {
        message: '',
        type: 'nothing'
    }
}

export const confirmSlice = createSlice({
    name: 'confirmState',
    initialState,
    reducers: {
        setToggleConfirm: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload
        },
        setBodyConfirm: (state, action: PayloadAction<ConfirmBody>) => {
            state.body = action.payload
        },
    },
})


export const { setToggleConfirm, setBodyConfirm } = confirmSlice.actions

export default confirmSlice.reducer