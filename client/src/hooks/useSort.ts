import { useSelector } from 'react-redux';
import { SortTypeModel } from '../types/models';
import { setSortType } from 'redux/slices/sortSlice';
import { RootState, useAppDispatch } from 'redux/store';

export const useSort = () => {

    const dispatch = useAppDispatch();

    const sortState = useSelector((state: RootState) => state.sortSlice);

    const onClickSortItem = (obj: SortTypeModel) => {
        dispatch(setSortType(obj))
    }

    return { sortState, onClickSortItem }
}