import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SortTypeModel } from 'types/models';

type FilterType = {
    range: number[];
    provider: string;
    search?: string;
}

type PickingType = {
    sort: SortTypeModel;
    filter: FilterType;
}

const initialState: PickingType = {
    sort: {
        label: 'Популярные',
        title: 'popular'
    },
    filter: {
        range: [],
        provider: '',
        search: ''
    }
}

export const sortSlice = createSlice({
    name: 'sortSlice',
    initialState,
    reducers: {
        setSortType: (state, action: PayloadAction<SortTypeModel>) => {
            state.sort = action.payload
        },
        setFilter: (state, action: PayloadAction<FilterType>) => {
            state.filter = action.payload
        }
    },
})

export const { setSortType, setFilter } = sortSlice.actions;

export default sortSlice.reducer;