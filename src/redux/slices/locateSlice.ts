import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type TCords = {
    latitude: null | number,
    longitude: null | number,
}

interface locateState {
    cords: TCords,
    locality: string
}

const initialState: locateState = {
    cords: {
        latitude: null,
        longitude: null
    },
    locality: 'Москва'
}

export const locateSlice = createSlice({
    name: 'locateSlice',
    initialState,
    reducers: {
        setCords: (state, action: PayloadAction<TCords>) => {
            state.cords = action.payload
        },
        setLocality: (state, action: PayloadAction<string>) => {
            state.locality = action.payload
        }
    },
})

export const { setCords, setLocality } = locateSlice.actions;

export default locateSlice.reducer;