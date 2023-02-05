import clsx from 'clsx';
import { FC, useState, useEffect } from 'react';
import { useSort } from '../../hooks/useSort';
import MarkIcon from '../../Icons/MarkIcon';
import style from './Sort.module.scss';

const Sort: FC = ({ }) => {

    const { sortState, selectSort } = useSort();
    const [selected, setSelected] = useState('Популярные');
    const [dropdown, setDropdown] = useState(false);

    const changeSort = (x: string[]) => {
        selectSort(x[0])
        setSelected(x[1])
        toggleDropdown()
    }

    const toggleDropdown = () => {
        setDropdown(!dropdown)
    }

    return (
        <>
            <div className={style['select']}>
                <button
                    className={dropdown ? clsx(style['select-btn'], style['select-btn--active']) : style['select-btn']}
                    onClick={toggleDropdown}
                >{selected} <MarkIcon /></button>
                <ul className={dropdown ? clsx(style['sort'], style['sort--active']) : style['sort']}>
                    <li className={style['sort__item']}>
                        <button className={sortState.popular
                            ? clsx(style['sort__btn--active'], style['sort__btn'])
                            : style['sort__btn']}
                            onClick={() => changeSort(['popular', 'Популярные'])}>Популярные</button>
                    </li>
                    <li className={style['sort__item']}>
                        <button className={sortState.cheaper
                            ? clsx(style['sort__btn--active'], style['sort__btn'])
                            : style['sort__btn']}
                            onClick={() => changeSort(['cheaper', 'Дешевле'])}>Дешевле</button>
                    </li>
                    <li className={style['sort__item']}>
                        <button className={sortState.expensive
                            ? clsx(style['sort__btn--active'], style['sort__btn'])
                            : style['sort__btn']}
                            onClick={() => changeSort(['expensive', 'Дороже'])}>Дороже</button>
                    </li>
                    <li className={style['sort__item']}>
                        <button className={sortState.alphabet
                            ? clsx(style['sort__btn--active'], style['sort__btn'])
                            : style['sort__btn']}
                            onClick={() => changeSort(['alphabet', 'По алфавиту'])}>По алфавиту</button>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Sort;