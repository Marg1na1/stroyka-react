import clsx from 'clsx';
import { FC } from 'react';
import { TCard } from '../../@types/globalTypes';
import { useSort } from '../../hooks/useSort';
import Card from '../Card/Card';
import style from './CategoryMain.module.scss';

type CategoryMainProps = {
    data: TCard[];
}

const CategoryMain: FC<CategoryMainProps> = ({ data }) => {

    const { sortState, selectSort } = useSort();

    return (
        <div className={style['category-main']}>
            <ul className={style['sort-list']}>
                <li className={style['sort-list__item']}>
                    <button className={sortState.popular === true
                        ? clsx(style['sort-list__btn--active'], style['sort-list__btn'])
                        : style['sort-list__btn']}
                        onClick={() => selectSort('popular')}>Популярные</button>
                </li>
                <li className={style['sort-list__item']}>
                    <button className={sortState.cheaper === true
                        ? clsx(style['sort-list__btn--active'], style['sort-list__btn'])
                        : style['sort-list__btn']}
                        onClick={() => selectSort('cheaper')}>Дешевле</button>
                </li>
                <li className={style['sort-list__item']}>
                    <button className={sortState.expensive === true
                        ? clsx(style['sort-list__btn--active'], style['sort-list__btn'])
                        : style['sort-list__btn']}
                        onClick={() => selectSort('expensive')}>Дороже</button>
                </li>
                <li className={style['sort-list__item']}>
                    <button className={sortState.alphabet === true
                        ? clsx(style['sort-list__btn--active'], style['sort-list__btn'])
                        : style['sort-list__btn']}
                        onClick={() => selectSort('alphabet')}>По алфавиту</button>
                </li>
            </ul>
            <ul className={style['category-list']}>
                {
                    data.map((obj, i) => (
                        <Card {...obj} key={i} />
                    ))
                }
            </ul>
        </div>
    );
}

export default CategoryMain;