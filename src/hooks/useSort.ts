import { useState } from 'react';

export const useSort = () => {

    const [sortState, setSortState] = useState({
        popular: true,
        cheaper: false,
        expensive: false,
        alphabet: false,
    });

    const selectSort = (str: string) => {
        if (str === 'popular') {
            setSortState({
                popular: !sortState.popular,
                cheaper: false,
                expensive: false,
                alphabet: false,
            })
        } else if (str === 'cheaper') {
            setSortState({
                popular: false,
                cheaper: !sortState.cheaper,
                expensive: false,
                alphabet: false,
            })
        }
        else if (str === 'expensive') {
            setSortState({
                popular: false,
                cheaper: false,
                expensive: !sortState.expensive,
                alphabet: false,
            })
        }
        else if (str === 'alphabet') {
            setSortState({
                popular: false,
                cheaper: false,
                expensive: false,
                alphabet: !sortState.alphabet,
            })
        }
    }

    return { sortState, selectSort }
}