import clsx from 'clsx';
import { FC } from 'react';
import { ProductModel } from '../../@types/models';
import { useSort } from '../../hooks/useSort';
import Card from '../Card/Card';
import Skeleton from '../Skeletons/Skeleton';
import style from './SearchedMain.module.scss';

type TSearchedMain = {
    items: ProductModel[];
    isLoading: boolean;
}

const SearchedMain: FC<TSearchedMain> = ({ items, isLoading }) => {

    const { sortState, selectSort } = useSort();

    const renderCards = items.map((obj) => <Card {...obj} key={obj.fixId} />);
    const renderSkeleton = [...new Array(9)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className={style['searched-main']}>
            <div className={style['main']}>
                <ul className={style['filter']}>
                    <li className={style['filter__item']}>
                        <button className={sortState.popular === true
                            ? clsx(style['filter__btn--active'], style['filter__btn'])
                            : style['filter__btn']}
                            onClick={() => selectSort('popular')} >Популярные</button>
                    </li>
                    <li className={style['filter__item']}>
                        <button className={sortState.cheaper === true
                            ? clsx(style['filter__btn--active'], style['filter__btn'])
                            : style['filter__btn']}
                            onClick={() => selectSort('cheaper')}>Дешевле</button>
                    </li>
                    <li className={style['filter__item']}>
                        <button className={sortState.expensive === true
                            ? clsx(style['filter__btn--active'], style['filter__btn'])
                            : style['filter__btn']}
                            onClick={() => selectSort('expensive')}>Дороже</button>
                    </li>
                    <li className={style['filter__item']}>
                        <button className={sortState.alphabet === true
                            ? clsx(style['filter__btn--active'], style['filter__btn'])
                            : style['filter__btn']}
                            onClick={() => selectSort('alphabet')}>По алфавиту</button>
                    </li>
                </ul>
                <ul className={style['grid']}>
                    {
                        isLoading ? renderSkeleton : renderCards
                    }
                </ul>
            </div>
        </div>
    );
}

export default SearchedMain;