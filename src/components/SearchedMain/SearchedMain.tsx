import { FC } from 'react';
import { ProductModel } from '../../@types/models';
import Sort from '../Sort/Sort';
import { useSort } from '../../hooks/useSort';
import Card from '../Card/Card';
import Skeleton from '../Skeletons/Skeleton';
import style from './SearchedMain.module.scss';

type TSearchedMain = {
    items: ProductModel[];
    isLoading: boolean;
}

const SearchedMain: FC<TSearchedMain> = ({ items, isLoading }) => {

    // const { sortState } = useSort();

    const renderCards = items.map((obj) => <Card {...obj} key={obj.fixId} />);
    const renderSkeleton = [...new Array(9)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className={style['searched-main']}>
            <Sort />
            <ul className={style['grid']}>
                {
                    isLoading ? renderSkeleton : renderCards
                }
            </ul>
        </div>
    );
}

export default SearchedMain;