import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SortTypeModel } from '../../@types/models';

const initialState: SortTypeModel = {
    label: 'Популярные',
    title: 'popular'
}

export const sortSlice = createSlice({
    name: 'sortSlice',
    initialState,
    reducers: {
        setSortType: (state, action: PayloadAction<SortTypeModel>) => {
            state.label = action.payload.label
            state.title = action.payload.title
        },
    },
})

export const { setSortType } = sortSlice.actions;

export default sortSlice.reducer;