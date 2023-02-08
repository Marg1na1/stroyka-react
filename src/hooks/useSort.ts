import { useState } from 'react';

export const useSort = () => {

    const [sortState, setSortState] = useState([
        {
            value: true,
            label: 'Популярные',
        },
        {
            value: false,
            label: 'Дешевле',
        },
        {
            value: false,
            label: 'Дороже',
        },
        {
            value: false,
            label: 'По алфавиту',
        },
    ]);

    const onClickSortItem = (str: string) => {

        const newArr = sortState.map((obj) => {
            if (obj.label === str) {
                obj.value = true
                return obj
            } else {
                obj.value = false
                return obj
            }
        })
        setSortState(newArr)
    }

    return { sortState, onClickSortItem }
}