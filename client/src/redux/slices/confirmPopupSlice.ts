import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ConfirmState {
    isOpenConfirm: boolean;
    deletedId: string;
}

const initialState: ConfirmState = {
    deletedId: ' ',
    isOpenConfirm: false
}

export const confirmPopupSlice = createSlice({
    name: 'confirmPopupState',
    initialState,
    reducers: {
        setToggleOpenConfirm: (state, action: PayloadAction<boolean>) => {
            state.isOpenConfirm = action.payload
        },
        setDeletedId: (state, action: PayloadAction<string>) => {
            state.deletedId = action.payload
        },
    },
})


export const { setToggleOpenConfirm, setDeletedId } = confirmPopupSlice.actions;

export default confirmPopupSlice.reducer;