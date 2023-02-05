import { FC } from 'react';
import { ProductModel } from '../../@types/models';
import { useSort } from '../../hooks/useSort';
import Card from '../Card/Card';
import Skeleton from '../Skeletons/Skeleton';
import clsx from 'clsx';
import style from './SearchedMain.module.scss';
import Sort from '../Sort/Sort';

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
                <Sort />
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