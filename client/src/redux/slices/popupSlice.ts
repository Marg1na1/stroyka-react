import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PopupState {
    isOpenChengeLocate: boolean;
    isOpenAuth: boolean;
    isOpenBurger: boolean;
}

const initialState: PopupState = {
    isOpenChengeLocate: false,
    isOpenAuth: false,
    isOpenBurger: false,
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
        setToggleOpenBurger: (state, action: PayloadAction<boolean>) => {
            state.isOpenBurger = action.payload
        },
    },
})


export const { setToggleChengeLocate, setToggleOpenAuth, setToggleOpenBurger} = popupSlice.actions;

export default popupSlice.reducer;