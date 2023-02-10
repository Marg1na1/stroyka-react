import { useState } from 'react';

export const useSort = () => {

    const [sortState, setSortState] = useState([
        {
            value: true,
            label: 'Популярные',
            title: 'popular'
        },
        {
            value: false,
            label: 'Дешевле',
            title: 'cheaper'
        },
        {
            value: false,
            label: 'Дороже',
            title: 'expensive'
        },
        {
            value: false,
            label: 'По алфавиту',
            title: 'alphabetically'
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