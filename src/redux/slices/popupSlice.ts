import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PopupState {
    isOpenChengeLocate: boolean;
    isOpenAuth: boolean;
}

const initialState: PopupState = {
    isOpenChengeLocate: false,
    isOpenAuth: false,
}

export const popupSlice = createSlice({
    name: 'popupState',
    initialState,
    reducers: {
        setToggleChengeLocate: (state, action: PayloadAction<boolean>) => {
            state.isOpenChengeLocate = action.payload
        },
        setToggleOpenAuth: (state, action: PayloadAction<boolean>) => {
            state.isOpenAuth = action.payload
        },
    },
})


export const { setToggleChengeLocate, setToggleOpenAuth } = popupSlice.actions;

export default popupSlice.reducer;